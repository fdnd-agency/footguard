/** @author:Razan Sagheer **/
import { redirect } from '@sveltejs/kit'
import crypto from 'crypto'
import { env } from '$env/dynamic/private'
import { dev } from '$app/environment'

const DIRECTUS_URL = 'https://fdnd-agency.directus.app'
const DIRECTUS_TOKEN = env.DIRECTUS_TOKEN

export async function GET({ url, cookies }) {
  const rawToken = url.searchParams.get('token')

  if (!rawToken) throw redirect(302, '/login')

  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex')

  // 1) Find magic link
  const response = await fetch(
    `${DIRECTUS_URL}/items/footguard_magic_links?filter[token_hash][_eq]=${encodeURIComponent(tokenHash)}&limit=1`,
    { headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` } }
  )

  const data = await response.json()

  if (!response.ok) {
    console.error('MAGIC LOGIN: magic link lookup failed', data)
    throw redirect(302, '/login')
  }

  if (!data?.data?.length) {
    throw redirect(302, '/login')
  }

  const magicLink = data.data[0]

  // 2) Validate
  if (magicLink.used_at) {
    throw redirect(302, '/login')
  }

  const expiresAtMs = new Date(magicLink.expires_at + 'Z').getTime()
  if (Date.now() > expiresAtMs) {
    throw redirect(302, '/login')
  }

  // 3) Mark used
  const patchRes = await fetch(`${DIRECTUS_URL}/items/footguard_magic_links/${magicLink.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DIRECTUS_TOKEN}`
    },
    body: JSON.stringify({ used_at: new Date().toISOString() })
  })

  if (!patchRes.ok) {
    throw redirect(302, '/login')
  }

  // 4) Fetch user
  const email = String(magicLink.email || '')
  const userResp = await fetch(
    `${DIRECTUS_URL}/items/footguard_users?filter[email][_eq]=${encodeURIComponent(email)}&limit=1`,
    { headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` } }
  )

  const userData = await userResp.json()

  if (!userResp.ok) {
    throw redirect(302, '/login')
  }

  if (!userData?.data?.length) {
    throw redirect(302, '/login')
  }

  const user = userData.data[0]

  // 5) Session (force simple types!)
  const rawRole = Array.isArray(user.role) ? user.role[0] : user.role
  const role = rawRole == null ? '' : String(rawRole).toLowerCase()

  // 5) Session
  const sessionUser = {
    id: String(user.id),
    email: String(user.email),
    role: role,
    workgroup: user.workgroup == null ? null : String(user.workgroup),
    lastSeen: Date.now()
  }

  cookies.set('session', JSON.stringify(sessionUser), {
    httpOnly: true,
    secure: !dev,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60
  })

  // 6) Redirect based on role
  if (sessionUser.role === 'guest') {
    throw redirect(302, '/research')
  }
  throw redirect(302, '/dashboard')
}
