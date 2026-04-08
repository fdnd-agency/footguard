/** @author:Razan Sagheer **/
// Fetches workgroup data from Directus before the page renders.
// The API token stays secure because this code only runs on the server.

import { fetchGroups } from '$lib/server/groups.js'
import { error } from '@sveltejs/kit'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  try {
    const groups = await fetchGroups()

    // Pass groups to +page.svelte via the `data` prop
    return {
      groups,
      loadError: null
    }
  } catch {
    // Throw a proper SvelteKit error with status code
    throw error(500, 'Could not load groups. Please try again later.')
  }
}
