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
  const { isLoggedIn, data } = useCurrentUser()

  return useAssets(
    { ...data, ownerId: data.id },
    {
      enabled: isLoggedIn && data?.id ? true : false,
      ...params,
    },
  )
}
