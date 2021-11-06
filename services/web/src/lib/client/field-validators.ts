import { getSaltanaInstance } from './api'

export async function isLinkSlugUnique(slug: string) {
  const saltana = await getSaltanaInstance()
  const slugAvailabilityResponse = await saltana.links.checkAvailability({
    slug,
  })
  return slugAvailabilityResponse
}

export async function isUsernameUnique(username: string) {
  console.log('triggered username check')

  const saltana = await getSaltanaInstance()
  const usernameAvailabilityResponse = await saltana.users.checkAvailability({
    username,
  })
  return usernameAvailabilityResponse
}
