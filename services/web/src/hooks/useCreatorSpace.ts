import { useRouter } from 'next/router'
import useApi from './useApi'

export default function useCreatorSpace() {
  const { query } = useRouter()
  const isLink = query.link && query.link.length > 0
  const creator = useApi('users', 'read', query.creator, {
    enabled: !!query.creator,
  })

  const link = useApi('links', 'read', `${creator.data?.id}:${query.link}`, {
    enabled: !!(isLink && creator.data?.id && creator.data?.id.length > 0),
  })

  const isAssetLink = !!(
    isLink &&
    link.data?.linkType === 'asset' &&
    link.data?.assetId
  )

  const assetId = link.data?.assetId || query.asset
  const asset = useApi('assets', 'read', assetId, {
    enabled: (link.data?.assetId !== null && isAssetLink) || !!assetId,
  })

  const isOrder = query.order && query.order.length > 0
  const order = useApi('assets', 'read', query.order, {
    enabled: isOrder,
  })

  const isLoading =
    creator.isLoading ||
    (isLink ? link.isLoading : false) ||
    (isAssetLink ? asset.isLoading : false)

  return { link, creator, asset, order, isLink, isAssetLink, isLoading }
}
