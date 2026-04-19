/** @author:Razan Sagheer **/
// Fetches workgroup data from Directus before the page renders.
// The API token stays secure because this code only runs on the server.

import {
  fetchGroups,
  findUserByEmail,
  addUserToGroup,
  getGroupMembers
} from '$lib/server/groups.js'
import { error, fail } from '@sveltejs/kit'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  try {
    const groups = await fetchGroups()

    // Fetch pending invites for each group in parallel
    // can show member names and avatars on page load
    const groupsWithMembers = await Promise.all(
      groups.map(async (group) => {
        try {
          const members = await getGroupMembers(group.id)
          return { ...group, members, memberCount: members.length }
        } catch {
          // If fetching invites fails for one group, don't crash the whole page
          // just return the group with an empty pending list
          return { ...group, members: [], memberCount: 0 }
        }
      })
    )
    // Pass groups (with their members) to +page.svelte via the data prop
    return {
      groups: groupsWithMembers,
      loadError: null
    }
  } catch {
    // Throw a proper SvelteKit error with status code
    throw error(500, 'Could not load groups. Please try again later.')
  }
}

export const actions = {
  /**
   * Handles adding an existing Directus user to a group by email.
   * The admin types an email → we find the user → we add them directly.
   * No email is sent, no pending step — the user is immediately a member.
   *
   * Steps:
   * 1. Validate email and groupId
   * 2. Look up the user in Directus by email via findUserByEmail()
   * 3. Add their user_id to footguard_group_members via addUserToGroup()
   *
   * @type {import('./$types').Actions}
   */
  addMember: async ({ request, locals }) => {
    const data = await request.formData()
    const email = data.get('email')?.toString().trim()
    const groupId = data.get('groupId')?.toString()
    const addedByUserId = locals.user?.id ?? null

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
      // Step 1: Find the user in Directus by their email address
      const user = await findUserByEmail(email)

      // If no user found, the admin cannot add someone who doesn't have an account
      if (!user) {
        return fail(404, {
          groupId,
          error: 'No user found with this email address. The user must have an account first.'
        })
      }

      // Step 2: Add the user directly to the group using their Directus user ID
      await addUserToGroup(groupId, user.id, addedByUserId)

      // footguard_users has a single 'name' field, not first_name + last_name
      const userName = user.name || email

      // Return success so the UI updates without a full page reload
      return {
        success: true,
        groupId,
        email,
        userName
      }
    } catch (err) {
      // Return the error message from the server function
      // e.g. "This user is already a member of this group."
      return fail(500, {
        groupId,
        error: err.message || 'Failed to add member. Please try again.'
      })
    }
  }
}
