import { useSession } from 'next-auth/client'
import React from 'react'
import { QueryClient, useQuery } from 'react-query'
import api from './instance'
const sharedQueryClient = new QueryClient()

function getApi(resourceType, method, data) {
  return {
    key: [resourceType, method, data],
    call: () => api[resourceType][method](data),
  }
}

export function useApi(resourceType, method, data, opts = {}) {
  const { key, call } = getApi(resourceType, method, data)
  const [session, loading] = useSession()
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    loading ? loading : api.auth.info().isAuthenticated
  )

  //@TODO: This should be done in a parent provider but I'm too tired
  React.useEffect(() => {
    if (session && !api.auth.info().isAuthenticated) {
      const coreSession = api.auth.setTokens({
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
        tokenType: 'Bearer',
        userId: session.user.id,
      })
      setIsAuthenticated(coreSession.isAuthenticated)
    }
  }, [session])

  return useQuery(key, call, {
    enabled: opts.waitForAuthentication ? isAuthenticated : true,
    ...opts,
  })
}

export function useAuthenticatedApi(resourceType, method, data) {
  return useApi(resourceType, method, data, true)
}

export async function prefetchQuery(
  resourceType,
  method,
  data,
  queryClient = new QueryClient()
) {
  const { key, call } = getApi(resourceType, method, data)
  await queryClient.prefetchQuery(key, call)
  return queryClient
}

export function prefetchSharedQuery(resourceType, method, data) {
  return prefetchQuery(resourceType, method, data, sharedQueryClient)
}

export function getSharedQueryClient() {
  return sharedQueryClient
}

// Organizations/Users/Creators
export function useUser(userId) {
  return useApi('users', 'read', userId)
}

export function prefetchUser(userId) {
  return prefetchSharedQuery('users', 'read', userId)
}

// Asset Types

export function useAssetTypes({ nbResultsPerPage = 100 }) {
  return useApi('assets', 'list', {
    nbResultsPerPage,
  })
}

export function prefetchAssetTypes({  nbResultsPerPage = 100 }) {
  return prefetchSharedQuery('assetTypes', 'list', {
    nbResultsPerPage,
  })
}


// Assets
export function useAssets({ ownerId, nbResultsPerPage = 100 }) {
  return useApi('assets', 'list', {
    ownerId,
    nbResultsPerPage,
  })
}

export function prefetchAssets({ ownerId, nbResultsPerPage = 100 }) {
  return prefetchSharedQuery('assets', 'list', {
    ownerId,
    nbResultsPerPage,
  })
}

export function useAsset({ assetId }, opts = undefined) {
  return useApi('assets', 'read', assetId, opts)
}

export function prefetchAsset({ assetId }) {
  return prefetchSharedQuery('assets', 'read', assetId)
}

// Authenticated
export function useCurrentUser() {
  const [session] = useSession()
  const _api = useAuthenticatedApi('users', 'read', session.user.id)
  return { ..._api, data: _api.data || {} }
}

export function useCurrentUserAssets() {
  const [session] = useSession()
  const _api = useAssets({ ownerId: session.user.id })
  return { ..._api, data: _api.data || {} }
}
