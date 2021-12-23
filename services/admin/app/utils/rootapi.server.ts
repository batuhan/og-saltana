import { createCookieSessionStorage, redirect } from 'remix'

import ky from 'ky'

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
  console.log({ request })
  let session = await getSession(request.headers.get('Cookie'))

  const apiUrl = session.get('api-url')
  const systemKey = session.get('system-key')

  console.log({ apiUrl, systemKey })
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
  return redirect('/login', {
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
