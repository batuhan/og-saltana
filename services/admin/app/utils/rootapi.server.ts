import { createCookieSessionStorage, redirect } from 'remix'

import ky from 'ky'
import type { KyInstance } from 'ky'

let sessionSecret = 'dfgdfgd'
// let sessionSecret = process.env.SESSION_SECRET || 'dfgdfgd'
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set')
}

let { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: 'RJ_session',
    secure: false,
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
})

export async function getApiInstance(apiUrl: string, systemKey: string) {
  if (!apiUrl || typeof apiUrl !== 'string') {
    throw new Error('ApiUrl must be set')
  }

  if (!systemKey || typeof systemKey !== 'string') {
    throw new Error('System Key must be set')
  }

  return ky.create({
    prefixUrl: apiUrl,
    headers: {
      'X-Saltana-System-Key': systemKey,
    },
  })
}

export async function getApiFromRequest(request: Request) {
  let session = await getSession(request.headers.get('Cookie'))

  const apiUrl = session.get('api-url')
  const systemKey = session.get('system-key')

  try {
    const _apiInstance = await getApiInstance(apiUrl, systemKey)
    return _apiInstance
  } catch {
    throw logout(request)
  }
}

// export async function getUser(request: Request) {
//   let userId = await getUserId(request)
//   if (typeof userId !== 'string') return null

//   try {
//     let user = await db.user.findUnique({ where: { id: userId } })
//     return user
//   } catch {
//     throw logout(request)
//   }
// }

export async function logout(request: Request) {
  let session = await getSession(request.headers.get('Cookie'))
  return redirect('/root/login', {
    headers: { 'Set-Cookie': await destroySession(session) },
  })
}

export async function createRootSession(
  apiUrl: string,
  systemKey: string,
  redirectTo: string
) {
  let session = await getSession()
  session.set('api-url', apiUrl)
  session.set('system-key', systemKey)

  return redirect(redirectTo, {
    headers: { 'Set-Cookie': await commitSession(session) },
  })
}

const getPlatformDataForEnv = (
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

type PlatformAction =
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
      response = await api
        .post('store/platforms', {
          json: { platformId },
        })
        .json()
      break
    case 'platform-init':
      response = await api
        .delete('store/platforms/' + platformId + '/init')
        .json()
      break
    case 'platform-remove':
      response = await api.delete('store/platforms/' + platformId).json()
      break
    case 'cache-delete':
      response = await api
        .delete('store/platforms/' + platformId + '/cache')
        .json()
      break
    case 'cache-sync':
      response = await api.post('store/platforms/' + platformId + '/cache/sync')
      break
    case 'elasticsearch-init':
      response = await api
        .post('store/platforms/' + platformId + '/elasticsearch/init')
        .json()
      break
    case 'elasticsearch-drop':
      response = await api
        .post('store/platforms/' + platformId + '/elasticsearch/drop')
        .json()
      break
    case 'elasticsearch-sync':
      response = await api
        .post('store/platforms/' + platformId + '/elasticsearch/sync')
        .json()
      break
    case 'platform-generate-keys':
      response = await api
        .post('store/platforms/' + platformId + '/generate-keys')
        .json()
      break
    default:
      break
  }

  return response
}
