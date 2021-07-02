import * as React from 'react'
import CreatorSpaceShell from '../../../components/CreatorSpaceShell'
import {
  sharedQueryClient,
  useApi,
  sharedSaltanaInstance,
} from '../../../modules/client/api'
import { dehydrate } from 'react-query/hydration'
import getServerSidePropsForCreatorSpaces from '../../../modules/server/getServerSidePropsForCreatorSpacePages'
import { useRouter } from 'next/router'
import NotionBox from '../../../components/CreatorSpaceShell/LinkContentBoxes/NotionBox'

const CreatorLink = ({ embed }) => {
  const router = useRouter()
  const isLinkPage = router.query.link && router.query.link.length > 0
  const creator = useApi('users', 'read', router.query.creator, {
    initialData: {
      id: null,
    },
  })
  const link = useApi(
    'links',
    'read',
    `${creator.data.id}:${router.query.link}`,
    {
      enabled:
        isLinkPage && creator.data.id && creator.data.id.length > 0
          ? true
          : false,
    }
  )

  return (
    <CreatorSpaceShell>
      <div>
        {embed.provider === 'notion' && (
          <NotionBox recordMap={embed.recordMap} />
        )}
      </div>
    </CreatorSpaceShell>
  )
}

export const getServerSideProps = getServerSidePropsForCreatorSpaces()

export default CreatorLink
