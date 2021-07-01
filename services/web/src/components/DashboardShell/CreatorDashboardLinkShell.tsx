import { useEffect } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import tw, { styled } from 'twin.macro'
import DashboardShell from './DashboardShell'
import CreatorDashboardLinkSidebar from './CreatorDashboardLinkSidebar'
import CreatorDashboardLinkSubHeader from './CreatorDashboardLinkSubHeader'
import Breadcrumb from './Breadcrumb'
import { useApi, useCurrentUser } from '../../modules/api'
import { useRouter } from 'next/router'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

export default function CreatorDashboardLinkShell({ children }) {
  const user = useCurrentUser()

  return (
    <DashboardShell subHeader={<CreatorDashboardLinkSubHeader />}>
      <div tw="py-6">
        <div tw="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div tw="hidden lg:block lg:col-span-3 xl:col-span-2">
            <nav
              aria-label="Sidebar"
              tw="sticky top-6 divide-y divide-gray-300"
            >
              <CreatorDashboardLinkSidebar />
            </nav>
          </div>
          <main tw="lg:col-span-9 xl:col-span-10">{children}</main>
        </div>
      </div>
    </DashboardShell>
  )
}
