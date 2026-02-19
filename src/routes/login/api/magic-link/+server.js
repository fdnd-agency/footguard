import { json } from '@sveltejs/kit'
import crypto from 'crypto'

const DIRECTUS_URL = 'https://fdnd-agency.directus.app'


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
