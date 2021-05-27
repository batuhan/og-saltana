import { Box, Stack } from '@chakra-ui/react'
import * as React from 'react'
import DashboardShell from '../../components/DashboardShell'
import { AccountSettings } from '../../components/UserSettings/AccountSettings'
import { DangerZone } from '../../components/UserSettings/DangerZone'
import { SocialAccountSettings } from '../../components/UserSettings/SocialAccountSettings'

export default function DashboardUserSettings() {
  return (
    <DashboardShell>
      <Box maxW="xl" mx="auto">
        <Stack spacing="12">
          <AccountSettings />
          <SocialAccountSettings />
          <DangerZone />
        </Stack>
      </Box>
    </DashboardShell>
  )
}
DashboardUserSettings.auth = {
  role: 'admin',
  loading: 'Loading', //direct to this url
}
