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
 * Removes a group member record in Directus.
 * Uses server-side service credentials only; caller must enforce user authz.
 *
 * @param {string} memberId
 */
export async function removeGroupMember(memberId) {
  const response = await fetch(
    `${DIRECTUS_URL}/items/footguard_group_members/${encodeURIComponent(memberId)}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`
      }
    }
  )

  if (!response.ok) {
    const details = await response.text().catch(() => '')
    throw new Error(details || 'Could not remove member from Directus.')
  }
}
