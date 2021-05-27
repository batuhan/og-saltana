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
import { useRouter } from 'next/router'
import * as React from 'react'
import { HiBadgeCheck, HiPencilAlt } from 'react-icons/hi'
import CreatorSpaceShell from '../../components/CreatorSpaceShell'
import { CardContent } from '../../components/organization/CardContent'
import { CardWithAvatar } from '../../components/organization/CardWithAvatar'
import { GridSystemDemo } from '../../components/organization/GridSystem/App'
import ProductPreviewCard from '../../components/organization/ProductPreviewCard'
import { UserInfo } from '../../components/organization/UserInfo'
import {
  getSharedQueryClient,
  prefetchAssets,
  prefetchSharedQuery,
  prefetchUser,
  useAssets,
} from '../../modules/api'
import { dehydrate } from 'react-query/hydration'
import AssetBox from '../../modules/assets/AssetBox'

const OrganizationAssets = () => {
  const router = useRouter()
  const { organization: ownerId } = router.query
  const { data = [] } = useAssets({ ownerId })
  return data.map((asset) => <AssetBox key={asset.id} {...asset} />)
}

const OrganizationProfile = () => {
  return (
    <CreatorSpaceShell>
      <Container maxW="container.xl">
        <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
          <OrganizationAssets />
        </SimpleGrid>
      </Container>
    </CreatorSpaceShell>
  )
}

export async function getServerSideProps({ params: { organization } }) {
  await prefetchUser(organization)
  await prefetchAssets({ ownerId: organization })
  return {
    props: { dehydratedState: dehydrate(getSharedQueryClient()) },
  }
}

export default OrganizationProfile
