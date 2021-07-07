import * as React from 'react'
import DashboardShell from 'components/Dashboard/Common/Shell'
import tw, { styled, css } from 'twin.macro'
import { NextSeo } from 'next-seo'
import getServerSidePropsForCreatorDashboardPages from '@/server/getServerSidePropsForCreatorDashboardPages'

export const CreatorStats = ({ currentUserId }) => {
  return (
    <DashboardShell>
      <NextSeo title="Stats" />
      Stats
    </DashboardShell>
  )
}

export const getServerSideProps = getServerSidePropsForCreatorDashboardPages()

export default CreatorStats
