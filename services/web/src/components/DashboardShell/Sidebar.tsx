import {
  Box,
  Divider,
  Flex,
  FlexProps,
  Spacer,
  Stack,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import { Logo } from '../Logo'
import { NavGroup } from './NavGroup'
import { NavLink } from './NavLink'
import { SearchField } from './SearchField'
import { UserProfile } from './UserProfile'
import { signOut, useSession } from 'next-auth/client'
import { useCurrentUser } from '../../modules/api'

const UserAvatar = () => {
  const [session] = useCurrentUser()

  return (
    <Avatar
      size="sm"
      src={session.profile?.metadata?.avatar}
      name={session.profile?.displayName || session.user?.email}
    />
  )
}

export const Sidebar = (props: FlexProps) => {
  const user = useCurrentUser()

  return (
    <Flex
      bg={mode('gray.50', 'gray.800')}
      direction="column"
      borderRightWidth="1px"
      width="64"
      {...props}
    >
      <Flex direction="column" flex="1" pt="5" pb="4" overflowY="auto" px="4">
        <Box mb="6">
          <Logo color={mode('blue.600', 'blue.400')} h="6" />
        </Box>

        <Stack spacing="6" as="nav" aria-label="Sidebar Navigation">
          <Stack spacing="1">
            <NavGroup label="Creator Space">
              <NavLink
                label="Request an invite to become a creator"
                href="/request-invite"
              />
              <NavLink
                label="Profile"
                href={`/${encodeURIComponent(user.data.username)}`}
              />
              <NavLink
                label="Dashboard"
                href={`/${encodeURIComponent(user.data.username)}/dashboard`}
              />
              <NavLink
                label="Links"
                href={`/${encodeURIComponent(
                  user.data.username
                )}/dashboard/links`}
              />
              <NavLink
                label="Sales"
                href={`/${encodeURIComponent(
                  user.data.username
                )}/dashboard/sales`}
              />
              <NavLink
                label="Analytics"
                href={`/${encodeURIComponent(
                  user.data.username
                )}/dashboard/analytics`}
              />
              <NavLink
                label="Workflows & Integrations"
                href={`/${encodeURIComponent(
                  user.data.username
                )}/dashboard/workflows`}
              />
              <NavLink
                label="Customization"
                href={`/${encodeURIComponent(
                  user.data.username
                )}/dashboard/customize`}
              />
            </NavGroup>
          </Stack>
          <Divider />
          <Stack spacing="1">
            <NavGroup label="ACCOUNT">
              <NavLink label="Payments" href="/my/payments" />
              <NavLink label="Settings" href="/my/settings" />
              <NavLink label="Notifications" href="/my/notifications" />
              <NavLink label="Help" href="https://help.saltana.com" />
              <NavLink label="Logout" onClick={() => signOut()} />
            </NavGroup>
          </Stack>
        </Stack>
        <Spacer />
      </Flex>

      <UserProfile
        name={user.data?.displayName}
        image={user.data?.metadata?.avatar}
        email={user.data?.email}
      />
    </Flex>
  )
}
