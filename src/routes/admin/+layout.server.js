/** @author:Razan Sagheer **/
import { redirect } from '@sveltejs/kit'

export function load({ locals }) {
  // Retrieve the authenticated user from locals
  const user = locals.user

  // If there is no logged-in user, redirect to the login page
  if (!user) throw redirect(302, '/login')

  // Check if the user has the required role (admin or super_admin)
  // If not, redirect them to the homepage
  if (user.role !== 'super_admin' && user.role !== 'admin') {
    throw redirect(302, '/')
  }
  // Return the user object so it can be used in the page
  return { user }
}
