import { SimpleGrid, Container } from '@chakra-ui/react'
import * as React from 'react'
import CreatorSpaceShell from '../../components/CreatorSpaceShell'
import { getSharedQueryClient, useApi, prefetchQuery } from '../../modules/api'
import { sharedInstance } from '../../modules/api/useApi'
import { dehydrate } from 'react-query/hydration'
import AssetBox from '../../modules/assets/AssetBox'

const CreatorAssets = ({ creatorId: ownerId }) => {
  const { data = [] } = useApi('assets', 'list', { ownerId })
  return data.map((asset) => <AssetBox key={asset.id} {...asset} />)
}

const CreatorProfile = ({ creatorId }) => {
  return (
    <CreatorSpaceShell creatorId={creatorId}>
      <Container maxW="container.xl">
        <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
          <CreatorAssets creatorId={creatorId} />
        </SimpleGrid>
      </Container>
    </CreatorSpaceShell>
  )
}

export async function getServerSideProps({ params: { creator } }) {
  try {
    const user = await sharedInstance.users.read(creator)
    if (!user) {
      throw new Error('NO_USER')
    }

    const queryClient = getSharedQueryClient()
    queryClient.setQueryData(['users', 'read', user.id], user)
    await prefetchQuery('assets', 'list', { ownerId: user.id })

    return {
      props: { dehydratedState: dehydrate(queryClient), creatorId: user.id },
    }
  } catch (err) {
    return {
      notFound: true,
    }
  }
}

CreatorProfile.useGlobalHeader = true

export default CreatorProfile
