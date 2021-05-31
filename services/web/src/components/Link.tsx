import { chakra, HTMLChakraProps, useColorModeValue } from '@chakra-ui/react'
import React, { FC } from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import {
  Link as ChackraLink,
  LinkProps as ChackraLinkProps,
} from '@chakra-ui/react'

interface IProps extends NextLinkProps {
  chackraLink?: ChackraLinkProps
}

export const Link = (props: HTMLChakraProps<'a'>) => (
  <chakra.a
    marginStart="1"
    href="#"
    color={useColorModeValue('blue.500', 'blue.200')}
    _hover={{ color: useColorModeValue('blue.600', 'blue.300') }}
    display={{ base: 'block', sm: 'inline' }}
    {...props}
  />
)

export const SLink: FC<IProps> = (props) => {
  const { chackraLink, children } = props
  const nextLinkProps = {
    ...props,
    chackraLink: undefined,
    children: undefined,
  }
  return (
    <NextLink {...nextLinkProps} passHref>
      <ChackraLink {...chackraLink}>{children}</ChackraLink>
    </NextLink>
  )
}

SLink.defaultProps = {
  chackraLink: {},
}
