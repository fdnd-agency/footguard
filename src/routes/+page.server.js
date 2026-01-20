// Server-side data loading voor dashboard

const BASE_URL = "https://fdnd-agency.directus.app";

export async function load({ fetch }) {
    try {
        // Haal alle users op
        const usersRes = await fetch(`${BASE_URL}/items/footguard_users`);
        const usersData = await usersRes.json();
        const users = usersData.data || [];

        // Eerste user = ingelogde user (is nog geen login systeem)
        const currentUser = users[0] || { name: "Guest", id: null };

        // Haal articles op die bij de user horen
        const articlesRes = await fetch(
            `${BASE_URL}/items/footguard_articles?fields=*,assigned_to.*,assessor_2.*&filter[assigned_to][_eq]=${currentUser.id}`
        );
        const articlesData = await articlesRes.json();
        const articles = articlesData.data || [];

        // Return data naar +page.svelte
        return {
            articles,
            currentUser,
            allUsers: users
        };
    } catch (error) {
        // Fallback bij fout
        return {
            articles: [],
            currentUser: { name: "Guest", id: null },
            allUsers: []
        };
    }
}
