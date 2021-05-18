import { Flex, Box } from '@chakra-ui/react'
import * as React from 'react'
import Header from './Header'
const Shell = ({ children }) => {
  return (
    <Flex direction="column" height="100vh">
      <Header />

      <Box as="main">{children}</Box>
    </Flex>
  )
}

export default Shell
