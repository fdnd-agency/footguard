/** @author:Razan Sagheer **/
// Fetches workgroup data from Directus before the page renders.
// The API token stays secure because this code only runs on the server.

import { fetchGroups, inviteUserToGroup, getPendingInvites } from '$lib/server/groups.js'
import { error, fail } from '@sveltejs/kit'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  try {
    const groups = await fetchGroups()

    // Fetch pending invites for each group in parallel
    // so the UI can show pending badges on page load
    const groupsWithInvites = await Promise.all(
      groups.map(async (group) => {
        try {
          const pendingInvites = await getPendingInvites(group.id)
          return { ...group, pendingInvites }
        } catch {
          // If fetching invites fails for one group, don't crash the whole page
          // just return the group with an empty pending list
          return { ...group, pendingInvites: [] }
        }
      })
    )
    // Pass groups to +page.svelte via the `data` prop
    return {
      groups: groupsWithInvites,
      loadError: null
    }
  } catch {
    // Throw a proper SvelteKit error with status code
    throw error(500, 'Could not load groups. Please try again later.')
  }
}

export const actions = {
  /**
   * Handles the invite form submission from GroupInviteForm.svelte.
   * Validates the email, then calls inviteUserToGroup() to create
   * a pending invite record in Directus footguard_group_invites.
   *
   * @type {import('./$types').Actions}
   */
  inviteUser: async ({ request, locals }) => {
    const data = await request.formData()
    const email = data.get('email')?.toString().trim()
    const groupId = data.get('groupId')?.toString()

    // Get the current logged-in user ID from SvelteKit locals
    // so we can store who sent the invite in invited_by_user_id
    const invitedByUserId = locals.user?.id ?? null

    // --- Validation: check that both fields are present ---
    if (!email || !groupId) {
      return fail(400, {
        groupId,
        error: 'Email and group are required.'
      })
    }

    // --- Validation: check that the email format is valid ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return fail(400, {
        groupId,
        error: 'Please enter a valid email address.'
      })
    }

    try {
      // Call the server function to create the invite in Directus
      await inviteUserToGroup(groupId, email, invitedByUserId)

      // Return success data so the UI can update without a full page reload
      return {
        success: true,
        groupId,
        email
      }
    } catch (err) {
      // Return a 500 failure with the error message from the server function
      // e.g. duplicate invite error or Directus API error
      return fail(500, {
        groupId,
        error: err.message || 'Failed to send invite. Please try again.'
      })
    }
  }
}
