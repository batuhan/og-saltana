import { useSession } from 'next-auth/client'
import { QueryClient, useQuery, useMutation } from 'react-query'
import { useApiInstance, sharedInstance } from './useApi'

const sharedQueryClient = new QueryClient()

export function getSharedQueryClient() {
  return sharedQueryClient
}

export function useApi(resourceType, method, data, opts = {}) {
  const instance = opts.apiInstance || sharedInstance
  return useQuery(
    [resourceType, method, data],
    () => instance[resourceType][method](data),
    {
      ...opts,
    }
  )
}

export function useAuthenticatedApi(resourceType, method, data, opts = {}) {
  const { instance, ready } = useApiInstance()
  return useApi(resourceType, method, data, {
    apiInstance: instance,
    enabled: ready,
    ...opts,
  })
}

export function useApiMutation(resourceType, method, opts) {
  const { instance } = useApiInstance()
  return useMutation((data) => instance[resourceType][method](data), opts)
}

export async function prefetchQuery(
  resourceType,
  method,
  data,
  queryClient = getSharedQueryClient()
) {
  await queryClient.prefetchQuery([resourceType, method, data], () =>
    sharedInstance[resourceType][method](data)
  )
}

// Organizations/Users/Creators
export function useUser(username) {
  return useApi('users', 'read', username)
}

// Asset Types

export function useAssetTypes({ nbResultsPerPage = 100 }) {
  return useApi('assetTypes', 'list', {
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

// Authenticated
export function useCurrentUser() {
  const [session] = useSession()
  const _api = useAuthenticatedApi(
    'users',
    'read',
    session ? session.user.id : null,
    {
      enabled: !!session,
    }
  )
  const is = (usernameOrUserId) => {
    console.log({ usernameOrUserId, session, data: _api.data })
    if (!session) {
      return false
    }

    if (usernameOrUserId === session.user.id) {
      return true
    }
    const data = _api.data || {}

    if (usernameOrUserId === data.username) {
      return true
    }

    return false
  }
  return { ..._api, data: _api.data || {}, is, session }
}
