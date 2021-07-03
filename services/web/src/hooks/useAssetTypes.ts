// Asset Types

import useApi from './useApi'

export default function useAssetTypes({ nbResultsPerPage = 100 }) {
  return useApi('assetTypes', 'list', {
    nbResultsPerPage,
  })
}
