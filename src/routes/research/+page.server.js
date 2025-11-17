


export async function load ({ url }) {
    const gradingsResponse = await fetch('https://68ee3b05df2025af7802de69.mockapi.io/assigned/articles/Gradings');
    const gradingsData = await gradingsResponse.json();
    console.log(gradingsData)

    let gradings = gradingsData.data

    return {gradings: gradingsData}


}


