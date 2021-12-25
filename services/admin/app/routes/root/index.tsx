import { LoaderFunction, useLoaderData } from 'remix'
import Layout from '~/components/Layout'
import PlatformsView from '~/components/PlatformsView'
import { getApiFromRequest, getPlatformData } from '~/utils/rootapi.server'

type LoaderData = {
  platforms: Array<{}>
}

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const api = await getApiFromRequest(request)

    const platformIds: Array<string> = await api.get('store/platforms').json()

    const platforms: Array<any> = platformIds.map((platformId) => getPlatformData(api, platformId))

    const data: LoaderData = {
      platforms: await Promise.all(platforms),
    }

    console.log(data)
    return data
  } catch (error) {
    console.error(error)
    return error
  }
}

export default function PlatformRoute() {
  const data = useLoaderData<LoaderData>()

  return (
    <Layout>

      <PlatformsView platforms={data.platforms} />
    </Layout>
  )
}
