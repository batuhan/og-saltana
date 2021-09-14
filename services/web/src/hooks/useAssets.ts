import useApi from './useApi'
import useCurrentUser from './useCurrentUser'

// Assets
export default function useAssets(
  { ownerId, nbResultsPerPage = 100 },
  params = {},
) {
  return useApi(
    'assets',
    'list',
    {
      ownerId,
      nbResultsPerPage,
    },
    params,
  )
}

// My Assets
export function useMyAssets({ nbResultsPerPage = 100, ...data }, params = {}) {
  const {
    isLoggedIn,
    data: { id },
  } = useCurrentUser()
  return useAssets(
    { ownerId: id, nbResultsPerPage, ...data },
    { enabled: isLoggedIn && id, ...params },
  )
}
