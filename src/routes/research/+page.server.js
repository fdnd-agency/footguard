
// https://fdnd-agency.directus.app/items/footguard_articles

// https://68ee3b05df2025af7802de69.mockapi.io/assigned/articles/Gradings

export async function load ({ url }) {
  // Dit leest de url af op de filter waarde is de filterwaarde geen morning, evening of is het null, dan pakt hij alle

    const filter = url.searchParams.get('theme') || 'all';
  console.log(filter)



    const gradingsResponse = await fetch('https://fdnd-agency.directus.app/items/footguard_articles');
    const gradingsData = await gradingsResponse.json();
    console.log(gradingsData)

    let cardData = gradingsData.data


    
    if (filter === 'Temperature') {
        cardData = cardData.filter(cardData => cardData.theme === "Temperature");
    } else if (filter === 'Ucles') {
        cardData = cardData.filter(cardData => cardData.theme === "Ucles");
    } else if (filter === 'High-risk') {
        cardData = cardData.filter(cardData => cardData.theme === "High-risk");
    } else if  (filter === 'Age') {
        cardData = cardData.filter(cardData => cardData.theme === "Age");
    }

    // return {gradings: gradingsData.data}

    return {cardData, filter}


}









