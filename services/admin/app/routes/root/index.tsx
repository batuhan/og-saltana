import { LoaderFunction, useLoaderData } from 'remix'
import Layout from '~/components/Layout'
import PlatformsView from '~/components/PlatformsView'
import { getApiFromRequest, getPlatformData } from '~/utils/rootapi.server'

type LoaderData = {
  platforms: Array<{}>
}

export const loader: LoaderFunction = async ({ request }) => {
  const api = await getApiFromRequest(request)

  const response = await api.get('store/platforms')

  const platformIds: Array<string> = await response.json()
  const platforms: Array<any> = platformIds.map((platformId) => getPlatformData(api, platformId))

  const data: LoaderData = {
    platforms: await Promise.all(platforms),
  }
  return data
}

export default function PlatformRoute() {
  const data = useLoaderData<LoaderData>()

  return (
    <Layout>

      <PlatformsView platforms={data.platforms} />
    </Layout>
  )
}
