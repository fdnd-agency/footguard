
// https://fdnd-agency.directus.app/items/footguard_articles

// https://68ee3b05df2025af7802de69.mockapi.io/assigned/articles/Gradings

// export async function load ({ url }) {

//     const gradingsResponse = await fetch('https://fdnd-agency.directus.app/items/footguard_articles');
//     const gradingsData = await gradingsResponse.json();
//     console.log(gradingsData)


//   

//   return {gradings: gradingsData.data}


// }


export async function load ({ url }) {
  // Dit leest de url af op de filter waarde is de filterwaarde geen morning, evening of is het null, dan pakt hij alle

    const status = url.searchParams.get('status') || 'all';
    const theme = url.searchParams.get('theme') || 'all';

  console.log(status)


    const gradingsResponse = await fetch('https://fdnd-agency.directus.app/items/footguard_articles');
    const gradingsData = await gradingsResponse.json();
    console.log(gradingsData)

    let cardData = gradingsData.data


    
    if (status === 'Not started') {
        cardData = cardData.filter(cardData => cardData.status === "Not started");
    } else if (status === 'Finished') {
        cardData = cardData.filter(cardData => cardData.status === "Finished");
    } else if (status === 'In progress') {
        cardData = cardData.filter(cardData => cardData.status === "In progress");
    } 

if (theme === 'Temperature') {
        cardData = cardData.filter(cardData => cardData.theme === "Temperature");
    } else if (theme === 'Ulcers') {
        cardData = cardData.filter(cardData => cardData.theme === "Ulcers");
    } else if (theme === 'High risk ') {
        cardData = cardData.filter(cardData => cardData.theme === "High risk ");
    } else if  (theme === 'Age') {
        cardData = cardData.filter(cardData => cardData.theme === "Age");
    }


    // return {gradings: gradingsData.data}

    return {cardData, status, theme}




}














