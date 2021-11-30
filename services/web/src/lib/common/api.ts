import { verifyToken } from '@clerk/nextjs/edge'
import { createInstance } from '@saltana/sdk'
import _ from 'lodash'

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
export async function getSaltanaInstanceFromContext({ req }) {
  const token = parseTokenFromReq(req)
  if (!token) {
    return sharedSaltanaInstance
  }

  const instance = getSaltanaInstanceFor('clerk', token)
  // try {
  //   await instance.auth.loginWithClerk() //@TODO: should not be here EVER
  // } catch (err) {
  //   console.log('Error when verifying token from Clerk', err)
  //   throw err
  // }

  return instance
}

export function getSaltanaInstanceFor(provider, token) {
  if (!provider) {
    throw new Error('provider is required')
  }
  if (!token) {
    throw new Error('token is required')
  }

  const instance = createInstance({
    ...sharedSaltanaConfig,
  })

  instance.getTokenStore().setTokens({ token, provider })

  return instance
}
