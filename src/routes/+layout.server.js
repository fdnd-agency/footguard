import { redirect } from '@sveltejs/kit'

export function load({ locals, url }) {
  const user = locals.user ?? null
  const path = url.pathname
  const role = user?.role?.toLowerCase() ?? null

  // Guest mag alleen /grading
  if (role === 'guest') {
    const guestAllowed = ['/grading', '/login', '/logout']
    if (!guestAllowed.some((p) => path.startsWith(p))) {
      throw redirect(302, '/grading')
    }
  }

  return { user }
}
