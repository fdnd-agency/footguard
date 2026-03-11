import { redirect, error } from '@sveltejs/kit'

export async function load({ fetch, params, locals }) {
  // Retrieve the authenticated user from locals
  const user = locals.user

  // Get the article ID from the route parameters
  const articleId = params.article_id

  // Fetch the article details from the Directus API
  const detailsResponse = await fetch(
    'https://fdnd-agency.directus.app/items/footguard_articles/' + articleId
  )
  const detailsData = await detailsResponse.json()

  let detailsInfo = detailsData.data

  // Toegangscheck op basis van rol
  if (!detailsInfo) throw error(404, 'Article not found')

  // Access control based on user role:
  // Assessors can only access articles assigned to their email
  if (user.role === 'assessor' && detailsInfo.assigned_to !== user.email) {
    throw redirect(302, '/research')
  }

  // Admins can only access articles within their own workgroup
  if (user.role === 'admin' && detailsInfo.workgroup !== user.workgroup) {
    throw redirect(302, '/research')
  }

  const questionResponse = await fetch(
    'https://fdnd-agency.directus.app/items/footguard_checklists'
  )
  const questionData = await questionResponse.json()

  // Extract checklist data from the response
  let questionInfo = questionData.data

  // Return the fetched data so it can be used in the page
  return { questionInfo, detailsInfo }
}
