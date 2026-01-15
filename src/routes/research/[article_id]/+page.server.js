export async function load({ params }) {
  const articleId = params.article_id;

  const detailsResponse = await fetch('https://fdnd-agency.directus.app/items/footguard_articles/' + articleId);
  const detailsData = await detailsResponse.json();
  console.log(detailsData)

  let detailsInfo = detailsData.data

  return { detailsInfo };

}