export async function load({ fetch }) {
  const userDetailsResponse = await fetch('https://fdnd-agency.directus.app/items/footguard_users/')
  const userDetailsData = await userDetailsResponse.json()
  let userInfo = userDetailsData.data
  return { userInfo }
}
