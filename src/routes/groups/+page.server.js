/** @author:Razan Sagheer **/
// Fetches workgroup data from Directus before the page renders.
// The API token stays secure because this code only runs on the server.

import { fetchGroups } from '$lib/server/groups.js'
import { error, redirect } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'

const DIRECTUS_URL = env.DIRECTUS_URL
const DIRECTUS_TOKEN = env.DIRECTUS_TOKEN

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
  remove: async ({ request }) => {
    const formData = await request.formData()
    const memberId = String(formData.get('memberId') ?? '').trim()

    if (!memberId) {
      throw error(400, 'Missing member id.')
    }

    if (!DIRECTUS_TOKEN) {
      throw error(500, 'Missing Directus token.')
    }

    const response = await fetch(`${DIRECTUS_URL}/items/footguard_group_members/${encodeURIComponent(memberId)}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`
      }
    })

    if (!response.ok) {
      const details = await response.text().catch(() => '')
      throw error(500, details || 'Could not remove member from Directus.')
    }

    throw redirect(303, '/groups')
  }
}
