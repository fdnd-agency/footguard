export async function load({ params }) {
//   const articleId = params.article_id;

  const detailsResponse = await fetch('https://fdnd-agency.directus.app/items/footguard_articles/');
  const detailsData = await detailsResponse.json();
  console.log(detailsData)

  let detailsInfo = detailsData.data


  const questionResponse = await fetch('https://fdnd-agency.directus.app/items/footguard_checklists');
  const questionData = await questionResponse.json();
  console.log(questionData)

  let questionInfo = questionData.data

  return { questionInfo, detailsInfo };

}
