/** @author:Razan Sagheer **/
// Service to fetch all available workgroups from the Directus API.
// Uses the footguard_workgroups collection.

import { DIRECTUS__URL, DIRECTUS_TOKEN } from '$env/static/private'

/**
 * Fetches all workgroups from Directus.
 * Member count is 0 for now since footguard_group_members has no data yet.
 *
 * @returns {Promise<Array>} List of workgroup objects
 * @throws {Error} If the API call fails
 */
export async function fetchGroups() {
  const url = `${DIRECTUS__URL}/items/footguard_workgroups?fields=id,group_name,status,condition_label,created_by_user_id`

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${DIRECTUS_TOKEN}`,
      'Content-Type': 'application/json'
    }
  })

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
