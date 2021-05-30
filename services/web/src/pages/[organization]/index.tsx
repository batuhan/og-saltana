import { SimpleGrid, Container } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import * as React from 'react'
import CreatorSpaceShell from '../../components/CreatorSpaceShell'
import {
  getSharedQueryClient,
  useApi,
  prefetchQuery,
} from '../../modules/api'
import { sharedInstance } from '../../modules/api/useApi'
import { dehydrate } from 'react-query/hydration'
import AssetBox from '../../modules/assets/AssetBox'

const OrganizationAssets = ({ creatorId: ownerId }) => {
  const { data = [] } = useApi('assets', 'list', { ownerId })
  return data.map((asset) => <AssetBox key={asset.id} {...asset} />)
}

const OrganizationProfile = ({ creatorId }) => {
  return (
    <CreatorSpaceShell>
      <Container maxW="container.xl">
        <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
          <OrganizationAssets creatorId={creatorId} />
        </SimpleGrid>
      </Container>
    </CreatorSpaceShell>
  )
}

export async function getServerSideProps({ params: { organization } }) {
  try {
    const user = await sharedInstance.users.read(organization)
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

OrganizationProfile.useGlobalHeader = true

export default OrganizationProfile
