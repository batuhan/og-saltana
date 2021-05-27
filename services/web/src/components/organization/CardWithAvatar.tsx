import {
  Avatar,
  AvatarProps,
  Box,
  Flex,
  FlexProps,
  useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'

interface CardWithAvatarProps extends FlexProps {
  avatarProps: AvatarProps
  action?: React.ReactNode
}

export const CardWithAvatar = (props: CardWithAvatarProps) => {
  const { action, avatarProps, children, ...rest } = props
  return (
    <Flex
      direction="column"
      align={{ sm: 'center' }}
      bg={useColorModeValue('white', 'gray.700')}
      shadow={{ sm: 'base' }}
      rounded={{ sm: 'lg' }}
      {...rest}
    >
      <Avatar
        borderWidth="6px"
        borderColor={useColorModeValue('white', 'gray.700')}
        size="xl"
        {...avatarProps}
      />
      <Box position="absolute" top="4" insetEnd={{ base: '6', md: '8' }}>
        {action}
      </Box>
      {children}
    </Flex>
  )
}
