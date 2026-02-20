import { redirect } from '@sveltejs/kit'
import crypto from 'crypto'

const DIRECTUS_URL = 'https://fdnd-agency.directus.app'
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN

export async function GET({ url, cookies }) {
  /**
   * 1. Get token from query paeameter
   * Example: /magic-login?token=abc123
   */
  const rowToken = url.searchParams.get('token')

  if (!rowToken) {
    throw redirect(302, '/login')
  }
  /**
   * 2. Hash the token (beacuse we stored only the hash in DB)
   */
  const tokenHash = crypto.createHash('sha256').update(rowToken).digest('hex')

  /**
   * Check token in Directus
   */
  const response = await fetch(
    `${DIRECTUS_URL}/items/footguard_magic_links?filter[token_hash][_eq]=${tokenHash}`,
    {
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`
      }
    }
  )
  const data = await response.json()

  if (!data.data || data.data.length === 0) {
    // Token not found
    throw redirect(302, '/login')
  }

  const magicLink = data.data[0]
  /**
   * Check if token is expired
   */
  if (magicLink.used) {
    throw redirect(302, '/login')
  }

  /**
   * Mark token as used
   */
  await fetch(`${DIRECTUS_URL}/items/footguard_magic_links/${magicLink.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DIRECTUS_TOKEN}`
    },
    body: JSON.stringify({
      used_at: new Date().toISOString()
    })
  })

  /**
   * Fetch the user from Directus
   */
  const userRespone = await fetch(
    `${DIRECTUS_URL}/items/footguard_users?filter[email][_eq]=${magicLink.email}`,
    {
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`
      }
    }
  )
  const userData = await userRespone.json()
  if (!userData.data || userData.data.length === 0) {
    throw redirect(302, '/login')
  }

  const user = userData.data[0]

  /**
   * Create sessie object
   * Store only necessary data
   */
  const sessionUser = {
    id: user.id,
    email: user.email,
    role: user.role,
    workgroup: user.workgroup
  }

  /**
   * Store session in cookie
   * HttpOnly prevents JS access
   */
  cookies.set('session', JSON.stringify(sessionUser), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 // 1 hour
  })

  /**
   *  Redirect to dashboard
   */
  throw redirect(302, '/dashboard')
}
