// src/routes/+page.server.js
import { redirect } from '@sveltejs/kit'

const BASE_URL = 'https://fdnd-agency.directus.app'

export async function load({ fetch, locals }) {
  // Niet ingelogd -> naar login pagina
  if (!locals.user) {
    throw redirect(302, '/login')
  }

  const currentUserId = locals.user.id
  try {
    const usersRes = await fetch(
      `${BASE_URL}/items/footguard_users?filter[id][_eq]=${encodeURIComponent(currentUserId)}&limit=1`
    )
    const usersData = await usersRes.json()

    const users = usersData.data || []

    const currentUser = users[0] || { name: 'Guest', id: null }

    if (!currentUser.id) {
      return {
        articles: [],
        currentUser,
        allUsers: users
      }
    }

    const articlesRes = await fetch(
      `${BASE_URL}/items/footguard_articles?fields=*,assigned_to.*,assessor_2.*&filter[assigned_to][_eq]=${currentUser.id}`
    )
    const articlesData = await articlesRes.json()
    const articles = articlesData.data || []

    return {
      articles,
      currentUser,
      allUsers: users
    }
  } catch {
    return {
      articles: [],
      currentUser: { name: 'Guest', id: null },
      allUsers: []
    }
  }
}
