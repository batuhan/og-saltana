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
import { dehydrate } from 'react-query/hydration'
import CreatorSpaceShell from '../../../components/CreatorSpaceShell'
import { CardContent } from '../../../components/organization/CardContent'
import { CardWithAvatar } from '../../../components/organization/CardWithAvatar'
import { GridSystemDemo } from '../../../components/organization/GridSystem/App'
import ProductPreviewCard from '../../../components/organization/ProductPreviewCard'
import { UserInfo } from '../../../components/organization/UserInfo'
import {
  getSharedQueryClient,
  prefetchAsset,
  prefetchAssets,
  prefetchUser,
  useAsset,
  useAssets,
} from '../../../modules/api'

const Ma = (props) => {
  return (
    <>
      <Box>
        <Link
          href={`/${encodeURIComponent(props.ownerId)}/${encodeURIComponent(
            props.id
          )}`}
        >
          <chakra.h1
            color={useColorModeValue('gray.800', 'white')}
            fontWeight="bold"
            fontSize="3xl"
            textTransform="uppercase"
          >
            {props.name}
          </chakra.h1>
        </Link>
        <chakra.p
          mt={1}
          fontSize="sm"
          color={useColorModeValue('gray.600', 'gray.400')}
        >
          {props.description}
        </chakra.p>
      </Box>

      <Image
        h={48}
        w="full"
        fit="cover"
        mt={2}
        src={props.metadata.images[0].url}
        alt={props.name}
      />
    </>
  )
}

const Asset = () => {
  const router = useRouter()
  const { product: assetId } = router.query
  const { data = {} } = useAsset({ assetId })
  return <Ma {...data} />
}

const OrganizationAssetPage = () => {
  return (
    <CreatorSpaceShell>
      <Container maxW="container.xl">
        <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
          <Asset />
        </SimpleGrid>
      </Container>
    </CreatorSpaceShell>
  )
}

export async function getServerSideProps({
  params: { organization, product },
}) {
  await prefetchUser(organization)
  await prefetchAsset({ assetId: product })
  return {
    props: { dehydratedState: dehydrate(getSharedQueryClient()) },
  }
}

export default OrganizationAssetPage
