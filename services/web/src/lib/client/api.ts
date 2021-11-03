import { getSession, signOut, signIn } from 'next-auth/client'
import { QueryClient } from 'react-query'
import { createInstance } from '@saltana/sdk'
import { Magic } from 'magic-sdk'

export const magic =
  typeof window === 'undefined'
    ? undefined
    : new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY)

export async function login(
  email,
  { redirect = true, callbackUrl = '/dashboard' },
) {
  const token = await magic.auth.loginWithMagicLink({
    email,
  })
  await signIn('credentials', { callbackUrl, redirect, token })
}

export const sharedSaltanaConfig = {
  apiKey: process.env.NEXT_PUBLIC_SALTANA_CORE_PUBLISHABLE_KEY,
  apiHost: process.env.NEXT_PUBLIC_CORE_API_HOST,
}

export const sharedSaltanaInstance = createInstance({
  ...sharedSaltanaConfig,
})

export async function getSaltanaInstance(_session = undefined) {
  const session = _session || (await getSession())
  return getSaltanaInstanceSync(session)
}

export function getSaltanaInstanceSync(session = undefined) {
  if (!session) {
    return sharedSaltanaInstance
  }

  const newInstance = createInstance({
    ...sharedSaltanaConfig,
  })

  newInstance.auth.setTokens({
    accessToken: session.coreAccessToken,
    refreshToken: session.refreshToken,
    tokenType: 'Bearer',
    userId: session.user.id,
  })

  newInstance.onError('userSessionExpired', function () {
    signOut()
  })

  return newInstance
}

const defaultQueryFn =
  (session = undefined) =>
  ({ queryKey }) => {
    const [resourceType, method, data] = queryKey

    const saltanaInstance =
      session && session.saltanaInstance
        ? session.saltanaInstance
        : getSaltanaInstanceSync(session)

    return saltanaInstance[resourceType][method](data)
  }

export const getQueryClientSettings = (session = undefined) => ({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn(session),
    },
  },
})

export const createQueryClient = (session = undefined) =>
  new QueryClient(getQueryClientSettings(session))

export const sharedQueryClient = createQueryClient()

export const setUserData = (queryClient, user) => {
  queryClient.setQueryData(['users', 'read', user.id], user)
  if (user.username) {
    queryClient.setQueryData(['users', 'read', user.username], user)
  }
}

export const setCreatorLinkData = (queryClient, link) => {
  queryClient.setQueryData(
    ['links', 'read', `${link.ownerId}:${link.slug}`],
    link,
  )
  queryClient.setQueryData(['links', 'read', link.id], link)
}
