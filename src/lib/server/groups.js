/** @author:Razan Sagheer **/
// Service to fetch all available workgroups from the Directus API.
// Uses the footguard_workgroups collection.

import { DIRECTUS_URL, DIRECTUS_TOKEN } from '$env/static/private'

function buildDirectusAssetUrl(fileId) {
  return fileId ? `${DIRECTUS_URL}/assets/${fileId}` : null
}
/**
 * Fetches all workgroups from Directus.
 * Member count is 0 for now since footguard_group_members has no data yet.
 *
 * @returns {Promise<Array>} List of workgroup objects
 * @throws {Error} If the API call fails
 */
export async function fetchGroups() {
  const groupsUrl = `${DIRECTUS_URL}/items/footguard_workgroups?fields=id,group_name,status,condition_label,created_by_user_id`
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
      memberCount: members.length
    }
  })
}
