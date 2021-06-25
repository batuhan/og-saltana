import { ReactNode } from 'react'
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'
import { useSession } from 'next-auth/client'
import NextLink from 'next/link'
import { GlobalTopBar } from './DashboardShell/GlobalTopBar'

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}
  >
    {children}
  </Link>
)

export default function GlobalHeader() {
  const [session] = useSession()
  return (
    <Box px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={8} alignItems={'center'}>
          <GlobalTopBar />
        </HStack>
        <Flex alignItems={'center'}>
          {!session && (
            <>
              <NextLink href="/request-invite" passHref>
                <Button
                  variant={'outline'}
                  colorScheme={'teal'}
                  size={'sm'}
                  mr={4}
                >
                  Request an invite
                </Button>
              </NextLink>
              <NextLink href="/login" passHref>
                <Button
                  variant={'link'}
                  colorScheme={'teal'}
                  size={'sm'}
                  mr={4}
                >
                  Login
                </Button>
              </NextLink>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}
