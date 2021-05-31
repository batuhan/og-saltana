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

const OrganizationAssetPage = ({ assetId, creatorId }) => {
  const { is, session } = useCurrentUser()
  const [canEdit, setCanEdit] = React.useState(is(creatorId))

  React.useEffect(() => {
    setCanEdit(is(creatorId))
  }, [session])

  const { data, isSuccess } = useApi('assets', 'read', assetId, {})

  return (
    <CreatorSpaceShell>
      <Container maxW="container.lg">
         <ProductEditMode {...data} />
      </Container>
    </CreatorSpaceShell>
  )
}

export async function getServerSideProps({
  params: { organization, product },
}) {
  try {
    const asset = await sharedInstance.assets.read(product)
    if (!asset) {
      throw new Error('NO_ASSET')
    }
    const queryClient = getSharedQueryClient()
    queryClient.setQueryData(['assets', 'read', asset.id], asset)
    await prefetchQuery('users', 'read', organization)
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        assetId: asset.id,
        creatorId: organization,
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
