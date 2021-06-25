import * as React from 'react'
import { Box, Link, chakra, Image, useColorModeValue } from '@chakra-ui/react'

export default function sProductPage(props) {
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
        src={props.metadata.images && props.metadata.images[0].url}
        alt={props.name}
      />
    </>
  )
}
