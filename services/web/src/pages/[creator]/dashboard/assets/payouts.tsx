import { NextSeo } from 'next-seo'
import React from 'react'
import DashboardShell from 'components/Dashboard/Common/Shell'
import getServerSidePropsForCreatorDashboardPages from '@/server/getServerSidePropsForCreatorDashboardPages'

export default function CreatorDashboardAssetsPayouts() {
  return (
    <DashboardShell>
      <NextSeo title="Payouts" />
      Payouts
    </DashboardShell>
  )
}

export const getServerSideProps = getServerSidePropsForCreatorDashboardPages()
