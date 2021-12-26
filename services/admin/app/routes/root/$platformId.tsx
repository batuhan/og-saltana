import { LoaderFunction, useLoaderData } from 'remix'
import Layout from '~/components/Layout'
import PlatformsView from '~/components/PlatformsView'
import { getApiFromRequest, getPlatformData } from '~/utils/rootapi.server'

type LoaderData = {
  platformData: {}
}

export const loader: LoaderFunction = async ({ request, params }) => {
  try {
    const api = await getApiFromRequest(request)

    const platformData: {} = await getPlatformData(api, params.platformId as string)

    const data: LoaderData = {
      platformData
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

      <PlatformView platformData={data.platformData} />
    </Layout>
  )
}
