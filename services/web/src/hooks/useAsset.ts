import _ from 'lodash'
import useApi from './useApi'

// Asset
export default function useAsset(assetId: string) {
  return useApi('assets', 'read', assetId, {
    enabled: _.isEmpty(assetId) === false,
  })
}
