/** @author:Razan Sagheer **/
// Fetches workgroup data from Directus before the page renders.
// The API token stays secure because this code only runs on the server.

import { fetchGroups } from '$lib/server/groups.js'
import { error, redirect } from '@sveltejs/kit'
import { removeGroupMember } from '$lib/server/groups.js'

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

export const actions = {
  remove: async ({ request, locals }) => {
    if (!locals.user) {
      throw error(401, 'Unauthorized.')
    }

    const formData = await request.formData()
    const memberId = String(formData.get('memberId') ?? '').trim()

    if (!memberId) {
      throw error(400, 'Missing member id.')
    }

    try {
      await removeGroupMember(memberId)
    } catch (e) {
      const details = e instanceof Error ? e.message : ''
      throw error(500, details || 'Could not remove member from Directus.')
    }

    throw redirect(303, '/groups')
  }
}
