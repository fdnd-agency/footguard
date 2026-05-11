/** @author: Razan Sagheer */
import { describe, it, expect } from 'vitest'

/**
 * Validates an email address format.
 * This is the same regex used in +page.server.js and GroupInviteForm.svelte.
 *
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  if (!email || !email.trim()) return false
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// TC-01 / TC-02 — Email validation
// TC-05 / TC-06 — Email format validation
describe('Email validation', () => {
  it('TC-01: accepts a valid email address', () => {
    // A correctly formatted email should pass validation
    expect(isValidEmail('razan.sagheer@hva.nl')).toBe(true)
  })

  it('TC-02: rejects an email without @ symbol', () => {
    // Missing @ makes it an invalid email
    expect(isValidEmail('niet-een-email')).toBe(false)
  })

  it('TC-02: rejects an email without domain', () => {
    // Missing domain part after @ is invalid
    expect(isValidEmail('test@')).toBe(false)
  })

  it('TC-01: accepts email with subdomain', () => {
    // Subdomains are valid in email addresses
    expect(isValidEmail('user@mail.example.com')).toBe(true)
  })

  it('TC-05: rejects an invalid email format', () => {
    // Missing @ makes it an invalid email — server should return 400
    expect(isValidEmail('niet-een-email')).toBe(false)
  })

  it('TC-06: rejects an empty email field', () => {
    // Empty input should always fail — server should return 400
    expect(isValidEmail('')).toBe(false)
  })
})
