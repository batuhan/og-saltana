import type { KyInstance } from 'ky'

export const getPlatformDataForEnv = (
  api: KyInstance,
  platformId: string,
  env: 'test' | 'live'
) =>
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

export async function getPlatformData(api: KyInstance, platformId: string) {
  const [test, live, checkResult] = await Promise.all([
    getPlatformDataForEnv(api, platformId, 'test'),
    getPlatformDataForEnv(api, platformId, 'live'),
    api
      .get(`store/platforms/${platformId}/check`)
      .then((response) => response.json()),
  ])

  return {
    id: platformId,
    test,
    live,
    checkResult,
  }
}

export type PlatformAction =
  | 'platform-create'
  | 'platform-init'
  | 'platform-remove'
  | 'platform-generate-keys'
  | 'cache-delete'
  | 'cache-sync'
  | 'elasticsearch-sync'
  | 'elasticsearch-drop'
  | 'elasticsearch-init'
  | 'db-drop'
  | 'db-migrate'

export async function handlePlatformAction(
  api: KyInstance,
  platformId: string,
  action: PlatformAction
) {
  let response
  switch (action) {
    case 'platform-create':
      response = api.post('store/platforms', {
        json: { platformId },
      })
      break
    case 'platform-init':
      response = api.delete('store/platforms/' + platformId + '/init')
      break
    case 'platform-remove':
      response = api.delete('store/platforms/' + platformId)
      break
    case 'cache-delete':
      response = api.delete('store/platforms/' + platformId + '/cache')
      break
    case 'cache-sync':
      response = api.post('store/platforms/' + platformId + '/cache/sync')
      break
    case 'elasticsearch-init':
      response = api.post(
        'store/platforms/' + platformId + '/elasticsearch/init'
      )
      break
    case 'elasticsearch-drop':
      response = api.post(
        'store/platforms/' + platformId + '/elasticsearch/drop'
      )
      break
    case 'elasticsearch-sync':
      response = api.post(
        'store/platforms/' + platformId + '/elasticsearch/sync'
      )
      break
    case 'platform-generate-keys':
      response = api.post('store/platforms/' + platformId + '/generate-keys')
      break
    default:
      break
  }

  return response.json()
}
