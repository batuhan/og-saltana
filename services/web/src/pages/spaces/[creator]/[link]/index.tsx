import * as React from 'react'
import CreatorSpaceShell from 'components/CreatorSpace/Shell'

import getStaticPropsForCreatorSpacePages from '@/server/getStaticPropsForCreatorSpacePages'

import useCreatorSpace from 'hooks/useCreatorSpace'
import NotionBox from 'components/ContentViewer/Notion'

const CreatorLink = ({ embed }) => {
  const { isLink, link, asset, creator } = useCreatorSpace()
  return (
    <CreatorSpaceShell>
      <div>
        {link.data && <pre>{JSON.stringify(link.data)}</pre>}
        {asset.data && <pre>{JSON.stringify(asset.data)}</pre>}
        {creator.data && <pre>{JSON.stringify(creator.data)}</pre>}
        {isLink && embed?.provider === 'notion' && (
          <NotionBox recordMap={embed.recordMap} />
        )}
      </div>
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
