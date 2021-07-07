import { NextSeo } from 'next-seo'
import React from 'react'
import DashboardShell from 'components/Dashboard/Common/Shell'
import getServerSidePropsForCreatorDashboardPages from '@/server/getServerSidePropsForCreatorDashboardPages'

export default function CreatorDashboardIntegrations() {
  return (
    <DashboardShell>
      <NextSeo title="Integrations" />
      integrations
    </DashboardShell>
  )
}

export const getServerSideProps = getServerSidePropsForCreatorDashboardPages()
