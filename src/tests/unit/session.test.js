/** @author: Razan Sagheer */

import { describe, it, expect } from 'vitest'

const INACTIVITY_LIMIT_MS = 60 * 60 * 1000 // 1 hour

/**
 * Helper function that checks if a session has expired.
 * This is the same logic as in hooks.server.ts.
 * White-box test
 */
function isSessionExpired(lastSeen) {
  return Date.now() - lastSeen > INACTIVITY_LIMIT_MS
}

describe('Session expiration', () => {
  it('session has NOT expired if lastSeen is recent', () => {
    // LastSeen = now
    const lastSeen = Date.now()
    expect(isSessionExpired(lastSeen)).toBe(false)
  })

  it('session has expired after more than 1 hour of inactivity', () => {
    // LastSeen = 2 hours ago
    const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000
    expect(isSessionExpired(twoHoursAgo)).toBe(true)
  })

  // White-box test
  it('session EXPIRED after exactly 1 hour + 1 millisecond', () => {
    // Edge case: right over the border
    const justOver = Date.now() - INACTIVITY_LIMIT_MS - 1
    expect(isSessionExpired(justOver)).toBe(true)
  })

  it('session did NOT expire after 59 minutes', () => {
    // 59 minutes ago — still just valid
    const fiftyNineMinutesAgo = Date.now() - 59 * 60 * 1000
    expect(isSessionExpired(fiftyNineMinutesAgo)).toBe(false)
  })
})
