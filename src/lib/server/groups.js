/** @author:Razan Sagheer **/
// Service to fetch workgroups and manage group members from the Directus API.
// Uses footguard_workgroups and footguard_group_members collections.

import { DIRECTUS_URL, DIRECTUS_TOKEN } from '$env/static/private'

/**
 * Fetches all workgroups from Directus.
 *
 * @returns {Promise<Array>} List of workgroup objects
 * @throws {Error} If the API call fails
 */
export async function fetchGroups() {
  const url = `${DIRECTUS_URL}/items/footguard_workgroups?fields=id,group_name,status,condition_label,created_by_user_id`

  let response
  try {
    response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
  } catch (networkError) {
    // Fetch itself failed (e.g. no internet, Directus unreachable)
    throw new Error(`Network error while connecting to Directus: ${networkError.message}`)
  }

  // Handle non-2xx HTTP responses from Directus
  if (!response.ok) {
    throw new Error(`Directus API error: ${response.status} ${response.statusText}`)
  }

  const json = await response.json()

  // Map the raw Directus response to a clean UI-friendly format
  return json.data.map((group) => ({
    id: group.id,
    name: group.group_name,
    status: group.status,
    conditionlabel: group.condition_label ?? 'General', // fallback if null
    memberCount: 0
  }))
}

/**
 * Fetches all active members of a workgroup from footguard_group_members.
 * Uses dot notation to retrieve nested user fields (name, email) from the
 * user_id relation in Directus.
 *
 * @param {string} groupId - The ID of the workgroup
 * @returns {Promise<Array>} List of member objects with name and email
 * @throws {Error} If the API call fails
 */
export async function getGroupMembers(groupId) {
  // Dot notation fetches nested fields from the user_id M2O relation
  const url = `${DIRECTUS_URL}/items/footguard_group_members?filter[workgroup_id][_eq]=${groupId}&filter[membership_status][_eq]=active&fields=id,user_id.id,user_id.email,user_id.name,member_role,joined_at`
  let response
  try {
    response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
  } catch (networkError) {
    throw new Error(`Network error while fetching group members: ${networkError.message}`)
  }

  if (!response.ok) {
    throw new Error(
      `Directus API error while fetching members: ${response.status} ${response.statusText}`
    )
  }

  const json = await response.json()

  // Map nested user fields to a flat UI-friendly format
  // Show full name if available, fall back to email, then 'Unknown'
  return json.data.map((member) => ({
    id: member.id,
    userId: member.user_id?.id,
    email: member.user_id?.email ?? '',
    name: member.user_id?.name || member.user_id?.email || 'Unknown',
    role: member.member_role ?? 'vistar',
    joinedAt: member.joined_at
  }))
}

/**
 * Looks up a user in the footguard_users collection by email.
 * footguard_users has integer IDs, not UUIDs like directus_users.
 *
 * @param {string} email - The email address to search for
 * @returns {Promise<object|null>} The user object if found, null if not found
 * @throws {Error} If the API call fails
 */
export async function findUserByEmail(email) {
  // Search in footguard_users — fields are id, name, email (no first/last name split)
  const url = `${DIRECTUS_URL}/items/footguard_users?filter[email][_eq]=${encodeURIComponent(email)}&fields=id,email,name,role&limit=1`

  let response
  try {
    response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
  } catch (networkError) {
    throw new Error(`Network error while looking up user: ${networkError.message}`)
  }

  if (!response.ok) {
    throw new Error(
      `Directus API error while looking up user: ${response.status} ${response.statusText}`
    )
  }

  const json = await response.json()

  return json.data.length > 0 ? json.data[0] : null
}

/**
 * Adds an existing Directus user to a workgroup via footguard_group_members.
 * The admin directly adds the user — no email or invite is sent.
 * Checks for duplicates before creating the record.
 *
 * @param {string} groupId - The ID of the workgroup
 * @param {string} userId - The Directus user ID to add
 * @param {string|null} addedByUserId - The ID of the admin performing the action
 * @returns {Promise<object>} The created member record
 * @throws {Error} If the user is already a member or the API call fails
 */
export async function addUserToGroup(groupId, userId, addedByUserId, userRole) {
  // Step 1: Check if this user is already an active member of this group
  const checkUrl = `${DIRECTUS_URL}/items/footguard_group_members?filter[workgroup_id][_eq]=${Number(groupId)}&filter[user_id][_eq]=${Number(userId)}&limit=1`

  let checkResponse
  try {
    checkResponse = await fetch(checkUrl, {
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
  } catch (networkError) {
    throw new Error(`Network error while checking existing members: ${networkError.message}`)
  }

  if (!checkResponse.ok) {
    const errorBody = await checkResponse.text()
    throw new Error(
      `Directus API error while checking members: ${checkResponse.status} - ${errorBody}`
    )
  }

  const checkJson = await checkResponse.json()

  // Block adding a user who is already a member of this group
  if (checkJson.data.length > 0) {
    throw new Error('This user is already a member of this group.')
  }

  // Step 2: Create the member record
  const createUrl = `${DIRECTUS_URL}/items/footguard_group_members`

  let createResponse
  try {
    createResponse = await fetch(createUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        workgroup_id: Number(groupId),
        user_id: Number(userId),
        member_role: userRole ?? 'Viewer',
        membership_status: 'active',
        joined_at: new Date().toISOString(),
        updated_by_user_id: addedByUserId ? Number(addedByUserId) : null
      })
    })
  } catch (networkError) {
    throw new Error(`Network error while adding member: ${networkError.message}`)
  }

  if (!createResponse.ok) {
    const errorBody = await createResponse.text()
    throw new Error(
      `Directus API error while adding member: ${createResponse.status} - ${errorBody}`
    )
  }

  const createJson = await createResponse.json()
  return createJson.data
}
