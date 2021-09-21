import { useRouter } from 'next/router'
import useApi from './useApi'
import _ from 'lodash'

function isEnabled(...conditions) {
  return conditions.every((condition) => condition === true)
}

function isNotEmpty(...params) {
  return _.isEmpty(...params) === false
}

export default function useCreatorSpace() {
  const { query } = useRouter()

  // Fetch the creator
  const isCreatorQueryEnabled = isEnabled(isNotEmpty(query.creator))

  const creator = useApi('users', 'read', query.creator, {
    enabled: isCreatorQueryEnabled,
  })

  // Fetch the link if we are in a link page
  const isLinkPage = _.isEmpty(query.link) === false
  const linkId = `${creator.data.id}:${query.link}`
  const isLinkQueryEnabled = isEnabled(
    isLinkPage,
    isNotEmpty(query.link),
    isNotEmpty(creator.data.id),
  )

  const link = useApi('links', 'read', linkId, {
    enabled: isLinkQueryEnabled,
    initialData: { id: linkId },
  })

  // Fetch the asset if we are in an asset page
  const isAssetPage = _.isEmpty(query.asset) === false
  const assetId = query.asset
  const isAssetQueryEnabled = isEnabled(isAssetPage, isNotEmpty(query.asset))
  const asset = useApi('assets', 'read', assetId, {
    enabled: isAssetQueryEnabled,
    initialData: { id: assetId },
  })

  // Fetch the order if we are in an order page
  const isOrderPage = _.isEmpty(query.order) === false
  const orderId = query.order
  const isOrderQueryEnabled = isEnabled(isOrderPage, isNotEmpty(query.order))
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
