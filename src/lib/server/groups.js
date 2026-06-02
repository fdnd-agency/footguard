/** @author:Razan Sagheer **/
// Service to fetch workgroups and manage group members from the Directus API.
// Uses footguard_workgroups and footguard_group_members collections.

import { DIRECTUS_URL, DIRECTUS_TOKEN } from '$env/static/private'

function buildDirectusAssetUrl(fileId) {
  return fileId ? `${DIRECTUS_URL}/assets/${fileId}` : null
}
/**
 * Fetches all workgroups from Directus.
 *
 * @returns {Promise<Array>} List of workgroup objects
 * @throws {Error} If the API call fails
 */
export async function fetchGroups() {
  const groupsUrl = `${DIRECTUS_URL}/items/footguard_workgroups?fields=id,group_name,status,condition_label,created_by_user_id,image`
  const membersUrl = `${DIRECTUS_URL}/items/footguard_group_members?fields=id,workgroup_id,member_role,membership_status,user_id.id,user_id.name,user_id.email,user_id.photo&filter[membership_status][_eq]=active&limit=-1`

  let groupsResponse
  let membersResponse
  try {
    const headers = {
      Authorization: `Bearer ${DIRECTUS_TOKEN}`,
      'Content-Type': 'application/json'
    }

    ;[groupsResponse, membersResponse] = await Promise.all([
      fetch(groupsUrl, { headers }),
      fetch(membersUrl, { headers })
    ])
  } catch (networkError) {
    // Fetch itself failed (e.g. no internet, Directus unreachable)
    throw new Error(`Network error while connecting to Directus: ${networkError.message}`)
  }

  // Handle non-2xx HTTP responses from Directus
  if (!groupsResponse.ok) {
    throw new Error(`Directus API error: ${groupsResponse.status} ${groupsResponse.statusText}`)
  }

  if (!membersResponse.ok) {
    throw new Error(`Directus API error: ${membersResponse.status} ${membersResponse.statusText}`)
  }

  const groupsJson = await groupsResponse.json()
  const membersJson = await membersResponse.json()

  const groupMembersByGroupId = new Map()

  for (const member of membersJson.data ?? []) {
    const groupId = member?.workgroup_id
    const user = member?.user_id

    if (!groupId || !user || typeof user !== 'object') {
      continue
    }

    const mappedMember = {
      id: user.id ?? member.id,
      name: user.name ?? 'Unknown',
      role: member?.member_role ?? null,
      email: user.email ?? null,
      avatarUrl: buildDirectusAssetUrl(user.photo)
    }

    const currentMembers = groupMembersByGroupId.get(groupId) ?? []
    currentMembers.push(mappedMember)
    groupMembersByGroupId.set(groupId, currentMembers)
  }

  // Map the raw Directus response to a clean UI-friendly format
  return (groupsJson.data ?? []).map((group) => {
    const members = groupMembersByGroupId.get(group.id) ?? []

    return {
      id: group.id,
      name: group.group_name,
      status: group.status,
      conditionlabel: group.condition_label ?? 'General', // fallback if null
      members,
      memberCount: members.length,
      image: buildDirectusAssetUrl(group.image)
    }
  })
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
  const url = `${DIRECTUS_URL}/items/footguard_group_members?filter[workgroup_id][_eq]=${groupId}&filter[membership_status][_eq]=active&fields=id,user_id.id,user_id.email,user_id.name,user_id.photo,member_role,joined_at`
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
    avatarUrl: buildDirectusAssetUrl(member.user_id?.photo),
    role: member.member_role ?? 'Vistar',
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
  // Step 1: Check all existing membership records for this group + user pair.
  // We include membership_status so we can distinguish active vs inactive records.
  const checkUrl = `${DIRECTUS_URL}/items/footguard_group_members?filter[workgroup_id][_eq]=${Number(groupId)}&filter[user_id][_eq]=${Number(userId)}&fields=id,membership_status&limit=-1`

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

  // Normalize API response to a safe array.
  const existingRecords = checkJson.data ?? []
  const activeRecord = existingRecords.find(
    (record) => record?.membership_status?.toLowerCase?.() === 'active'
  )

  // If there is already an active membership row, block duplicate adds.
  if (activeRecord) {
    throw new Error('This user is already a member of this group.')
  }

  // Step 2: If an inactive membership row exists, reactivate it
  // instead of creating a second row for the same user/group.
  const inactiveRecord = existingRecords.find(
    (record) => record?.membership_status?.toLowerCase?.() !== 'active'
  )

  if (inactiveRecord?.id) {
    // Reactivate the existing row and refresh key fields.
    const reactivateUrl = `${DIRECTUS_URL}/items/footguard_group_members/${Number(inactiveRecord.id)}`

    let reactivateResponse
    try {
      reactivateResponse = await fetch(reactivateUrl, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${DIRECTUS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          membership_status: 'active',
          member_role: userRole ?? 'Viewer',
          joined_at: new Date().toISOString(),
          updated_by_user_id: addedByUserId ? Number(addedByUserId) : null
        })
      })
    } catch (networkError) {
      throw new Error(`Network error while reactivating member: ${networkError.message}`)
    }

    if (!reactivateResponse.ok) {
      const errorBody = await reactivateResponse.text()
      throw new Error(
        `Directus API error while reactivating member: ${reactivateResponse.status} - ${errorBody}`
      )
    }

    // Return the reactivated member row.
    const reactivateJson = await reactivateResponse.json()
    return reactivateJson.data
  }

  // Step 3: No prior row exists, so create a brand new active membership row.
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

