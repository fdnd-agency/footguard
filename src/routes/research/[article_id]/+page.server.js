export async function load({ fetch, params }) {
  const articleId = params.article_id
  
  const detailsResponse = await fetch(
    'https://fdnd-agency.directus.app/items/footguard_articles/' + articleId
  )
  const detailsData = await detailsResponse.json()

  let detailsInfo = detailsData.data

  const questionResponse = await fetch(
    'https://fdnd-agency.directus.app/items/footguard_checklists'
  )
  const questionData = await questionResponse.json()

  let questionInfo = questionData.data

  return { questionInfo, detailsInfo }
}
