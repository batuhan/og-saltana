import { useSession } from 'next-auth/client'
import { QueryClient, useQuery, useMutation } from 'react-query'
import { useApiInstance, _getMethod, sharedInstance } from './useApi'
const sharedQueryClient = new QueryClient()

export function useApi(resourceType, method, data, opts = {}) {
  const { getMethod, ready } = useApiInstance()
  const { key, call } = getMethod(resourceType, method, data)

  return useQuery(key, call, {
    enabled: ready,
    ...opts,
  })
}

export function useApiMutation(resourceType, method, data, opts = {}) {
  const { getMethod } = useApiInstance()
  const { call } = getMethod(resourceType, method, data)

  return useMutation(call)
}

export function useAuthenticatedApi(resourceType, method, data) {
  return useApi(resourceType, method, data, {})
}

export async function prefetchQuery(
  resourceType,
  method,
  data,
  queryClient = sharedQueryClient
) {
  const { key, call } = _getMethod(sharedInstance)(resourceType, method, data)
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
export function useUser(username) {
  return useApi('users', 'read', username)
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

export function prefetchAssetTypes({ nbResultsPerPage = 100 }) {
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
