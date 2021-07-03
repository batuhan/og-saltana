import * as React from 'react'
import CreatorSpaceShell from 'components/CreatorSpace/Shell'

import getStaticPropsForCreatorSpacePages from '@/server/getStaticPropsForCreatorSpacePages'
import NotionBox from 'components/CreatorSpace/LinkContentBoxes/NotionBox'
import useCreatorSpace from 'hooks/useCreatorSpace'

const CreatorLink = ({ embed }) => {
  const { isLink } = useCreatorSpace()
  return (
    <CreatorSpaceShell>
      <div>
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
