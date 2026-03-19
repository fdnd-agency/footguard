import { redirect } from '@sveltejs/kit'

// Redirect to login if not authenticated; applies to all /profile/* routes.
export function load({ locals }) {
  const user = locals.user
  if (!user) throw redirect(302, '/login')
  return { user }
}
