import { json } from '@sveltejs/kit'
import crypto from 'crypto'
import { env } from '$env/dynamic/private'

const DIRECTUS_URL = 'https://fdnd-agency.directus.app'
const DIRECTUS_TOKEN = env.DIRECTUS_TOKEN

/**
 * In-memory Rate Limiter Store
 * Stores request counts per IP and per email for a fixed time window.
 * NOTE: Resets when the server restarts (fine for local/dev).
 */
const rateLimiterStore = new Map()

const MAX_REQUESTS_PER_IP = 5
const MAX_REQUESTS_PER_EMAIL = 3
const TIME_WINDOW_MS = 10 * 60 * 1000 // 10 minutes

function checkRateLimit(key, maxRequests) {
  const now = Date.now()
  const entry = rateLimiterStore.get(key)

  if (!entry) {
    rateLimiterStore.set(key, { count: 1, firstRequestTime: now })
    return false
  }

  const { count, firstRequestTime } = entry

  if (now - firstRequestTime < TIME_WINDOW_MS) {
    if (count >= maxRequests) return true
    rateLimiterStore.set(key, { count: count + 1, firstRequestTime })
    return false
  }

  rateLimiterStore.set(key, { count: 1, firstRequestTime: now })
  return false
}

/**
 * POST /login/api/magic-link
 * - Validate email
 * - Rate limit (IP + email)
 * - Check if email exists in Directus (do NOT reveal result)
 * - Generate token, store hashed token in Directus with expiry
 * - "Send" email (currently console.log)
 */
export async function POST({ request, getClientAddress }) {
  try {
    // 0) Ensure token is present
    if (!DIRECTUS_TOKEN) {
      console.error('Missing DIRECTUS_TOKEN. Did you create .env and restart the dev server?')
      return json({ error: 'Server misconfigured (missing Directus token).' }, { status: 500 })
    }

    const ip = getClientAddress()
    const body = await request.json()
    const email = body.email?.toLowerCase().trim()

    if (!email) {
      return json({ error: 'Email is required' }, { status: 400 })
    }

    // 1) Rate limiting
    if (checkRateLimit(`ip:${ip}`, MAX_REQUESTS_PER_IP)) {
      return json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    if (checkRateLimit(`email:${email}`, MAX_REQUESTS_PER_EMAIL)) {
      return json({ error: 'Too many attempts for this email.' }, { status: 429 })
    }

    // 2) Look up user in Directus (we do NOT reveal if it exists)
    const userUrl = new URL(`${DIRECTUS_URL}/items/footguard_users`)
    userUrl.searchParams.set('filter[email][_eq]', email)
    userUrl.searchParams.set('limit', '1')

    const userResponse = await fetch(userUrl.toString(), {
      headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` }
    })

    const userJson = await userResponse.json()

    // IMPORTANT: if Directus returns 401/403/etc, you want to see it.
    if (!userResponse.ok) {
      console.error('Directus user lookup failed:', userResponse.status, userJson)
      return json({ error: 'Directus user lookup failed' }, { status: 500 })
    }

    // If user does not exist -> return generic success (prevents email enumeration)
    if (!userJson.data || userJson.data.length === 0) {
      return json({ success: true })
    }

    const user = userJson.data[0]

    // 3) Generate secure token + hash
    const rawToken = crypto.randomBytes(32).toString('hex')
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex')
    const expiresAtIso = new Date(Date.now() + 15 * 60 * 1000).toISOString() // 15 minutes

    // 4) Store token hash in Directus
    const createResponse = await fetch(`${DIRECTUS_URL}/items/footguard_magic_links`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${DIRECTUS_TOKEN}`
      },
      body: JSON.stringify({
        email: user.email, // store canonical email
        token_hash: tokenHash,
        expires_at: expiresAtIso,
        used_at: null
      })
    })

    const createJson = await createResponse.json()

    // This is the bug you had: if you don't check this, you can silently fail.
    if (!createResponse.ok) {
      console.error('Directus token insert failed:', createResponse.status, createJson)
      return json({ error: 'Directus token insert failed' }, { status: 500 })
    }

    // 5) Build magic link
    const magicLink = `http://localhost:5173/login/magic-login?token=${rawToken}`

    /**
     * 6) Send email (placeholder)
     * In production you integrate an email provider (SendGrid/Mailgun/Resend/etc)
     */
    console.log('Magic link for', email, ':', magicLink)
    console.log('Created magic link record:', createJson?.data?.id)

    return json({ success: true })
  } catch (error) {
    console.error('Magic link endpoint error:', error)
    return json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
