import { error } from '@sveltejs/kit'
import { env } from '$env/dynamic/public'

const DIRECTUS_URL = env.PUBLIC_DIRECTUS_URL || 'https://fdnd-agency.directus.app'

// Runs on the server before rendering this dynamic profile page.
export async function load({ fetch, params }) {
  // Grab the dynamic route param.
  const userId = params.user_id
  // Request the profile record for the requested user id from Directus.
  const userResponse = await fetch(`${DIRECTUS_URL}/items/footguard_users/${userId}`)
  const userData = await userResponse.json()
  const user = userData?.data ?? null

  // If no user was returned, show a 404 page.
  if (!user) {
    throw error(404, 'User not found')
  }

  return { user }
}
