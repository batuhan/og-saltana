import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import { HiOutlineMenu } from 'react-icons/hi'
import { Logo } from '../Logo'
import { Sidebar } from './Sidebar'
import { useSession } from 'next-auth/client'

export const GlobalTopBar = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [session] = useSession()

  return (
    <Flex>
      <Logo h="10" />

      {session && <IconButton
        onClick={() => setIsOpen(true)}
        variant="unstyled"
        display="flex"
        cursor="pointer"
        aria-label="Menu"
        icon={<HiOutlineMenu fontSize="1.5rem" />}
      />}
      <Drawer
        size="xs"
        placement="left"
        isOpen={isOpen}
        blockScrollOnMount={false}
        onClose={() => setIsOpen(false)}
      >
        <DrawerOverlay />
        <DrawerContent
          bg={mode('white', 'gray.800')}
          shadow="none"
          position="relative"
          maxW="64"
        >
          <Sidebar width="full" height="full" bg="inherit" border="0" />
          <DrawerCloseButton
            bg="blue.500"
            _hover={{ bg: 'blue.600' }}
            _active={{ bg: 'blue.700' }}
            rounded="0"
            position="absolute"
            color="white"
            right="-8"
            top="0"
          />
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}
