import { redirect, type Handle } from '@sveltejs/kit'
import { dev } from '$app/environment'

const SESSION_COOKIE = 'session'
const INACTIVITY_LIMIT_MS = 60 * 60 * 1000 // 1 hour

type SessionCookie = {
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
  const protectedPaths = ['/dashboard', '/assessment', '/admin']
  const isProtected = protectedPaths.some((p) => event.url.pathname.startsWith(p))

  if (isProtected && !event.locals.user) {
    throw redirect(302, '/login')
  }

  // Role-based access control
  const adminOnlyPaths = ['/admin']
  const assessorPaths = ['/research', '/results']

  const path = event.url.pathname

  // not logged in -> redirect to login
  if (!event.locals.user) {
    const protectedPaths = ['/admin', '/research', '/results', '/profile', '/notifications']
    if (protectedPaths.some((p) => path.startsWith(p))) {
      throw redirect(302, '/login')
    }
  }

  // Logged in but wrong role
  if (event.locals.user) {
    const role = event.locals.user.role

    //Only super_admin and admin can access /admin
    if (path.startsWith('/admin') && role !== 'super_admin' && role !== 'admin') {
      throw redirect(302, '/')
    }
  }

  return resolve(event)
}
