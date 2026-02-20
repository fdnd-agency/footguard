import { json } from '@sveltejs/kit'
import crypto from 'crypto'
import { env } from '$env/dynamic/private'

const DIRECTUS_URL = 'https://fdnd-agency.directus.app'
const DIRECTUS_TOKEN = env.DIRECTUS_TOKEN

/**
 * In-memory Rate Limiter Store
 * This stores request counts per IP and per email.
 */
const rateLimiterStore = new Map()

// Maximum allowed requests per IP within time window
const MAX_REQUESTS_PER_IP = 5

// Maximum allowed requests per email within time window
const MAX_REQUESTS_PER_EMAIL = 3

// Time window (10 minutes)
const TIME_WINDOW_MS = 10 * 60 * 1000

/**
 * Helper Function: Check & Update Rate Limit
 */
function checkRateLimit(key, maxRequests) {
  const now = Date.now()
  const entrry = rateLimiterStore.get(key)

  if (!entrry) {
    // First request
    rateLimiterStore.set(key, {
      count: 1,
      firstRequestTime: now
    })
    return false // Not rate limited
  }
  const { count, firstRequestTime } = entrry

  // If still inside window
  if (now - firstRequestTime < TIME_WINDOW_MS) {
    if (count >= maxRequests) {
      return true // Rate limited
    }

    // Increment counter
    rateLimiterStore.set(key, {
      count: count + 1,
      firstRequestTime
    })
    return false // Not rate limited
  }

  // Window expired, reset counter
  rateLimiterStore.set(key, {
    count: 1,
    firstRequestTime: now
  })
  return false // Not rate limited
}

/**
 * POST /api/magic-link
 * Generates a secure magic link and stores hashed token in Directus
 */
export async function POST({ request, getClientAddress }) {
  try {
    const ip = getClientAddress()
    const body = await request.json()
    const email = body.email?.toLowerCase().trim()

    if (!email) {
      return json({ error: 'Email is required' }, { status: 400 })
    }

    /**
     * IP Rate Limiting
     */
    if (checkRateLimit(`ip:${ip}`, MAX_REQUESTS_PER_IP)) {
      return json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    /**
     * Email Rate Limiting
     */
    if (checkRateLimit(`email:${email}`, MAX_REQUESTS_PER_EMAIL)) {
      return json({ error: 'Too many attempts for this email..' }, { status: 429 })
    }

    /**
     * Check if email exists in Directus
     *  We do NOT reveal whether email exists (prevents enumeration)
     */
    const userResponse = await fetch(`${DIRECTUS_URL}/items/users?filter[email][_eq]=${email}`, {
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`
      }
    })

    const userData = await userResponse.json()

    // If no user found -> return generic success
    if (!userData.data || userData.data.length === 0) {
      return json({ success: true })
    }
    const user = userData.data[0]

    /**
     * Generate Secure Random Token
     * We generate a random 32-byte token
     */
    const rawToken = crypto.randomBytes(32).toString('hex')

    /**
     * Hash the token before storing
     * Never store raw tokens in the database for security reasons
     */
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex')

    /**
     * Set Expiry (15 minutes)
     */
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString()

    /**
     * Store hashed token in Directus
     *
     */

    await fetch(`${DIRECTUS_URL}/items/footguard_magic_links`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${DIRECTUS_TOKEN}`
      },
      body: JSON.stringify({
        email: user.email,
        token_hash: tokenHash,
        expires_at: expiresAt
      })
    })

    /**
     * Create Magic Link URL
     */
    const magicLink = `http://localhost:5173/magic-login?token=${rawToken}`

    /**
     * Send Email
     *
     */

    console.log('Magic link:', magicLink)

    return json({ success: true })
  } catch (error) {
    console.error(error)
    return json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
