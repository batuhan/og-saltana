import { SessionResource } from '@clerk/types'
import { createInstance } from '@saltana/sdk'
import _ from 'lodash'
import { QueryClient } from 'react-query'
import { decode } from 'jsonwebtoken'

function getApiBase() {
  const apiBase =
    typeof window === 'undefined'
      ? process.env.SALTANA_CORE_API_BASE_INTERNAL
      : process.env.NEXT_PUBLIC_CORE_API_BASE

  if (!apiBase) {
    throw new Error('Missing API base')
  }

  const parsedURL = new URL(apiBase)

  // Use the current hostname so API calls work in external creator spaces
  const apiHost =
    typeof window === 'undefined'
      ? parsedURL.hostname
      : window.location.hostname

  const apiProtocol = (
    typeof window === 'undefined'
      ? parsedURL.protocol
      : window.location.protocol
  ).slice(0, -1)

  const apiPath = parsedURL.pathname === '/' ? '' : parsedURL.pathname
  const apiPort = parsedURL.port

  return { apiHost, apiProtocol, apiPort, apiPath }
}

export const sharedSaltanaConfig = {
  apiKey: process.env.NEXT_PUBLIC_SALTANA_CORE_PUBLISHABLE_KEY,
  ...getApiBase(),
}

export const sharedSaltanaInstance = createInstance({
  ...sharedSaltanaConfig,
})

export function parseTokenFromReq(req) {
  return req.cookies.__session // should be verified in the middleware
}

// export async function getSaltanaInstanceFromContext({ req }) {
//   const token = parseTokenFromReq(req)
//   if (!token) {
//     return sharedSaltanaInstance
//   }

//   const instance = getSaltanaInstanceFor('clerk', token)
//   // try {
//   //   await instance.auth.loginWithClerk() //@TODO: should not be here EVER
//   // } catch (err) {
//   //   console.log('Error when verifying token from Clerk', err)
//   //   throw err
//   // }

//   return instance
// }

const isTokenExpired = (exp: number): boolean =>
  new Date(exp * 1000) < new Date()

export function getSaltanaInstanceFor(provider: 'clerk', token: string) {
  if (!token) {
    return sharedSaltanaInstance
  }

  const instance = createInstance({
    ...sharedSaltanaConfig,
  })

  instance.getTokenStore().setTokens({ token, provider })

  return instance
}

class TokenStore {
  constructor({
    session,
    provider,
    activeToken,
  }: {
    session: SessionResource
    provider: 'clerk'
    activeToken: string | undefined
  }) {
    this._provider = provider
    this._session = session

    if (session?.lastActiveToken || activeToken) {
      this._token = {
        token: session.lastActiveToken.getRawString(),
        expiresAt: session.lastActiveToken.jwt.claims.exp,
      }
    } else if (activeToken) {
      const decodedToken = decode(activeToken, { json: true })
      this._token = {
        token: activeToken,
        expiresAt: decodedToken.exp,
      }
    }
  }

  _session: SessionResource | undefined
  _provider: 'clerk'
  _token: { token: string; expiresAt: number } | null

  async getTokens() {
    const { token, expiresAt } = this._token
    if (token && !isTokenExpired(expiresAt)) {
      return {
        token,
        provider: this._provider,
      }
    }

    if (this._session) {
      const newToken = await this._session.getToken()

      const decodedToken = decode(token, { json: true })
      this._token = {
        token: newToken,
        expiresAt: decodedToken.exp,
      }
      return this._token
    }

    return null
  }

  setTokens() {
    throw new Error('Not implemented (TokenStore.setTokens)')
  }

  removeTokens() {
    throw new Error('Not implemented (TokenStore.removeTokens)')
  }
}

export async function getSaltanaInstance(session) {
  if (!session) {
    return sharedSaltanaInstance
  }

  const tokenStore = new TokenStore({ session, provider: 'clerk' })
  const instance = createInstance({
    ...sharedSaltanaConfig,
    tokenStore,
  })

  return instance
}

const defaultQueryFn =
  (instance) =>
  ({ queryKey }) => {
    const [resourceType, method, data] = queryKey

    if (data === undefined) {
      // debugger
    }
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
