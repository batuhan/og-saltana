import { useSession } from 'next-auth/client'
import React from 'react'
import { useQuery } from 'react-query'
import api from './instance'

export function useApi(resourceType, method, data, opts = {}) {
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

  return useQuery(
    [`${resourceType}-${method}`, data],
    () => api[resourceType][method](data),
    {
      enabled: opts.waitForAuthentication ? isAuthenticated : true,
      ...opts,
    }
  )
}

export function useAuthenticatedApi(resourceType, method, data) {
  return useApi(resourceType, method, data, true)
}

export function useUser(userId) {
  return useApi('users', 'read', userId)
}

export function useCurrentUser() {
  const [session] = useSession()
  const _api = useAuthenticatedApi('users', 'read', session.user.id)
  return { ..._api, data: _api.data || {} }
}

export function useAssets({ ownerId, nbResultsPerPage = 100 }) {
  return useApi('assets', 'list', {
    ownerId,
    nbResultsPerPage: nbResultsPerPage,
  })
}

export function useCurrentUserAssets() {
  const [session] = useSession()
  const _api = useAssets({ ownerId: session.user.id })
  return { ..._api, data: _api.data || {} }
}
