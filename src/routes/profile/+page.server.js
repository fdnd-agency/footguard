import { env } from '$env/dynamic/public'

const DIRECTUS_URL = env.PUBLIC_DIRECTUS_URL || 'https://fdnd-agency.directus.app'

export async function load({ fetch, locals }) {
  const sessionUser = locals.user

  // Fetch user from Directus by exact email match.
  const usersResponse = await fetch(
    `${DIRECTUS_URL}/items/footguard_users?` +
      `filter[email][_eq]=${encodeURIComponent(sessionUser.email)}&limit=1`
  )

  if (!usersResponse.ok) {
    return { user: sessionUser }
  }

  // Parse the Directus response; the users array lives in the .data property.
  const usersResult = await usersResponse.json()
  const [user] = usersResult?.data ?? []

  return { user: user ?? sessionUser }
}
