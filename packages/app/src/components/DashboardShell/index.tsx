import { Box, Container, Flex } from '@chakra-ui/react'
import * as React from 'react'
import { MobileTopBar } from './MobileTopBar'
import { Sidebar } from './Sidebar'

const DashboardShell: React.FC = ({ children }) => {
  return (
    <Flex h="100vh" flexDirection="column">
      <MobileTopBar />
      <Flex flex="1" overflow="hidden">
        <Sidebar display={{ base: 'none', md: 'flex' }} />
        <Box as="main" py="8" flex="1" overflow="auto">
          <Container maxW="7xl">{children}</Container>
        </Box>
      </Flex>
    </Flex>
  )
}

export default DashboardShell
