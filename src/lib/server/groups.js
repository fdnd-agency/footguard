/** @author:Razan Sagheer **/
// Service to fetch all available workgroups from the Directus API.
// Uses the footguard_workgroups collection.

import { DIRECTUS_URL, DIRECTUS_TOKEN } from '$env/static/private'
/**
 * Fetches all workgroups from Directus.
 * Member count is 0 for now since footguard_group_members has no data yet.
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
    memberCount: 0 // footguard_group_members is empty for now
  }))
}

/**
 * Invites a user to a group by creating a pending invite record in Directus.
 * Uses the footguard_group_invites collection with the correct field names:
 * - workgroup_id  -> the related workgroup
 * - email         -> the invited user's email
 * - invited_by_user_id -> who sent the invite
 * - invite_status -> 'pending' by default
 * - created_at    -> timestamp of the invite
 * @param {string} groupId - The ID of the workgroup to invite to
 * @param {string} email - The email address of the user to invite
 * @param {string} invitedByUserId - The ID of the admin sending the invite
 * @returns {Promise<object>} The created invite record from Directus
 * @throws {Error} If a pending invite already exists or the API call fails
 */
export async function inviteUserToGroup(groupId, email, invitedByUserId) {
  // Step 1: Check if a pending invite already exists for this email + workgroup
  // to prevent duplicate invites being sent to the same person
  const checkUrl = `${DIRECTUS_URL}/items/footguard_group_invites?filter[workgroup_id][_eq]=${groupId}&filter[email][_eq]=${encodeURIComponent(email)}&filter[invite_status][_eq]=pending&limit=1`

  let checkResponse
  try {
    checkResponse = await fetch(checkUrl, {
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
  } catch (networkError) {
    throw new Error(`Network error while checking existing invites: ${networkError.message}`)
  }

  if (!checkResponse.ok) {
    throw new Error(
      `Directus API error while checking invites: ${checkResponse.status} ${checkResponse.statusText}`
    )
  }

  const checkJson = await checkResponse.json()

  // Block duplicate pending invites for the same email + group combination
  if (checkJson.data.length > 0) {
    throw new Error('A pending invite for this email already exists in this group.')
  }

  // Step 2: Create a new invite record using the correct Directus field names
  const createUrl = `${DIRECTUS_URL}/items/footguard_group_invites`

  let createResponse
  try {
    createResponse = await fetch(createUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        workgroup_id: groupId, // relational field to footguard_workgroups
        email: email, // the invited person's email address
        invited_by_user_id: invitedByUserId ?? null, // who sent the invite (optional)
        invite_status: 'pending', // default status when first created
        created_at: new Date().toISOString() // timestamp of when invite was sent
      })
    })
  } catch (networkError) {
    throw new Error(`Network error while creating invite: ${networkError.message}`)
  }

  if (!createResponse.ok) {
    throw new Error(
      `Directus API error while creating invite: ${createResponse.status} ${createResponse.statusText}`
    )
  }

  const createJson = await createResponse.json()

  // Return the newly created invite record
  return createJson.data
}

/**
 * Fetches all pending invites for a specific workgroup from Directus.
 * Filters by workgroup_id and invite_status = 'pending'.
 * Used to display pending invite badges in the group management UI.
 *
 * @param {string} groupId - The ID of the workgroup
 * @returns {Promise<Array>} List of pending invite objects
 * @throws {Error} If the API call fails
 */

export async function getPendingInvites(groupId) {
  // Filter on workgroup_id and invite_status using the correct Directus field names
  const url = `${DIRECTUS_URL}/items/footguard_group_invites?filter[workgroup_id][_eq]=${groupId}&filter[invite_status][_eq]=pending&fields=id,email,invite_status,created_at`

  let response
  try {
    response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
  } catch (networkError) {
    throw new Error(`Network error while fetching pending invites: ${networkError.message}`)
  }

  if (!response.ok) {
    throw new Error(
      `Directus API error while fetching pending invites: ${response.status} ${response.statusText}`
    )
  }

  const json = await response.json()

  // Return the list of pending invite records
  return json.data
}
