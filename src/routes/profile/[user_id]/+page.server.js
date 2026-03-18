// Use SvelteKit helpers to redirect unauthenticated users and throw HTTP errors.
import { redirect, error } from '@sveltejs/kit'

// Runs on the server before rendering this dynamic profile page.
export async function load({ fetch, params, locals }) {
  // Read the logged-in user from the request locals.
  const sessionUser = locals.user

  // Protect this page: if there is no logged-in email, send user to login.
  if (!sessionUser?.email) {
    throw redirect(302, '/login')
  }

  // Grab the dynamic route param.
  const userId = params.user_id
  // Request the profile record for the requested user id from Directus.
  const userResponse = await fetch(
    'https://fdnd-agency.directus.app/items/footguard_users/' + userId
  )
  const userData = await userResponse.json()
  const user = userData?.data ?? null

  // If no user was returned, show a 404 page.
  if (!user) {
    throw error(404, 'User not found')
  }

  return { user }
}
