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

  // 1. Normale sessie uit cookie lezen
  if (raw) {
    try {
      const SECRET = env.SESSION_SECRET || env.DIRECTUS_TOKEN

      if (!SECRET) {
        throw new Error('Missing SESSION_SECRET or DIRECTUS_TOKEN')
      }

      const base64urlDecode = (str: string) =>
        Buffer.from(str.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString()

      const parts = raw.split('.')

      if (parts.length !== 3) {
        throw new Error('Invalid token format')
      }

      const [encodedHeader, encodedPayload, signature] = parts
      const signingInput = `${encodedHeader}.${encodedPayload}`

      const expectedSig = crypto
        .createHmac('sha256', SECRET)
        .update(signingInput)
        .digest('hex')

      // Cookie is ongeldig als de handtekening niet klopt.
      // Een cookie mag nooit als los JSON-object worden vertrouwd.
      if (signature !== expectedSig) {
        throw new Error('Invalid token signature')
      }

      const payloadJson = base64urlDecode(encodedPayload)
      const session = JSON.parse(payloadJson) as SessionCookie

      const hasRequired =
        typeof session.id === 'string' &&
        typeof session.email === 'string' &&
        typeof session.role === 'string' &&
        typeof session.lastSeen === 'number' &&
        'workgroup' in session

      if (!hasRequired) {
        throw new Error('Invalid session payload')
      }

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

        // Sliding expiration: vernieuw de sessie bij ieder geldig verzoek.
        const refreshed: SessionCookie = {
          ...session,
          lastSeen: now
        }

        const base64url = (input: unknown) =>
          Buffer.from(typeof input === 'string' ? input : JSON.stringify(input))
            .toString('base64')
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')

        const newSigningInput =
          `${base64url({ alg: 'HS256', typ: 'JWT' })}.` +
          `${base64url(refreshed)}`

        const newSignature = crypto
          .createHmac('sha256', SECRET)
          .update(newSigningInput)
          .digest('hex')

        const newToken = `${newSigningInput}.${newSignature}`

        event.cookies.set(SESSION_COOKIE, newToken, {
          httpOnly: true,
          secure: !dev,
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60
        })
      }
    } catch (err) {
      // Ongeldige, verlopen of defecte cookie verwijderen.
      event.cookies.delete(SESSION_COOKIE, { path: '/' })
    }
  }

  // 2. Tijdelijke publieke bypass voor specifieke Netlify-testhosts.
  //
  // Voorbeeld:
  // AUTH_BYPASS=true
  // AUTH_BYPASS_HOSTS=develop--jullie-site.netlify.app
  //
  // Deze bypass overschrijft bewust ook een eventueel aanwezige sessie:
  // iedere bezoeker op de testhost krijgt dezelfde testrol.
  const bypassHosts = (env.AUTH_BYPASS_HOSTS ?? '')
    .split(',')
    .map((host) => host.trim())
    .filter(Boolean)

  const isPublicTestEnvironment =
    env.AUTH_BYPASS === 'true' &&
    bypassHosts.includes(event.url.hostname)

  if (isPublicTestEnvironment) {
    event.locals.user = {
      // Gebruik indien mogelijk gegevens van een echte testgebruiker uit Directus.
      id: env.AUTH_BYPASS_USER_ID,
      email: env.AUTH_BYPASS_EMAIL,
      role: env.AUTH_BYPASS_ROLE,
      workgroup: env.AUTH_BYPASS_WORKGROUP
    }
  }

  const path = event.url.pathname

  // 3. Niet-ingelogde bezoekers naar login sturen.
  // Op de testhost is event.locals.user al ingevuld door de bypass.
  if (!event.locals.user) {
    const publicPaths = ['/login']
    const isPublic = publicPaths.some((p) => path === p || path.startsWith(`${p}/`))

    if (!isPublic) {
      throw redirect(302, '/login')
    }
  }

  // 4. Autorisatie op basis van rol.
  if (event.locals.user) {
    const role = event.locals.user.role.toLowerCase()

    // Alleen super_admin en admin mogen naar /admin.
    if (path.startsWith('/admin') && role !== 'super_admin' && role !== 'admin') {
      throw redirect(302, '/')
    }

    // Guest mag alleen naar /research.
    if (role === 'guest') {
      const guestAllowed = ['/research', '/login', '/logout', '/']

      const isAllowed = guestAllowed.some((allowedPath) =>
        allowedPath === '/'
          ? path === '/'
          : path === allowedPath || path.startsWith(`${allowedPath}/`)
      )

      if (!isAllowed) {
        throw redirect(302, '/research')
      }
    }
  }

  return resolve(event)
}