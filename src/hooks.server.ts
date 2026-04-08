/** @author:Razan Sagheer **/
import { redirect, type Handle } from '@sveltejs/kit'
import { dev } from '$app/environment'

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
      const session = JSON.parse(raw) as SessionCookie

      const hasRequired =
        typeof session.id === 'string' &&
        typeof session.email === 'string' &&
        typeof session.role === 'string' &&
        typeof session.lastSeen === 'number' &&
        'workgroup' in session

      // If cookie is invalid => delete it
      if (!hasRequired) {
        event.cookies.delete(SESSION_COOKIE, { path: '/' }) // Clear old cookie to reset maxAge
      } else {
        const now = Date.now()
        const inactiveTooLong = now - session.lastSeen > INACTIVITY_LIMIT_MS

        if (inactiveTooLong) {
          // Session expired due to inactivity
          event.cookies.delete(SESSION_COOKIE, { path: '/' })
        } else {
          // Set locals.user
          event.locals.user = {
            id: session.id,
            email: session.email,
            role: session.role,
            workgroup: session.workgroup
          }

          // Sliding expiration: refresh lastSeen + renew cookie maxAge
          const refrehed: SessionCookie = { ...session, lastSeen: now }

          event.cookies.set(SESSION_COOKIE, JSON.stringify(refrehed), {
            httpOnly: true,
            secure: !dev,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60
          })
        }
      }
    } catch {
      // Invalid JSON => wipe cookie
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
