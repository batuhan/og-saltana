import * as React from 'react'
import DashboardShell from 'components/Dashboard/Common/Shell'

import { NextSeo } from 'next-seo'
import { CalendarIcon, ChevronRightIcon } from '@heroicons/react/solid'
import getServerSidePropsForCreatorDashboardPages from '@/server/getServerSidePropsForCreatorDashboardPages'
import useApi from 'hooks/useApi'
import useCurrentUser from 'hooks/useCurrentUser'
import { CreatorDashboardAssetsLink } from 'components/Links'

import {
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from '@heroicons/react/outline'
import classNames from '@/common/classnames'

const navigation = [
  { name: 'Assets', href: '/', icon: HomeIcon, current: true },
  { name: 'Orders', href: '/orders', icon: UsersIcon, current: false },
  { name: 'Payouts', href: '/payouts', icon: FolderIcon, current: false },
  { name: 'Stats', href: '/stats', icon: CalendarIcon, current: false },
  { name: 'Workflows', href: '/workflows', icon: InboxIcon, current: false },
  { name: 'Customize', href: '#', icon: ChartBarIcon, current: false },
]
const secondaryNavigation = [
  { name: 'Website redesign', href: '#' },
  { name: 'GraphQL API', href: '#' },
  { name: 'Customer migration guides', href: '#' },
  { name: 'Profit sharing program', href: '#' },
]

function Sidebar() {
  return (
    <nav aria-label="Sidebar">
      <div className="space-y-1">
        {navigation.map((item) => (
          <CreatorDashboardAssetsLink key={item.name} href={item.href} passHref>
            <a
              href="#"
              className={classNames(
                item.current
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md',
              )}
              aria-current={item.current ? 'page' : undefined}
            >
              <item.icon
                className={classNames(
                  item.current
                    ? 'text-gray-500'
                    : 'text-gray-400 group-hover:text-gray-500',
                  'flex-shrink-0 -ml-1 mr-3 h-6 w-6',
                )}
                aria-hidden="true"
              />
              <span className="truncate">{item.name}</span>
            </a>
          </CreatorDashboardAssetsLink>
        ))}
      </div>
      <div className="mt-8">
        <h3
          className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
          id="projects-headline"
        >
          Projects
        </h3>
        <div className="mt-1 space-y-1" aria-labelledby="projects-headline">
          {secondaryNavigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
            >
              <span className="truncate">{item.name}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

export const CreatorDashboardAssetsLayout = ({ children }) => {
  return (
    <DashboardShell>
      <NextSeo title="Assets" />
      {children}
    </DashboardShell>
  )
}
export default CreatorDashboardAssetsLayout
