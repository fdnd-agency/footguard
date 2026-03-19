export async function load({ fetch, locals }) {
  const sessionUser = locals.user

  // Fetch users from Directus filtered by the logged-in user's email.
  const usersResponse = await fetch(
    'https://fdnd-agency.directus.app/items/footguard_users?' +
      `filter[email][_icontains]=${encodeURIComponent(sessionUser.email)}&limit=1`
  )

  if (!usersResponse.ok) {
    return { user: sessionUser }
  }

  // Parse the Directus response; the users array lives in the .data property.
  const usersResult = await usersResponse.json()
  const [user] = usersResult?.data ?? []

  return { user: user ?? sessionUser }
}
