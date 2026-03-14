/** @author:Razan Sagheer **/
import { json } from '@sveltejs/kit'
import crypto from 'crypto'
import { env } from '$env/dynamic/private'
import { env as publicEnv } from '$env/dynamic/public'
import { sendMagicLinkEmail } from '$lib/server/email'

const DIRECTUS_URL = 'https://fdnd-agency.directus.app'
const DIRECTUS_TOKEN = env.DIRECTUS_TOKEN

/**
 * In-memory Rate Limiter Store
 * Key: "ip:xxx" or "email:xxx"
 */
const rateLimiterStore = new Map()

const MAX_REQUESTS_PER_IP = 5
const MAX_REQUESTS_PER_EMAIL = 3
const TIME_WINDOW_MS = 10 * 60 * 1000

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
 * Read email from either JSON or HTML form submit.
 * - fetch(..., { headers: { 'Content-Type': 'application/json' }}) -> JSON
 * - <form method="POST"> -> formData
 */
async function readEmail(request) {
  const contentType = request.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    const body = await request.json()
    return body.email
  }

  // Handles: application/x-www-form-urlencoded and multipart/form-data
  const form = await request.formData()
  return form.get('email')
}

export async function POST({ request, getClientAddress, url }) {
  try {
    const ip = getClientAddress()

    const rawEmail = await readEmail(request)
    const email = String(rawEmail || '')
      .toLowerCase()
      .trim()

    if (!email) {
      return json({ error: 'Email is required' }, { status: 400 })
    }

    // Rate limiting
    if (checkRateLimit(`ip:${ip}`, MAX_REQUESTS_PER_IP)) {
      return json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }
    if (checkRateLimit(`email:${email}`, MAX_REQUESTS_PER_EMAIL)) {
      return json({ error: 'Too many attempts for this email.' }, { status: 429 })
    }

    // --- 1) Lookup user in Directus (your collection: footguard_users) ---
    // NOTE: _eq can be case-sensitive depending on DB/config; we use _icontains
    const userLookupUrl =
      `${DIRECTUS_URL}/items/footguard_users?` +
      `filter[email][_icontains]=${encodeURIComponent(email)}&limit=25`

    const userResponse = await fetch(userLookupUrl, {
      headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` }
    })

    const userData = await userResponse.json()

    if (!userResponse.ok) {
      console.error('Directus user lookup failed:', userResponse.status, userData)
      return json({ error: 'Directus user lookup failed' }, { status: 500 })
    }

    const users = userData?.data ?? []
    const user = users.find((u) => String(u.email || '').toLowerCase() === email)

    /**
     * IMPORTANT:
     * Do not reveal if an email exists in the system.
     * Always return success to prevent user enumeration.
     */
    if (!user) {
      return json({ success: true })
    }

    // --- 2) Generate token + hash ---
    const rawToken = crypto.randomBytes(32).toString('hex')
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex')
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString()

    // --- 3) Store tokenHash in Directus ---
    const insertResponse = await fetch(`${DIRECTUS_URL}/items/footguard_magic_links`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${DIRECTUS_TOKEN}`
      },
      body: JSON.stringify({
        email: user.email, // keep original casing from DB
        token_hash: tokenHash,
        expires_at: expiresAt,
        used_at: null
      })
    })

    const insertData = await insertResponse.json()

    if (!insertResponse.ok) {
      console.error('Directus insert failed:', insertResponse.status, insertData)
      return json({ error: 'Directus insert failed' }, { status: 500 })
    }

    // --- 4) Build magic link from env (no hardcoded localhost) ---
    const appUrl = publicEnv.PUBLIC_APP_URL || url.origin
    const magicLink = `${appUrl}/login/magic-login?token=${rawToken}`

    // --- 5) Send email (dev fallback logs to console) ---
    try {
      await sendMagicLinkEmail({ to: user.email, link: magicLink })
    } catch (e) {
      // Do not leak info th the user, just log server-side
      console.error('Failed to send magic link email:', e)
    }

    return json({ success: true })
  } catch (error) {
    console.error('Magic link endpoint error:', error)
    return json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
