import {
  HStack,
  Icon,
  Link as ChakraLink,
  LinkProps,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import Link from 'next/link'

import * as React from 'react'

interface NavLinkProps extends LinkProps {
  isActive?: boolean
  label: string
  icon?: React.ElementType
  href?: string
}

export const NavLinkPlain = (props: NavLinkProps) => {
  const { icon, isActive, label, ...rest } = props

  return (
    <ChakraLink
      display="block"
      py="2"
      px="3"
      borderRadius="md"
      transition="all 0.3s"
      fontWeight="medium"
      fontSize="sm"
      userSelect="none"
      aria-current={isActive ? 'page' : undefined}
      color={mode('gray.700', 'gray.400')}
      _hover={{
        bg: mode('gray.100', 'gray.700'),
        color: mode('gray.900', 'white'),
      }}
      _activeLink={{
        bg: mode('gray.200', 'gray.700'),
        color: 'inherit',
      }}
      {...rest}
    >
      <HStack spacing="4">
        {icon && <Icon as={icon} fontSize="lg" opacity={0.64} />}
        <Text as="span">{label}</Text>
      </HStack>
    </ChakraLink>
  )
}

export const NavLink = (props: NavLinkProps) => {
  const { href, ...otherProps } = props
  if (href) {
    return (
      <Link href={href} passHref>
        <NavLinkPlain {...otherProps} />
      </Link>
    )
  }

  return <NavLinkPlain {...otherProps} />
}
