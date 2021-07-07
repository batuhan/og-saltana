import 'twin.macro'

import { HomeIcon, PlusIcon, SearchIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { useForm, useFormContext } from 'react-hook-form'
import getServerSidePropsForCreatorDashboardPages from '@/server/getServerSidePropsForCreatorDashboardPages'
import useApiMutation from 'hooks/useApiMutation'
import useCurrentUser from 'hooks/useCurrentUser'
import React, { Suspense, useMemo } from 'react'
import useCreatorSpace from 'hooks/useCreatorSpace'
import CreatorSlugField from 'components/Dashboard/Common/Fields/CreatorSlugField'
import _ from 'lodash'
import GmailLoader from 'components/Dashboard/Common/PlaceholderContent'
import DashboardShell from 'components/Dashboard/Common/Shell'
import CreatorDashboardLinkSidebar from 'components/Dashboard/Creator/Links/Sidebar'
import CreatorDashboardLinkSubHeader from 'components/Dashboard/Creator/Links/Header'
import UpdateCreatorLinkProvider from '@/client/UpdateCreatorLinkProvider'

import Basic from 'components/Dashboard/Creator/Links/Screens/Basic'
import Stats from 'components/Dashboard/Creator/Links/Screens/Stats'
import Workflows from 'components/Dashboard/Creator/Links/Screens/Workflows'
import Deliverables from 'components/Dashboard/Creator/Links/Screens/Deliverables'
import Discounts from 'components/Dashboard/Creator/Links/Screens/Discounts'
import Orders from 'components/Dashboard/Creator/Links/Screens/Orders'
import Access from 'components/Dashboard/Creator/Links/Screens/Access'
import Customize from 'components/Dashboard/Creator/Links/Screens/Customize'
import Advanced from 'components/Dashboard/Creator/Links/Screens/Advanced'

const screens = [
  {
    name: 'Basic',
    path: '',
    Component: Basic,
    current: false,
    onLinkTypes: ['*'],
  },
  {
    name: 'Stats',
    path: 'stats',
    Component: Stats,
    current: false,
    onLinkTypes: ['*'],
  },
  {
    name: 'Workflows',
    path: 'workflows',
    Component: Workflows,
    current: false,
    onLinkTypes: ['*'],
  },
  {
    name: 'Deliverables',
    path: 'deliverables',
    Component: Deliverables,
    current: false,
    onLinkTypes: ['asset'],
  },
  {
    name: 'Discounts & Vouchers',
    path: 'deliverables',
    Component: Discounts,
    current: false,
    onLinkTypes: ['asset'],
  },
  {
    name: 'Orders',
    path: 'orders',
    Component: Orders,
    current: false,
    onLinkTypes: ['asset'],
  },
  {
    name: 'Access',
    path: 'access',
    Component: Access,
    current: false,
    onLinkTypes: ['*'],
  },
  {
    name: 'Customize',
    path: 'customize',
    Component: Customize,
    current: false,
    onLinkTypes: ['embed', 'asset'],
  },
  {
    name: 'Advanced',
    path: 'advanced',
    Component: Advanced,
    current: false,
    onLinkTypes: ['embed', 'asset'],
  },
]

export default function CreatorDashboardLinkScreen() {
  const router = useRouter()
  const { link, creator, asset, isLink, isLoading } = useCreatorSpace()

  const [screenPath] = (router.query.screens as string[]) || ['']
  const CurrentScreen = useMemo(
    () => screens.find(({ path }) => path === screenPath),
    [screenPath]
  )

  const linkType = link.data?.linkType
  const filteredScreens = useMemo(
    () =>
      screens
        .filter(({ onLinkTypes }) => {
          if (onLinkTypes.includes('*')) {
            return true
          }

          if (onLinkTypes.includes(linkType)) {
            return true
          }

          return false
        })
        .map((item) => ({
          ...item,
          current: CurrentScreen.name === item.name,
        })),
    [screenPath, linkType, CurrentScreen]
  )

  if (isLoading) {
    return (
      <DashboardShell>
        <main tw="py-6 lg:col-span-9 xl:col-span-10">
          <GmailLoader />
        </main>
      </DashboardShell>
    )
  }
  return (
    <UpdateCreatorLinkProvider link={link} creator={creator} asset={asset}>
      <DashboardShell
        subHeader={
          <CreatorDashboardLinkSubHeader link={link} isLink={isLink} />
        }
      >
        <div tw="py-6">
          <div tw="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
            <div tw="hidden lg:block lg:col-span-3 xl:col-span-2">
              <nav
                aria-label="Sidebar"
                tw="sticky top-6 divide-y divide-gray-300"
              >
                <CreatorDashboardLinkSidebar
                  screens={filteredScreens}
                  linkId={link.data.id}
                />
              </nav>
            </div>
            <main tw="lg:col-span-9 xl:col-span-10">
              <CurrentScreen.Component link={link} />
            </main>
          </div>
        </div>
      </DashboardShell>
    </UpdateCreatorLinkProvider>
  )
}

export const getServerSideProps = getServerSidePropsForCreatorDashboardPages()
