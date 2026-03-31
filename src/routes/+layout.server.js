import { redirect } from '@sveltejs/kit'

export function load({ locals, url }) {
  const user = locals.user ?? null
  const path = url.pathname
  const role = user?.role?.toLowerCase() ?? null

  // Guest mag alleen /research
  if (role === 'guest') {
    const guestAllowed = ['/research', '/login', '/logout']
    if (!guestAllowed.some((p) => path.startsWith(p))) {
      throw redirect(302, '/research')
    }
  }

  return { user }
}
