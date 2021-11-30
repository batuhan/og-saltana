import getServerSidePropsForUserDashboardPages from '@/server/getServerSidePropsForUserDashboardPages'
import useApi from 'hooks/useApi'
import useCurrentUser from 'hooks/useCurrentUser'
import React from 'react'
import DashboardShell from 'components/Dashboard/Common/Shell'
import { NextSeo } from 'next-seo'

export default function MyNotifications() {
  const { user } = useCurrentUser()
  const ordersQuery = useApi(
    'orders',
    'list',
    {
      payerId: user.user.id,
      nbResultsPerPage: 100,
    },
    { initialData: [], enabled: user.isLoggedIn },
  )

  return (
    <DashboardShell>
      <NextSeo title="My Notifications" />
      <div className="relative min-h-screen bg-white">
        Oh no! You have no notifications yet...
      </div>
    </DashboardShell>
  )
}

export const getServerSideProps = getServerSidePropsForUserDashboardPages()