/**
 * Soft-removes a member from a workgroup by setting membership_status to inactive.
 *
 * @param {string|number} memberId - The footguard_group_members record ID
 * @param {string|number|null} updatedByUserId - The admin performing the action
 * @returns {Promise<object>} The updated member record
 * @throws {Error} If the API call fails
 */
export async function removeMemberFromGroup(memberId, updatedByUserId = null) {
  // Soft remove: keep the row for audit/history and set status to inactive.
  const url = `${DIRECTUS_URL}/items/footguard_group_members/${Number(memberId)}`

  let response
  try {
    response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        membership_status: 'inactive',
        updated_by_user_id: updatedByUserId ? Number(updatedByUserId) : null
      })
    })
  } catch (networkError) {
    throw new Error(`Network error while removing member: ${networkError.message}`)
  }

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Directus API error while removing member: ${response.status} - ${errorBody}`)
  }

  const json = await response.json()
  return json.data
}

/**
 * Fetches all articles assigned to a specific workgroup from footguard_articles.
 * Uses the assigned_workgroup field to filter by group ID.
 *
 * @param {string|number} groupId - The ID of the workgroup
 * @returns {Promise<Array>} List of article objects with title, publisher and theme
 * @throws {Error} If the API call fails
 */
export async function getGroupArticles(groupId) {
  // Filter articles where assigned_workgroup matches the group ID
  const url = `${DIRECTUS_URL}/items/footguard_articles?filter[assigned_workgroup][_eq]=${groupId}&fields=id,title,publisher,publishing_year,theme,status&limit=-1`

  let response
  try {
    response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
  } catch (networkError) {
    throw new Error(`Network error while fetching group articles: ${networkError.message}`)
  }

  if (!response.ok) {
    throw new Error(
      `Directus API error while fetching group articles: ${response.status} ${response.statusText}`
    )
  }

  const json = await response.json()

  // Map to a clean UI-friendly format
  return (json.data ?? []).map((article) => ({
    id: article.id,
    title: article.title ?? 'Untitled',
    publisher: article.publisher ?? null,
    publishingYear: article.publishing_year ?? null,
    theme: article.theme ?? null,
    status: article.status ?? null
  }))
}

/**
 * Creates a new workgroup in Directus.
 * Only group_name is required; all other fields are optional.
 *
 * @param {object} groupData - The group fields to create
 * @param {string} groupData.groupName - Required: the name of the group
 * @param {string|null} groupData.conditionLabel - Optional: label for the condition
 * @param {string|null} groupData.status - Optional: e.g. 'active', 'draft'
 * @param {number|null} groupData.createdByUserId - Optional: ID of the creating user
 * @param {string|null} groupData.imageId - Optional: Directus file ID for thumbnail
 * @returns {Promise<object>} The created workgroup record
 * @throws {Error} If the API call fails
 */
export async function createGroup({
  groupName,
  conditionLabel = null,
  status = null,
  createdByUserId = null,
  imageId = null
}) {
  if (!groupName?.trim()) {
    throw new Error('Group name is required.')
  }

  const url = `${DIRECTUS_URL}/items/footguard_workgroups`

  // Only include fields that have a value — Directus handles nulls fine,
  // but this keeps the payload clean and explicit.
  const body = {
    group_name: groupName.trim(),
    ...(conditionLabel ? { condition_label: conditionLabel.trim() } : {}),
    ...(status ? { status } : {}),
    ...(createdByUserId ? { created_by_user_id: Number(createdByUserId) } : {}),
    ...(imageId ? { image: imageId } : {})
  }

  let response
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
  } catch (networkError) {
    throw new Error(`Network error while creating group: ${networkError.message}`)
  }

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Directus API error while creating group: ${response.status} - ${errorBody}`)
  }

  const json = await response.json()
  return json.data
}

