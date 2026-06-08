/** @author:Razan Sagheer **/
import { redirect, type Handle } from '@sveltejs/kit'
import { dev } from '$app/environment'
import { env } from '$env/dynamic/private'
import crypto from 'crypto'

const SESSION_COOKIE = 'session'
const INACTIVITY_LIMIT_MS = 60 * 60 * 1000 // 1 hour

type SessionCookie = {
  id: string
  email: string
  role: string
  workgroup: string | null
  lastSeen: number
}

export const handle: Handle = async ({ event, resolve }) => {
  const raw = event.cookies.get(SESSION_COOKIE)

  if (raw) {
    try {
      // Verify JWT-like token signed with HMAC-SHA256
      const SECRET = env.DIRECTUS_TOKEN

      const base64urlDecode = (str: string) =>
        Buffer.from(str.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString()

      const parts = raw.split('.')
      if (parts.length !== 3) {
        throw new Error('invalid token format')
      }

      const [encodedHeader, encodedPayload, signature] = parts
      const signingInput = `${encodedHeader}.${encodedPayload}`
      const expectedSig = crypto.createHash('sha256').update(signingInput).digest('hex')

      let session: SessionCookie | null = null

      if (signature !== expectedSig) {
        // invalid signature — try legacy JSON cookie parse
        try {
          session = JSON.parse(raw) as SessionCookie
        } catch {
          session = null
        }
      } else {
        // signature valid — parse payload
        try {
          const payloadJson = base64urlDecode(encodedPayload)
          const parsed = JSON.parse(payloadJson) as SessionCookie
          session = parsed
        } catch {
          session = null
        }
      }

      if (!session) {
        event.cookies.delete(SESSION_COOKIE, { path: '/' })
      } else {
        const hasRequired =
          typeof session.id === 'string' &&
          typeof session.email === 'string' &&
          typeof session.role === 'string' &&
          typeof session.lastSeen === 'number' &&
          'workgroup' in session

        if (!hasRequired) {
          event.cookies.delete(SESSION_COOKIE, { path: '/' })
        } else {
          const now = Date.now()
          const inactiveTooLong = now - session.lastSeen > INACTIVITY_LIMIT_MS

          if (inactiveTooLong) {
            event.cookies.delete(SESSION_COOKIE, { path: '/' })
          } else {
            event.locals.user = {
              id: session.id,
              email: session.email,
              role: session.role,
              workgroup: session.workgroup
            }

            // Sliding expiration: refresh lastSeen + renew cookie maxAge
            const refreshed: SessionCookie = { ...session, lastSeen: now }

            // Re-sign token with refreshed payload
            const base64url = (input: any) =>
              Buffer.from(typeof input === 'string' ? input : JSON.stringify(input))
                .toString('base64')
                .replace(/=/g, '')
                .replace(/\+/g, '-')
                .replace(/\//g, '_')

            const newSigningInput = `${base64url({ alg: 'HS256', typ: 'JWT' })}.${base64url(refreshed)}`
            const newSignature = crypto.createHash('sha256').update(newSigningInput).digest('hex')

            const newToken = `${newSigningInput}.${newSignature}`

            event.cookies.set(SESSION_COOKIE, newToken, {
              httpOnly: true,
              secure: !dev,
              sameSite: 'lax',
              path: '/',
              maxAge: 60 * 60
            })
          }
        }
      }
    } catch (err) {
      // Any unexpected error => wipe cookie
      event.cookies.delete(SESSION_COOKIE, { path: '/' })
    }
  }
  const path = event.url.pathname

  if (!event.locals.user) {
    const publicPaths = ['/login']
    const isPublic = publicPaths.some((p) => path === p || path.startsWith(p + '/'))
    if (!isPublic) {
      throw redirect(302, '/login')
    }
  }

  // not logged in -> redirect to login
  if (event.locals.user) {
    const role = event.locals.user.role.toLowerCase()

    // Alleen super_admin en admin kunnen naar /admin
    if (path.startsWith('/admin') && role !== 'super_admin' && role !== 'admin') {
      throw redirect(302, '/')
    }

    // Guest mag ALLEEN naar /research
    if (role === 'guest') {
      const guestAllowed = ['/research', '/login', '/logout', '/']
      const isAllowed = guestAllowed.some((p) => (path === '/' ? path === p : path.startsWith(p)))

      if (!isAllowed) {
        throw redirect(302, '/research')
      }
    }
  }

  return resolve(event)
}
