import * as React from 'react'
import CreatorSpaceShell from 'components/CreatorSpace/Shell'

import getStaticPropsForCreatorSpacePages from '@/server/getStaticPropsForCreatorSpacePages'

import useCreatorSpace from 'hooks/useCreatorSpace'
import NotionBox from 'components/ContentViewer/Notion'
import ViewerWrapper from 'components/ContentEditor/Editor/ViewerWrapper'
import CheckoutForm from 'components/Checkout/CheckoutForm'

const CreatorLink = ({ embed }) => {
  const { link, asset, creator } = useCreatorSpace()
  return (
    <CreatorSpaceShell>
      <div>
        <ViewerWrapper content={link.data?.content} />

        {embed?.provider === 'notion' && (
          <NotionBox recordMap={embed.recordMap} />
        )}

        {link.data.linkType === 'checkout' && (
          <CheckoutForm assetIds={link.data.assetIds} />
        )}
      </div>
      <code>
        {link.data && JSON.stringify(link.data)}
        {asset.data && JSON.stringify(asset.data)}
        {creator.data && JSON.stringify(creator.data)}
      </code>
    </CreatorSpaceShell>
  )
}

export const getStaticProps = getStaticPropsForCreatorSpacePages()

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export default CreatorLink
