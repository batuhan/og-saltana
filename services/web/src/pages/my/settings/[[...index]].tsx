import DashboardShell from 'components/Dashboard/Common/Shell'

import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import React, { useEffect } from 'react'
import { NextSeo } from 'next-seo'

import _ from 'lodash'
import { UserProfile } from '@clerk/nextjs'

export default function DashboardUserSettings({ userId }) {

  return (
    <DashboardShell>
      <NextSeo title="Account Settings" />

      <UserProfile routing="path" hideNavigation={true} path="/my/settings" />

    </DashboardShell>
  )
}

