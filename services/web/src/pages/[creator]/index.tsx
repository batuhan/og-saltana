import * as React from 'react'
import CreatorSpaceShell from '../../components/CreatorSpaceShell'
import {
  sharedQueryClient,
  useApi,
  prefetchQuery,
  sharedSaltanaInstance,
} from '../../modules/api'
import { dehydrate } from 'react-query/hydration'
import AssetBox from '../../modules/assets/AssetBox'

const CreatorAssets = ({ creatorId: ownerId }) => {
  const { data = [] } = useApi('assets', 'list', { ownerId })
  return data.map((asset) => <AssetBox key={asset.id} {...asset} />)
}

const CreatorProfile = ({ creatorId }) => {
  return (
    <CreatorSpaceShell creatorId={creatorId}>
      <div>
        <CreatorAssets creatorId={creatorId} />
      </div>
    </CreatorSpaceShell>
  )
}

export async function getServerSideProps({ params: { creator } }) {
  try {
    const user = await sharedSaltanaInstance.users.read(creator)
    if (!user) {
      throw new Error('NO_USER')
    }

    sharedQueryClient.setQueryData(['users', 'read', user.id], user)
    await prefetchQuery('assets', 'list', { ownerId: user.id })

    return {
      props: {
        dehydratedState: dehydrate(sharedQueryClient),
        creatorId: user.id,
      },
    }
  } catch (err) {
    return {
      notFound: true,
    }
  }
}

CreatorProfile.useGlobalHeader = true

export default CreatorProfile
