// src/routes/+page.server.js
import { redirect } from '@sveltejs/kit'

const BASE_URL = 'https://fdnd-agency.directus.app'

export async function load({ fetch, locals }) {
  if (!locals.user) {
    throw redirect(302, '/login')
  }

  const headers = {}

  const token =
    locals.accessToken ||
    locals.token ||
    locals.session?.access_token ||
    locals.session?.accessToken

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  try {
    const userId = locals.user.id
    const email = locals.user.email

    let currentUser = null

    if (email) {
      const userByEmailRes = await fetch(
        `${BASE_URL}/items/footguard_users?filter[email][_eq]=${encodeURIComponent(email)}&limit=1`,
        { headers }
      )

      const userByEmailData = await userByEmailRes.json()

      currentUser = userByEmailData.data?.[0] ?? null
    }

    if (!currentUser && userId) {
      const userByIdRes = await fetch(
        `${BASE_URL}/items/footguard_users?filter[id][_eq]=${encodeURIComponent(userId)}&limit=1`,
        { headers }
      )

      const userByIdData = await userByIdRes.json()

      currentUser = userByIdData.data?.[0] ?? null
    }

    if (!currentUser) {
      currentUser = {
        id: userId,
        name: formatNameFromEmail(email),
        email,
        role: locals.user.role ?? '',
        profession: ''
      }
    }

    let articles = []

    if (currentUser.id) {
      const articlesRes = await fetch(
        `${BASE_URL}/items/footguard_articles?fields=*,assigned_to.*,assessor_2.*&filter[assigned_to][_eq]=${encodeURIComponent(currentUser.id)}`,
        { headers }
      )

      const articlesData = await articlesRes.json()

      articles = articlesData.data ?? []
    }

    return {
      articles,
      currentUser,
      allUsers: currentUser.id ? [currentUser] : []
    }
  } catch (error) {
    console.error('Dashboard load error:', error)

    return {
      articles: [],
      currentUser: {
        id: locals.user.id,
        name: formatNameFromEmail(locals.user.email),
        email: locals.user.email ?? '',
        role: locals.user.role ?? '',
        profession: ''
      },
      allUsers: []
    }
  }
}

function formatNameFromEmail(email) {
  if (!email) return 'Guest'

  const firstPart = email.split('@')[0]
  const firstName = firstPart.split('.')[0]

  return firstName.charAt(0).toUpperCase() + firstName.slice(1)
}
