import * as React from 'react'
import CreatorSpaceShell from '../../../components/CreatorSpaceShell'
import {
  sharedQueryClient,
  useApi,
  sharedSaltanaInstance,
} from '../../../modules/api'
import { dehydrate } from 'react-query/hydration'
import getServerSidePropsForCreatorSpaces from '../../../modules/server/getServerSidePropsForCreatorSpaces'
import { useRouter } from 'next/router'

const CreatorLink = () => {
  const router = useRouter()
  const isLinkPage = !!router.query.link
  const creator = useApi('users', 'read', router.query.creator, {
    initialData: {
      id: null,
    },
  })
  const link = useApi(
    'links',
    'read',
    `${router.query.creator}:${router.query.link}`,
    {
      enabled: isLinkPage && creator.data.id,
    }
  )

  return (
    <CreatorSpaceShell>
      <div>test h</div>
    </CreatorSpaceShell>
  )
}

export const getServerSideProps = getServerSidePropsForCreatorSpaces()

export default CreatorLink
