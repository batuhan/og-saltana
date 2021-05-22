import React from 'react'

import {
  chakra,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
} from '@chakra-ui/react'
import { AiFillBell } from 'react-icons/ai'
import { Logo } from '../Logo'
import { useSession } from 'next-auth/client'

import { ProfileDropdown } from './ProfileDropdown'
import { CheckoutToDeliveryModal } from '../CheckoutToDelivery'
export default function Header() {
  const bg = useColorModeValue('white', 'gray.800')

  const [session] = useSession()

  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <HStack display="flex" spacing={3} alignItems="center">
            <chakra.a
              href="/"
              title="Saltana"
              display="flex"
              alignItems="center"
            >
              <Logo />
              <VisuallyHidden>Saltana</VisuallyHidden>
            </chakra.a>
          </HStack>
          <HStack spacing="3">
            {session && (
              <chakra.a
                p={3}
                color={useColorModeValue('gray.800', 'inherit')}
                rounded="sm"
                _hover={{ color: useColorModeValue('gray.800', 'gray.600') }}
              >
                <AiFillBell />
                <VisuallyHidden>Notifications</VisuallyHidden>
              </chakra.a>
            )}
            <CheckoutToDeliveryModal />
            <ProfileDropdown />
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  )
}
