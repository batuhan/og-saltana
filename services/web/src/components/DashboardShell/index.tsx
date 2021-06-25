import { Box, Container, Flex } from '@chakra-ui/react'
import * as React from 'react'
import { MobileTopBar } from './MobileTopBar'
import { Sidebar } from './Sidebar'

const DashboardShell: React.FC = ({ children }) => {
  return (
    <Flex h="100vh" flexDirection="column">
      <MobileTopBar />
      <Flex flex="1">
        <Sidebar display={{ base: 'none', md: 'flex' }} />
        {children}
      </Flex>
    </Flex>
  )
}

export default DashboardShell
