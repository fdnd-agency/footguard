/** @author:Razan Sagheer **/
// Fetches workgroup data from Directus before the page renders.
// The API token stays secure because this code only runs on the server.

import {
  fetchGroups,
  findUserByEmail,
  addUserToGroup,
  removeMemberFromGroup,
  getGroupArticles,
  createGroup
} from '$lib/server/groups.js'
import { error, fail } from '@sveltejs/kit'

function normalizeRole(role) {
  return String(role ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')
}

function isAdminUser(user) {
  const role = normalizeRole(user?.role)
  return role === 'admin' || role === 'super_admin'
}

/** Query param that opens the create-group drawer (see +page.svelte, AddGroupButton). */
const CREATE_GROUP_QUERY = 'create-new-group'

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, url }) {
  try {
    const groups = await fetchGroups()

    // Fetch only articles per group — members are already included in fetchGroups()
    const groupsWithData = await Promise.all(
      groups.map(async (group) => {
        try {
          // Members already fetched inside fetchGroups(), only articles need separate fetch
          const articles = await getGroupArticles(group.id)
          return {
            ...group,
            articles
          }
        } catch {
          // If articles fail for one group, keep page functional for others
          return { ...group, articles: [] }
        }
      })
    )

    const isAdmin = isAdminUser(locals.user)
    const openCreateGroupFromUrl = url.searchParams.has(CREATE_GROUP_QUERY)

    return {
      groups: groupsWithData,
      loadError: null,
      isAdmin,
      // Open create-group drawer when URL has ?create-new-group (admins only).
      showCreateModal: isAdmin && openCreateGroupFromUrl
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
  },
  /**
   * Handles creating a new workgroup.
   * Only group_name is required; condition_label, status, and image are optional.
   * Image upload (multipart/file) is handled separately — for now only text fields.
   *
   * @type {import('./$types').Actions}
   */
  createGroup: async ({ request, locals }) => {
    const data = await request.formData()
    const currentUserId = locals.user?.id ?? null

    const groupName = data.get('groupName')?.toString().trim()
    const conditionLabel = data.get('conditionLabel')?.toString().trim() || null
    const status = data.get('status')?.toString().trim() || null
    // imageId comes later when the frontend modal with file upload is built
    const imageId = data.get('imageId')?.toString().trim() || null

    // --- Validation: group name is the only required field ---
    if (!groupName) {
      return fail(400, {
        error: 'Group name is required.',
        field: 'groupName',
        action: 'createGroup'
      })
    }

    try {
      const newGroup = await createGroup({
        groupName,
        conditionLabel,
        status,
        createdByUserId: currentUserId,
        imageId
      })

      // Return the new group so the frontend can append it to the list
      // without a full page reload.
      return {
        success: true,
        action: 'createGroup',
        group: {
          id: newGroup.id,
          name: newGroup.group_name,
          status: newGroup.status ?? null,
          conditionlabel: newGroup.condition_label ?? 'General',
          members: [],
          memberCount: 0,
          articles: [],
          image: null // image upload handled later
        }
      }
    } catch (err) {
      return fail(500, {
        error: err.message || 'Failed to create group. Please try again.',
        action: 'createGroup'
      })
    }
  }
}
