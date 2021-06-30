import { useEffect } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import tw, { styled } from 'twin.macro'
import DashboardShell from './DashboardShell'
import CreatorDashboardSettingsSidebar from './CreatorDashboardSettingsSidebar'
import Breadcrumb from './Breadcrumb'
import { useCurrentUser } from '../../modules/api'
import { useRouter } from 'next/router'

export default function CreatorDashboardSettingsShell({ children }) {
  const user = useCurrentUser()

  const router = useRouter()

  return (
    <DashboardShell>
      <Breadcrumb />
      <div tw="py-6">
        <div tw="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div tw="hidden lg:block lg:col-span-3 xl:col-span-2">
            <nav
              aria-label="Sidebar"
              tw="sticky top-6 divide-y divide-gray-300"
            >
              <CreatorDashboardSettingsSidebar />
            </nav>
          </div>
          <main tw="lg:col-span-9 xl:col-span-10">{children}</main>
        </div>
      </div>
    </DashboardShell>
  )
}
