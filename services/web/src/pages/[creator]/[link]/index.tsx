import {
  Box,
  Button,
  Heading,
  Icon,
  chakra,
  Image,
  Flex,
  Text,
  useColorModeValue,
  SimpleGrid,
  Container,
} from '@chakra-ui/react'
import Link from 'next/link'
import * as React from 'react'
import { dehydrate } from 'react-query/hydration'
import CreatorSpaceShell from '../../../components/CreatorSpaceShell'
import {
  getSharedQueryClient,
  prefetchQuery,
  useApi,
  useCurrentUser,
} from '../../../modules/api'
import { sharedInstance } from '../../../modules/api/useApi'

import ProductPage from '../../../modules/assets/ProductPage'
import ProductEdit from '../../../modules/assets/ProductEdit'
import ProductEditMode from '../../../modules/assets/ProductEditMode'
import CheckoutModal from '../../../modules/checkout/CheckoutModal'
import { useRouter } from 'next/router'

const OrganizationAssetPage = ({ assetId, creatorId }) => {
  const { data } = useApi('assets', 'read', assetId, {})
  const {
    query: { mode },
  } = useRouter()
  const comp = mode === 'edit' ?  <ProductEditMode {...data} /> : <ProductPage {...data} />
  return (
    <CreatorSpaceShell creatorId={creatorId} assetId={assetId}>
      <Container maxW="container.lg">
          <CheckoutModal />
         {comp}
      </Container>
    </CreatorSpaceShell>
  )
}

export async function getServerSideProps({
  params: { creator, link },
}) {
  try {
    const asset = await sharedInstance.assets.read(link)
    if (!asset) {
      throw new Error('NO_ASSET')
    }
    const queryClient = getSharedQueryClient()
    queryClient.setQueryData(['assets', 'read', asset.id], asset)
    await prefetchQuery('users', 'read', creator)
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        assetId: asset.id,
        linkType: 'asset',
        creatorId: creator
      },
    }
  } catch (err) {
    return {
      notFound: true,
    }
  }
}

OrganizationAssetPage.useGlobalHeader = true
export default OrganizationAssetPage
