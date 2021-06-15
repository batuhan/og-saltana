import {
  Box,
  Grid,
  Flex,
  Text,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import * as React from 'react'
import { CardWithAvatar } from './CardWithAvatar'
import { HiPencilAlt } from 'react-icons/hi'
import { UserInfo } from './UserInfo'

const CreatorSpaceShell = ({
  children,
  creatorId,
  mode,
  assetId,
  editModeEnabled,
  avatarSrc,
  displayName,
  description,
  createdDate,
  canEdit,
}) => {
  return (
    <Box>
      <Box as="section" pt="20" pb="12" position="relative">
        <Box position="absolute" inset="0" height="32" bg="blue.600" />
        <CardWithAvatar
          avatarProps={{
            src: avatarSrc,
            name: displayName,
          }}
          action={
            canEdit && (
              <Link
                href={`/${creatorId}${assetId ? `/${assetId}` : ''}${
                  editModeEnabled ? '' : '?mode=edit'
                }`}
                passHref
              >
                <Button variant="solid" leftIcon={<HiPencilAlt />}>
                  {editModeEnabled ? 'Save' : 'Customize'}
                </Button>
              </Link>
            )
          }
        >
          <Box textAlign="center">
            <Heading size="lg" fontWeight="extrabold" letterSpacing="tight">
              {displayName}
            </Heading>
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              {description}
            </Text>
            <UserInfo
              location="Memphis, USA"
              website="esther.com"
              memberSince={`Joined ${createdDate}`}
            />
          </Box>
        </CardWithAvatar>
      </Box>
      {children}
    </Box>
  )
}

export default CreatorSpaceShell
