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
import { useAssets } from '../../modules/api'

const Ma = (props) => {
  return (
    <Box
      maxW="lg"
      mx="auto"
      bg={useColorModeValue('white', 'gray.800')}
      shadow="lg"
      rounded="lg"
    >
      <Box px={4} py={2}>
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
        alt="NIKE AIR"
      />

      <Flex
        alignItems="center"
        justifyContent="space-between"
        px={4}
        py={2}
        bg="gray.900"
        roundedBottom="lg"
      >
        <chakra.h1 color="white" fontWeight="bold" fontSize="lg">
          {props.price}
        </chakra.h1>
        <chakra.button
          px={2}
          py={1}
          bg="white"
          fontSize="xs"
          color="gray.900"
          fontWeight="bold"
          rounded="lg"
          textTransform="uppercase"
          _hover={{
            bg: 'gray.200',
          }}
          _focus={{
            bg: 'gray.400',
          }}
        >
          Add to cart
        </chakra.button>
      </Flex>
    </Box>
  )
}

const OrganizationAssets = () => {
  const router = useRouter()
  const { organization: ownerId } = router.query
  const { data = [] } = useAssets({ ownerId })
  return data.map((asset) => <Ma key={asset.id} {...asset} />)
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

export default OrganizationProfile
