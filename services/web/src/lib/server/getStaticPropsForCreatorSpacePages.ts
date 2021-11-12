import {
  getSaltanaInstance,
  createQueryClient,
  setUserData,
  setCreatorLinkData,
  sharedSaltanaInstance,
} from '@/client/api'

import { dehydrate } from 'react-query/hydration'
import _ from 'lodash'
import { NotionAPI } from 'notion-client'

const notion = new NotionAPI()
function parseEmbedDestination(destination) {
  const parsed = new URL(destination)
  // notion.so/Core-202d549a7c7c45c3b9f4a80…
  if (parsed.hostname === 'www.notion.so' || parsed.hostname === 'notion.so') {
    const pieces = parsed.pathname.split('/')

    return {
      provider: 'notion',
      pageId: pieces[pieces.length - 1],
    }
  }
}

const getStaticPropsForCreatorSpacePages = () => async (context) => {
  const { params } = context

  const creator = await sharedSaltanaInstance.users.read(params.creator)
  if (!creator) {
    return {
      notFound: true,
    }
  }

  const queryClient = createQueryClient()

  setUserData(queryClient, creator)

  const commonProps = {
    creator,
    embed: {
      provider: 'generic',
      pageId: null,
      recordMap: [],
    },
  }

  if (params.link) {
    const linkId = `${creator.id}:${params.link}`
    const link = await sharedSaltanaInstance.links.read(linkId)

    if (!link) {
      return {
        redirect: {
          destination: `/${creator.username}/404`,
          permanent: false,
        },
      }
    }

    setCreatorLinkData(queryClient, link)

    switch (link.linkType) {
      case 'checkout':
        if (_.isArray(link.assets) === false || _.isEmpty(link.assetIds)) {
          break
        }

        const assetsQuery = {
          id: [...link.assetIds],
          ownerId: [creator.id],
        }
        const assets = await sharedSaltanaInstance.assets.list(assetsQuery)

        queryClient.setQueryData(['assets', 'list', assetsQuery], assets)

        assets.forEach((asset) =>
          queryClient.setQueryData(['assets', 'read', asset.id], asset),
        )

        break
      case 'embed':
        const embed = parseEmbedDestination(link.destination)
        if (embed.provider === 'notion') {
          const recordMap = await notion.getPage(embed.pageId)
          commonProps.embed = { ...embed, recordMap }
        } else {
          commonProps.embed.pageId = link.destination
        }
        break
      case 'link-list':
        break
      case 'content':
        break

      case 'redirect':
        return {
          redirect: {
            destination: link.destination,
            permanent: false,
          },
        }
        break
    }
  }
  const dehydratedState = dehydrate(queryClient)

  return {
    props: {
      ...commonProps,
      dehydratedState,
    },
    revalidate: 50,
  }
}

export default getStaticPropsForCreatorSpacePages
