import { useRouter } from 'next/router'
import useApi from './useApi'
import _ from 'lodash'

function isEnabled(...conditions) {
  return conditions.every((condition) => condition === true)
}

function isNotEmpty(...params) {
  return _.isEmpty(...params) === false
}

interface UseCreatorSpaceOptions {
  creatorId: string
  linkId?: string
  assetId?: string
  orderId?: string
}

export function useCreatorSpace({
  creatorId,
  linkId,
  assetId,
  orderId,
}: UseCreatorSpaceOptions) {
  // Fetch the creator
  const isCreatorQueryEnabled = isEnabled(isNotEmpty(creatorId))

  const creator = useApi('users', 'read', creatorId, {
    enabled: isCreatorQueryEnabled,
  })

  // Fetch the link if we are in a link page
  const isLinkPage = _.isEmpty(linkId) === false
  const _linkId = `${creator.data.id}:${linkId}`
  const isLinkQueryEnabled = isEnabled(
    isLinkPage,
    isNotEmpty(linkId),
    isNotEmpty(_linkId),
    isNotEmpty(creator.data.id),
  )

  const link = useApi('links', 'read', _linkId, {
    enabled: isLinkQueryEnabled,
    initialData: { id: linkId, assetIds: [] },
  })

  // Fetch the asset if we are in an asset page
  const isAssetPage = _.isEmpty(assetId) === false
  const isAssetQueryEnabled = isAssetPage
  const asset = useApi('assets', 'read', assetId, {
    enabled: isAssetQueryEnabled,
    initialData: { id: assetId },
  })

  // Fetch the order if we are in an order page
  const isOrderPage = _.isEmpty(orderId) === false
  const isOrderQueryEnabled = isEnabled(isOrderPage, isNotEmpty(orderId))
  const order = useApi('orders', 'read', orderId, {
    enabled: isOrderQueryEnabled,
    initialData: { id: orderId },
  })

  const isLoading =
    creator.isLoading ||
    (isLinkQueryEnabled ? link.isLoading : false) ||
    (isAssetQueryEnabled ? asset.isLoading : false) ||
    (isOrderQueryEnabled ? order.isLoading : false)

  return {
    link,
    creator,
    asset,
    order,
    isLoading,
    isLinkPage,
    isAssetPage,
    isOrderPage,
  }
}

export default function useCreatorSpaceWithRouter() {
  const { query } = useRouter()

  const creatorId =
    typeof query.creator === 'string' ? query.creator : undefined
  const linkId = typeof query.link === 'string' ? query.link : undefined
  const assetId = typeof query.asset === 'string' ? query.asset : undefined
  const orderId = typeof query.order === 'string' ? query.order : undefined

  return useCreatorSpace({ creatorId, linkId, assetId, orderId })
}
