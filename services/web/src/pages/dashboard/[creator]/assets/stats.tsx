import { NextSeo } from 'next-seo'
import React from 'react'
import DashboardShell from 'components/Dashboard/Common/Shell'
import getServerSidePropsForCreatorDashboardPages from '@/server/getServerSidePropsForCreatorDashboardPages'
import CreatorDashboardAssetsLayout from 'components/Dashboard/Creator/Assets/Layout'

export default function CreatorDashboardAssetsPayouts() {
  return (
    <CreatorDashboardAssetsLayout>
      <NextSeo title="Payouts" />
      Payouts
    </CreatorDashboardAssetsLayout>
  )
}

export const getServerSideProps = getServerSidePropsForCreatorDashboardPages()
