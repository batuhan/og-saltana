import useApi from './useApi'
import useCurrentUser from './useCurrentUser'

// Assets
export default function useAssets(data = {}, params = {}) {
  return useApi(
    'assets',
    'list',
    {
      nbResultsPerPage: 100,
      ...data,
    },
    params,
  )
}

// My Assets
export function useMyAssets(queryData = {}, params = {}) {
  const { user } = useCurrentUser()

  return useAssets(
    { ownerId: user?.id },
    {
      enabled: user && user.id ? true : false,
      ...params,
    },
  )
}
