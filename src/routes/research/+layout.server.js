import { redirect } from '@sveltejs/kit'

export function load({ locals }) {
  // Retrieve the authenticated user from the request locals
  const user = locals.user

  // If no user is logged in, redirect to the login page
  if (!user) throw redirect(302, '/login')

  // All authenticated users are allowed to access the research section.
  // More specific permission checks or data filtering are handled
  // inside the individual pages of this section.
  return { user }
}
