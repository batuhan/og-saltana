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
            <NavGroup label="ACCOUNT">
              <NavLink
                label="Request an invite to become a creator"
                href="/request-invite"
              />
              <NavLink label="Settings" href="/my/notifications" />
            </NavGroup>
          </Stack>

          <Divider />
          <Stack spacing="1">
            <NavGroup label="Creator Page">
              <NavLink
                label="Profile"
                href={`/${encodeURIComponent(user.data.id)}`}
              />
              <NavLink
                label="Products"
                href={`/${encodeURIComponent(user.data.id)}/dashboard/products`}
              />
              <NavLink
                label="Pages"
                href={`/${encodeURIComponent(user.data.id)}/dashboard/pages`}
              />
              <NavLink
                label="Links"
                href={`/${encodeURIComponent(user.data.id)}/dashboard/links`}
              />
              <NavLink
                label="Forms"
                href={`/${encodeURIComponent(user.data.id)}/dashboard/forms`}
              />
              <NavLink
                label="Workflows & Integrations"
                href={`/${encodeURIComponent(
                  user.data.id
                )}/dashboard/workflows`}
              />
              <NavLink
                label="Earnings & Payouts"
                href={`/${encodeURIComponent(user.data.id)}/dashboard/payouts`}
              />
              <NavLink
                label="Customization"
                href={`/${encodeURIComponent(
                  user.data.id
                )}/dashboard/customize`}
              />
            </NavGroup>
          </Stack>

          <Divider />

          <Stack spacing="1">
            <NavGroup label="ACCOUNT">
              <NavLink label="Purchases" href="/my/purchases" />
              <NavLink label="Settings" href="/my/notifications" />
            </NavGroup>
          </Stack>

          <Divider />

          <Stack spacing="1">
            <NavLink label="Notifications" href="/my/notifications" />
            <NavLink label="Help Center" />
            <NavLink label="Logout" onClick={() => signOut()} />
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
