import { getSaltanaInstance, createQueryClient } from '../api'
import { getSession } from 'next-auth/client'

import { dehydrate } from 'react-query/hydration'
import _ from 'lodash'
import { NotionAPI } from 'notion-client'

const notion = new NotionAPI()
function parseEmbedDestination(destination) {
  const parsed = new URL(destination)
  //notion.so/Core-202d549a7c7c45c3b9f4a80…
  if (parsed.hostname === 'www.notion.so' || parsed.hostname === 'notion.so') {
    const pieces = parsed.pathname.split('/')

    return {
      provider: 'notion',
      pageId: pieces[pieces.length - 1],
    }
  }
}

const getServerSidePropsForCreatorSpaces =
  (
    extendPropsFn = ({
      commonProps,
      session,
      instance,
      queryClient,
      context,
    }) => Promise.resolve({})
  ) =>
  async (context) => {
    const { params } = context
    const session = await getSession(context)
    const instance = await getSaltanaInstance(session)

    const creator = await instance.users.read(params.creator)
    if (!creator) {
      return {
        notFound: true,
      }
    }
    const queryClient = createQueryClient()
    queryClient.setQueryData(['users', 'read', creator.id], creator)
    queryClient.setQueryData(['users', 'read', creator.username], creator)

    const commonProps = { creator, link: null, asset: null }

    if (params.link) {
      const link = await instance.links.read(`${creator.id}:${params.link}`)
      if (!link) {
        return {
          redirectTo: `/${creator.username}/404`,
          permanent: false,
        }
      }

      queryClient.setQueryData(['links', 'read', link.id], link)

      commonProps.link = link

      const data = {
        embed: {
          provider: 'generic',
          pageId: null,
          recordMap: [],
        },
      }

      switch (link.linkType) {
        case 'asset':
          const asset = await instance.assets.read(link.assetId)
          queryClient.setQueryData(['assets', 'read', link.assetId], asset)
          commonProps.asset = asset
          break
        case 'embed':
          const embed = parseEmbedDestination(link.destination)
          if (embed.provider === 'notion') {
            data.embed.provider = embed.provider
            data.embed.pageId = embed.pageId
            data.embed.recordMap = await notion.getPage(embed.pageId)
          } else {
            data.embed.pageId = link.destination
          }
          break
        case 'link-list':
          break
        case 'content':
          break

        case 'redirect':
          return {
            redirectTo: link.destination,
            permanent: false,
          }
          break
      }
    }

    const props = await extendPropsFn({
      commonProps,
      session,
      instance,
      queryClient,
      context,
    })

    return {
      props: {
        ...commonProps,
        ...props,
        dehydratedState: dehydrate(queryClient),
      },
    }
  }

export default getServerSidePropsForCreatorSpaces
