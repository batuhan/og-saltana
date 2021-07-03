import { useRouter } from "next/router"
import useApi from "./useApi"

export default function useCreatorSpace() {
    const { query } = useRouter()
    const isLink = query.link && query.link.length > 0
    const creator = useApi('users', 'read', query.creator, {
        initialData: {
            id: null,
        },
    })

    const link = useApi(
        'links',
        'read',
        `${creator.data.id}:${query.link}`,
        {
            enabled:
                isLink && creator.data.id && creator.data.id.length > 0
                    ? true
                    : false,
            initialData: {
                id: null,
                linkType: 'not-asset',
                assetId: null
            }
        }
    )

    const isAssetLink = (isLink && link.data.linkType === 'asset' && link.data.assetId) ? true : false
    const asset = useApi('assets', 'read', link, {
        enabled: isAssetLink,
        initialData: {
            id: null
        }
    })

    return { link, creator, asset, isLink, isAssetLink }
}
