import { QueryClient } from 'react-query'
import { createInstance } from '@saltana/sdk'

export async function login(
  email,
  { redirect = true, callbackUrl = '/dashboard' },
) {
  // const token = await magic.auth.loginWithMagicLink({
  //   email,
  // })
  // await signIn('credentials', { callbackUrl, redirect, token })
}

export const sharedSaltanaConfig = {
  apiKey: process.env.NEXT_PUBLIC_SALTANA_CORE_PUBLISHABLE_KEY,
  apiHost:
    typeof window === 'undefined'
      ? process.env.NEXT_PUBLIC_CORE_API_HOST
      : window.location.hostname,
}

export const sharedSaltanaInstance = createInstance({
  ...sharedSaltanaConfig,
})

export async function getSaltanaInstance(session) {
  if (!session) {
    return sharedSaltanaInstance
  }

  const accessToken = await session.getToken()

  const tokenStore = {
    getTokens() {
      return { accessToken }
    },
    setTokens(tokens) {
      throw new Error('Not implemented')
    },
    removeTokens() {
      throw new Error('Not implemented')
    },
  }

  return createInstance({
    ...sharedSaltanaConfig,
    tokenStore,
  })
}

export function getSaltanaInstanceSync() {
  return sharedSaltanaInstance
}

const defaultQueryFn =
  (instance) =>
  ({ queryKey }) => {
    const [resourceType, method, data] = queryKey

    return instance[resourceType][method](data)
  }

export const getQueryClientSettings = (instance) => ({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn(instance),
    },
  },
})

export const createQueryClient = (instance) =>
  new QueryClient(getQueryClientSettings(instance))

export const sharedQueryClient = createQueryClient(sharedSaltanaInstance)

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
