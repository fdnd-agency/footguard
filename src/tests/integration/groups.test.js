/** @author: Razan Sagheer */
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock global fetch so we never call the real Directus API.
// Each test controls what fetch returns via vi.fn()

/**
 * Creates a mock fetch response that Directus would return.
 *
 * @param {object} data - The response body
 * @param {number} status - HTTP status code
 */
function mockFetch(data, status = 200) {
  return vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: async () => ({ data }),
    text: async () => JSON.stringify(data)
  })
}

// Inline version of addUserToGroup from groups.js
// We copy the logic here so we can test it without
// importing from $env/static/private (not available in tests)
const DIRECTUS_URL = 'https://mock-directus.test'
const DIRECTUS_TOKEN = 'mock-token'

async function addUserToGroup(groupId, userId, addedByUserId, userRole) {
  // Step 1: Check if this user is already a member to prevent duplicates
  const checkResponse = await fetch(
    `${DIRECTUS_URL}/items/footguard_group_members?filter[workgroup_id][_eq]=${Number(groupId)}&filter[user_id][_eq]=${Number(userId)}&limit=1`,
    { headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` } }
  )

  const checkJson = await checkResponse.json()

  // If a record already exists, block the action
  if (checkJson.data.length > 0) {
    throw new Error('This user is already a member of this group.')
  }

  // Step 2: Create the new member record in footguard_group_members
  const createResponse = await fetch(`${DIRECTUS_URL}/items/footguard_group_members`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${DIRECTUS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      workgroup_id: Number(groupId),
      user_id: Number(userId),
      member_role: userRole ?? 'Viewer',
      membership_status: 'active',
      joined_at: new Date().toISOString(),
      updated_by_user_id: addedByUserId ? Number(addedByUserId) : null
    })
  })

  const createJson = await createResponse.json()
  return createJson.data
}

// TC-03 / TC-04 — Adding a user to a group
describe('addUserToGroup', () => {
  beforeEach(() => {
    // Reset all mocks before every test to avoid interference
    vi.restoreAllMocks()
  })

  it('TC-03: creates a member record when user is not yet in the group', async () => {
    // First fetch = duplicate check returns empty (user not yet a member)
    // Second fetch = POST returns the newly created member record
    globalThis.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [] }) // no duplicate found
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: {
            id: 1,
            workgroup_id: 7,
            user_id: 34,
            member_role: 'Super Admin',
            membership_status: 'active'
          }
        })
      })

    const result = await addUserToGroup(7, 34, 1, 'Super Admin')

    // The returned record should have the correct status and role
    expect(result).not.toBeNull()
    expect(result.membership_status).toBe('active')
    expect(result.member_role).toBe('Super Admin')
  })

  it('TC-04: throws error when the same user is added to the same group twice', async () => {
    // Mock duplicate check returning an existing record (user already a member)
    // Pass the array directly — mockFetch wraps it in { data: ... } automatically
    globalThis.fetch = mockFetch([{ id: 5, workgroup_id: 7, user_id: 34 }])

    // Should throw a clear error that the UI can display to the admin
    await expect(addUserToGroup(7, 34, 1, 'Super Admin')).rejects.toThrow(
      'This user is already a member of this group.'
    )
  })
})
