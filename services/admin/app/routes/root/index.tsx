import { LoaderFunction, useLoaderData } from 'remix'
import Layout from '~/components/Layout'
import PlatformsView from '~/components/PlatformsView'
import { getApiFromRequest } from '~/utils/rootapi.server'

type LoaderData = {
  platforms: Array<{}>
}

export const loader: LoaderFunction = async ({ request }) => {
  console.log('loading')
  const api = await getApiFromRequest(request)

  const response = await api.get('store/platforms')

  const platformIds = await response.json()

  // return {
  //   platforms: []
  // }
  console.log('platformIds', platformIds)
  const platforms: Array<{}> = []
  const getPlatformData = (platformId: string, env: 'test' | 'live') =>
    api
      .get('store/platforms/' + platformId + '/data/' + env)
      .then((response) => response.json())
      .then((data) => {
        const filteredData = {
          id: `${platformId}-${env}`,
          dbSchema: data?.postgresql?.schema,
          auth: data.auth,
          version: data.version,
          platformId,
          env,
        }
        return { ...filteredData }
      })

  platformIds.forEach((platformId) => {
    console.log('platformId', platformId)
    platforms.push(Promise.all([
      getPlatformData(platformId, 'test'),
      getPlatformData(platformId, 'live'),
      api.get(`store/platforms/${platformId}/check`).then((response) => response.json()),
    ]).then(([test, live, checkResult]) => {
      return {
        id: platformId,
        test,
        live,
        checkResult
      }
    }))
  })

  const data: LoaderData = {
    platforms: await Promise.all(platforms),
  }
  return data
}

export default function JokesRoute() {
  const data = useLoaderData<LoaderData>()

  return (
    <Layout>

      <PlatformsView platforms={data.platforms} />
    </Layout>
  )
}
