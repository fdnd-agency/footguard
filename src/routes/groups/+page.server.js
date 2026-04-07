/** @author:Razan Sagheer **/
// Fetches workgroup data from Directus before the page renders.
// The API token stays secure because this code only runs on the server.

import { fetchGroups } from '$lib/server/groups.js'

/**  @type {import('./$types').PageServerLoad}  */
export async function load() {
  try {
    const groups = await fetchGroups()

    // Pass groups to +page.svelte via the 'data' prop
    return {
      groups,
      loadError: null
    }
  } catch (err) {
    console.error('[groups] Failed to load groups from Directus:', err)

    // Return a safe fallback so the page can render an inline error state
    return {
      groups: [],
      loadError: 'Could not load groups. Please try again later.'
    }
  }
}
