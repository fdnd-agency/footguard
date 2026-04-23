/** @author:Razan Sagheer **/
// Fetches workgroup data from Directus before the page renders.
// The API token stays secure because this code only runs on the server.

import {
  fetchGroups,
  findUserByEmail,
  addUserToGroup,
  getGroupMembers,
  removeMemberFromGroup
} from '$lib/server/groups.js'
import { error, fail } from '@sveltejs/kit'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  try {
    const groups = await fetchGroups()

    // Fetch members for each group in parallel.
    const groupsWithMembers = await Promise.all(
      groups.map(async (group) => {
        try {
          const members = await getGroupMembers(group.id)
          return { ...group, members, memberCount: members.length }
        } catch {
          // If members fail for one group, keep page functional for others.
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
   * The user is added directly as an active member (no invite email step).
   *
   * @type {import('./$types').Actions}
   */
  addMember: async ({ request, locals }) => {
    const data = await request.formData()
    const currentUserId = locals.user?.id ?? null
    const email = data.get('email')?.toString().trim()
    const groupId = data.get('groupId')?.toString()
    const addedByUserId = currentUserId

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
      // Extract the first role from the array e.g. ["Super Admin"] -> "Super Admin"
      const rawRole = Array.isArray(user.role) ? user.role[0] : user.role

      // Map footguard_users role values to footguard_group_members member_role values
      // footguard_users uses: Super Admin, Admin, Assessor, Guest
      // footguard_group_members uses: Super Admin, Admin, Assessor, Viewer
      const roleMap = {
        'super admin': 'Super Admin',
        admin: 'Admin',
        assessor: 'Assessor',
        guest: 'Viewer' // Guest maps to Viewer as closest equivalent
      }

      // Fall back to 'Viewer' if the role is not recognized
      const userRole = roleMap[rawRole?.toLowerCase()] ?? 'Viewer'

      await addUserToGroup(groupId, user.id, addedByUserId, userRole)
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
  },

  /**
   * Handles removing a member from a group.
   * This performs a soft remove by setting membership_status to "inactive".
   *
   * @type {import('./$types').Actions}
   */
  remove: async ({ request, locals }) => {
    const data = await request.formData()
    const memberId = data.get('memberId')?.toString()
    const updatedByUserId = locals.user?.id ?? null

    if (!memberId) {
      return fail(400, { error: 'Member ID is required.' })
    }

    try {
      await removeMemberFromGroup(memberId, updatedByUserId)
      return { success: true, removedMemberId: memberId }
    } catch (err) {
      return fail(500, {
        error: err.message || 'Failed to remove member. Please try again.'
      })
    }
  }
}
