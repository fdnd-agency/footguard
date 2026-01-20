const BASE_URL = 'https://fdnd-agency.directus.app';

export async function load({ fetch }) {
    try {
        // Fetch users
        const usersRes = await fetch(`${BASE_URL}/items/footguard_users`);
        const usersData = await usersRes.json();
        const users = usersData.data || [];

        // Huidige user (eerste user, later via login)
        const currentUser = users[0] || { name: 'Guest', id: null };

        if (!currentUser.id) {
            return {
                articles: [],
                currentUser,
                allUsers: users
            };
        }

        // Fetch articles van deze user
        const articlesRes = await fetch(
            `${BASE_URL}/items/footguard_articles?fields=*,assigned_to.*,assessor_2.*&filter[assigned_to][_eq]=${currentUser.id}`
        );
        const articlesData = await articlesRes.json();
        const articles = articlesData.data || [];

        return {
            articles,
            currentUser,
            allUsers: users
        };

    } catch (error) {
        console.error('Load error:', error.message);
        return {
            articles: [],
            currentUser: { name: 'Guest', id: null },
            allUsers: []
        };
    }
}