/** @author Razan Sagheer */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import crypto from 'crypto'

// ============================================
// HELPER FUNCTIONS — same logic as the real API
// We test the logic independently from SvelteKit/Directus
// ============================================

/**
 * Simulates what the real API does:
 * 1. Look up the user in Directus
 * 2. Generate a token and store it
 * 3. Return success or not-found
 */
async function handleMagicLinkRequest(email, fetchFn) {
  // Step 1: Lookup user in Directus
  const userRes = await fetchFn(
    `https://fdnd-agency.directus.app/items/footguard_users?filter[email][_icontains]=${email}&limit=25`
  )
  const userData = await userRes.json()
  const users = userData?.data ?? []
  const user = users.find((u) => String(u.email).toLowerCase() === email.toLowerCase())

  // User not found -> still return success (security: do not leak user existence)
  if (!user) {
    return { success: true, userFound: false }
  }

  // Step 2: Generate token
  const rawToken = crypto.randomBytes(32).toString('hex')
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex')
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString()

  // Step 3: Store token in Directus
  const insertRes = await fetchFn(`https://fdnd-agency.directus.app/items/footguard_magic_links`, {
    method: 'POST',
    body: JSON.stringify({
      email: user.email,
      token_hash: tokenHash,
      expires_at: expiresAt,
      used_at: null
    })
  })

  await insertRes.json()

  if (!insertRes.ok) {
    return { success: false, error: 'insert failed' }
  }

  return { success: true, userFound: true, tokenStored: true }
}

// ============================================
// TESTS
// ============================================

describe('Integration: POST /api/magic-link', () => {
  beforeEach(() => {
    // Reset all mocks before each test so they do not affect each other
    vi.resetAllMocks()
  })

  // TEST 3a — Happy path: existing email
  it('returns success and stores token for an existing email', async () => {
    // Mock fetch to simulate Directus responses
    const mockFetch = vi
      .fn()
      // First call: user lookup
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [{ id: 1, email: 'test@fdnd.nl', role: 'assessor', workgroup: 'group1' }]
        })
      })
      // Second call: token insert
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: { id: '123' } })
      })

    const result = await handleMagicLinkRequest('test@fdnd.nl', mockFetch)

    // Expected: success and token stored
    expect(result.success).toBe(true)
    expect(result.userFound).toBe(true)
    expect(result.tokenStored).toBe(true)

    // Directus should have been called twice (lookup + insert)
    expect(mockFetch).toHaveBeenCalledTimes(2)
  })

  // -------------------------------------------------
  // TEST 3b — Unknown email (security: also returns success)
  // -------------------------------------------------
  it('returns success for an unknown email to prevent user enumeration', async () => {
    // Mock fetch - Directus returns no users
    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: [] }) // empty array = user not found
    })

    const result = await handleMagicLinkRequest('unknown@nowhere.com', mockFetch)

    // Expected: success but no token stored
    expect(result.success).toBe(true)
    expect(result.userFound).toBe(false)

    //Directus should only have been called once (lookup only, no insert)
    expect(mockFetch).toHaveBeenCalledTimes(1)
  })

  // -------------------------------------------------
  // TEST 3c — Directus error during insert
  // -------------------------------------------------
  it('returns an error if storing the token in Directus fails', async () => {
    // Mock fetch — user found but insert fails
    const mockFetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [{ id: 1, email: 'test@fdnd.nl', role: 'assessor' }]
        })
      })
      // Insert fails
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({ errors: ['insert failed'] })
      })

    const result = await handleMagicLinkRequest('test@fdnd.nl', mockFetch)

    // Expected: not successful
    expect(result.success).toBe(false)
    expect(result.error).toBe('insert failed')
  })
})
