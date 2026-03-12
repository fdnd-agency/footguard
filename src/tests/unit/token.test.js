//*** @author: Razan Sagheer */
import { describe, it, expect } from 'vitest'
import crypto from 'crypto'

/**
 * Helper function that we also use in the actual code.
 * We test this function separately—this way we ensure that the token
 * is always a valid, non-empty string.
 */
function generateMagicToken() {
  return crypto.randomBytes(32).toString('hex')
}

describe('Magic token generation', () => {
  it('generates a token that is a string', () => {
    const token = generateMagicToken()
    // Check if it's a string
    expect(typeof token).toBe('string')
  })

  it('generates a token that is not empty', () => {
    const token = generateMagicToken()
    // Token cannot be empty
    expect(token.length).toBeGreaterThan(0)
  })

  it('generates unique tokens', () => {
    const token1 = generateMagicToken()
    const token2 = generateMagicToken()
    // Two generated tokens should not be the same
    expect(token1).not.toBe(token2)
  })

  it('generates a 64-character token (32 bytes in hex))', () => {
    const token = generateMagicToken()
    // 32 bytes in hex is 64 characters
    expect(token.length).toBe(64)
  })
})
