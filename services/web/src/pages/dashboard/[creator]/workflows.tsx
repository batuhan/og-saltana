import * as React from 'react'

import { NextSeo } from 'next-seo'

import DashboardShell from 'components/Dashboard/Common/Shell'
import getServerSidePropsForCreatorDashboardPages from '@/server/getServerSidePropsForCreatorDashboardPages'

export const CreatorWorkflows = ({ currentUserId }) => {
  return (
    <DashboardShell>
      <NextSeo title="Workflows" />
      Workflows
    </DashboardShell>
  )
}

export const getServerSideProps = getServerSidePropsForCreatorDashboardPages()

export default CreatorWorkflows
