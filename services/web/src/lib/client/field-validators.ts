import { getSaltanaInstance } from './api'

export async function isLinkSlugUnique(slug: string) {
  const saltana = await getSaltanaInstance()
  const slugAvailabilityResponse = await saltana.links.checkAvailability({
    slug,
  })
  return slugAvailabilityResponse
}
