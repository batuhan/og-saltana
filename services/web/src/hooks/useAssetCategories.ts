// Asset Categories

import useApi from './useApi'

export default function useAssetCategories({ nbResultsPerPage = 100 }) {
  return useApi('categories', 'list', {
    nbResultsPerPage,
  })
}
