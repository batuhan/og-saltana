import * as React from 'react'
import {
  Box,
  chakra,
  Flex,
  Icon,
  Skeleton,
} from '@chakra-ui/react'
import { HiBadgeCheck } from 'react-icons/hi'
import { useApi } from '../../modules/api'

const AssetInfoBox = ({ assetId }) => {
  const { data, isLoading } = useApi('assets', 'read', assetId)

  return (
    <Box
      bg="#ffffff"
      borderRadius="lg"
      border="1px solid lightgrey"
      overflow="hidden"
    >
      <Box p={5} pb={8} display="flex" justifyContent="center">
        <Skeleton isLoaded={!isLoading}>{data.description}</Skeleton>
      </Box>
      <Box p={5} pb={8} display="flex" justifyContent="center">
        some information on the product that is not editable by the creator
      </Box>

      <Flex alignItems="center" px={6} py={3} bg="gray.900">
        <Icon as={HiBadgeCheck} h={6} w={6} color="white" />

        <chakra.h1 mx={3} color="white" fontWeight="bold" fontSize="lg">
          <Skeleton isLoaded={!isLoading}>
            GET NOW FOR {data.price} {data.currency}
          </Skeleton>
        </chakra.h1>
      </Flex>
    </Box>
  )
}

export default AssetInfoBox
