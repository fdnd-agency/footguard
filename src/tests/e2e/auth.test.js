/** @author Razan Sagheer */

import { test, expect } from '@playwright/test'

/**
 * E2E tests for authentication and route protection.
 *
 * These tests simulate a real user in the browser.
 * Playwright opens a real browser and navigates to pages,
 * just like a real user would.
 *
 * Test 4: A user without a session visits /dashboard
 * They should be redirected to /login
 */

test.describe('Route protection', () => {
  test.beforeEach(async ({ context }) => {
    //  Clear all cookies before each test
    // This ensures no session exists at the start of each test
    await context.clearCookies()
  })

  // -------------------------------------------------
  // TEST 4 — Main test: protected route without session
  // This is a Black box test (test only what the user see)
  // -------------------------------------------------

  test('user without a session is redirected to /login when visiting /dashboard', async ({
    page
  }) => {
    // Make sure there is no session cookie
    await page.context().clearCookies()

    // Try to visit the protected dashboard page
    await page.goto('/dashboard')

    // Wait for the redirect to complete
    await page.waitForURL(/.*\/login/)

    // Verify the user ended up on /login
    expect(page.url()).toMatch(/.*\/login/)
  })

  // -------------------------------------------------
  // Extra test: login page is accessible without session
  // this is a black-box test
  // -------------------------------------------------
  test('login page is visible and accessible without a session', async ({ page }) => {
    await page.goto('/login')

    // The email input field should be visible
    await expect(page.locator('input[type="email"]')).toBeVisible()

    // The submit button should be visible
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  // -------------------------------------------------
  // Extra test: root route redirects to /login without session
  // -------------------------------------------------
  test('root route redirects to /login without a session', async ({ page }) => {
    // Visit the root of the site
    await page.goto('/')

    // Should be redirected to /login
    await expect(page).toHaveURL(/.*\/login/)
  })

  // -------------------------------------------------
  // Extra test: /research is protected without session
  // -------------------------------------------------
  test('user without a session is redirected to /login when visiting /research', async ({
    page
  }) => {
    await page.goto('/research')

    // Should be redirected to /login
    await expect(page).toHaveURL(/.*\/login/)
  })
})