/**
 * Fetches users for the create-group member picker.
 *
 * @returns {Promise<Array<{ id: number, name: string, email: string | null, role: string | null }>>}
 */
export async function fetchUserOptions() {
  const url = `${DIRECTUS_URL}/items/footguard_users?fields=id,name,email,role&limit=-1&sort=name`

  let response
  try {
    response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
  } catch (networkError) {
    throw new Error(`Network error while fetching users: ${networkError.message}`)
  }

  if (!response.ok) {
    throw new Error(`Directus API error while fetching users: ${response.status}`)
  }

  const json = await response.json()

  return (json.data ?? []).map((user) => ({
    id: user.id,
    name: user.name || user.email || 'Unknown',
    email: user.email ?? null,
    role: Array.isArray(user.role) ? user.role[0] : (user.role ?? null)
  }))
}

/**
 * Bulk-fetches users from footguard_users by their IDs in a single request.
 * Avoids the N+1 pattern of calling findUserById once per selected member.
 *
 * @param {Array<number | string>} userIds
 * @returns {Promise<object[]>}
 */
export async function findUsersByIds(userIds) {
  const ids = (userIds ?? []).map((id) => Number(id)).filter((id) => Number.isFinite(id) && id > 0)

  if (ids.length === 0) return []

  const url = `${DIRECTUS_URL}/items/footguard_users?filter[id][_in]=${ids.join(',')}&fields=id,name,email,role&limit=-1`

  let response
  try {
    response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
  } catch (networkError) {
    throw new Error(`Network error while looking up users: ${networkError.message}`)
  }

  if (!response.ok) {
    throw new Error(`Directus API error while looking up users: ${response.status}`)
  }

  const json = await response.json()
  return json.data ?? []
}

/**
 * @param {number | string} userId
 * @returns {Promise<object | null>}
 */
export async function findUserById(userId) {
  const url = `${DIRECTUS_URL}/items/footguard_users?filter[id][_eq]=${Number(userId)}&fields=id,name,email,role&limit=1`

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
    throw new Error(`Directus API error while looking up user: ${response.status}`)
  }

  const json = await response.json()
  return json.data?.[0] ?? null
}

/**
 * Uploads an image file to Directus and returns the file id.
 *
 * @param {File} file
 * @returns {Promise<string>}
 */
export async function uploadImageToDirectus(file) {
  const body = new FormData()
  body.append('file', file)

  let response
  try {
    response = await fetch(`${DIRECTUS_URL}/files`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`
      },
      body
    })
  } catch (networkError) {
    throw new Error(`Network error while uploading image: ${networkError.message}`)
  }

  if (!response.ok) {
    const details = await response.text().catch(() => '')
    throw new Error(`Directus file upload failed (${response.status}): ${details}`)
  }

  const json = await response.json()
  const fileId = json?.data?.id
  if (!fileId) {
    throw new Error('Directus file upload did not return a file id.')
  }

  return String(fileId)
}
