export async function load({ url }) {
  // Dit leest de url af op de filter waarde is de filterwaarde voor theme of status niet ingevuld dan pakt het alle
  const status = url.searchParams.get('status') || 'all'
  const theme = url.searchParams.get('theme') || 'all'

  console.log(status)

  const gradingsResponse = await fetch('https://fdnd-agency.directus.app/items/footguard_articles')
  const gradingsData = await gradingsResponse.json()
  console.log(gradingsData)

  let cardData = gradingsData.data

  // de status filteren op betreffende waarde uit de url
  if (status === 'Not started') {
    cardData = cardData.filter((cardData) => cardData.status === 'Not started')
  } else if (status === 'Finished') {
    cardData = cardData.filter((cardData) => cardData.status === 'Finished')
  } else if (status === 'In progress') {
    cardData = cardData.filter((cardData) => cardData.status === 'In progress')
  }

  // De theme filteren op betreffende waarde uit de url
  if (theme === 'Temperature') {
    cardData = cardData.filter((cardData) => cardData.theme === 'Temperature')
  } else if (theme === 'Ulcers') {
    cardData = cardData.filter((cardData) => cardData.theme === 'Ulcers')
  } else if (theme === 'High risk') {
    cardData = cardData.filter((cardData) => cardData.theme.trim() === 'High risk')
  } else if (theme === 'Age') {
    cardData = cardData.filter((cardData) => cardData.theme === 'Age')
  }

  // return {gradings: gradingsData.data}

  return { cardData, status, theme }
}
