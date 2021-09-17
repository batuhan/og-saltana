import useCreatorSpace from 'hooks/useCreatorSpace'
import _ from 'lodash'

import GmailLoader from 'components/Dashboard/Common/PlaceholderContent'
import UpdateCreatorAssetProvider from '@/client/UpdateCreatorAssetProvider'

import Basic from 'components/Dashboard/Creator/Assets/Screens/Basic'
import Workflows from 'components/Dashboard/Creator/Assets/Screens/Workflows'
import Deliverables from 'components/Dashboard/Creator/Assets/Screens/Deliverables'
import Discounts from 'components/Dashboard/Creator/Assets/Screens/Discounts'
import Customize from 'components/Dashboard/Creator/Assets/Screens/Customize'
import { NextSeo } from 'next-seo'

import { Tab } from '@headlessui/react'
import {
  CogIcon,
  UserCircleIcon,
  ViewGridAddIcon,
} from '@heroicons/react/outline'
import useApi from 'hooks/useApi'
import classNames from '@/common/classnames'
import { useState } from 'react'
import useAsset from 'hooks/useAsset'

const secondaryNavigation = [
  { name: 'Website redesign', href: '#' },
  { name: 'GraphQL API', href: '#' },
  { name: 'Customer migration guides', href: '#' },
  { name: 'Profit sharing program', href: '#' },
]

const screens = [
  {
    name: 'Basic',
    Component: Basic,
    icon: UserCircleIcon,
  },
  {
    name: 'Deliverables',
    Component: Deliverables,
    icon: CogIcon,
  },
  {
    name: 'Discounts & Vouchers',
    Component: Discounts,
    icon: ViewGridAddIcon,
  },
  {
    name: 'Integrations',
    Component: Workflows,
    icon: ViewGridAddIcon,
  },
  {
    name: 'Workflows',
    Component: Workflows,
    icon: ViewGridAddIcon,
  },
  {
    name: 'Customize',
    Component: Customize,
    icon: ViewGridAddIcon,
  },
]

export default function CreatorDashboardAssetScreen({ assetId }) {
  const { creator, isLoading } = useCreatorSpace()
  const asset = useAsset(assetId)

  const [selectedScreen, setSelectedScreen] = useState(0)

  const selectedScreenName = screens[selectedScreen].name

  if (isLoading) {
    return (
      <main className="py-6 lg:col-span-9 xl:col-span-10">
        <NextSeo title={`${selectedScreenName} - Loading - Assets`} />

        <GmailLoader />
      </main>
    )
  }
  return (
    <UpdateCreatorAssetProvider creator={creator} asset={asset}>
      <NextSeo title={`${selectedScreenName} - ${asset.data.name} - Assets`} />

      <main className="mx-auto  ">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5 space-y-6 ">
          <Tab.Group
            onChange={(index) => {
              setSelectedScreen(index)
              console.log('Changed selected tab to:', index)
            }}
          >
            <aside className="py-10 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3 ">
              <nav className="space-y-5 pt-5">
                <Tab.List>
                  {screens.map((item) => (
                    <Tab
                      key={item.name}
                      className={({ selected }) =>
                        `group rounded-md px-3 py-2 flex items-center text-sm font-medium ${
                          selected
                            ? 'bg-gray-50 text-orange-600 hover:bg-white'
                            : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50'
                        }`
                      }
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? 'text-orange-500'
                            : 'text-gray-400 group-hover:text-gray-500',
                          'flex-shrink-0 -ml-1 mr-3 h-6 w-6',
                        )}
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.name}</span>
                    </Tab>
                  ))}
                </Tab.List>
              </nav>
              <div className="mt-8">
                <h3
                  className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  id="projects-headline"
                >
                  Links
                </h3>
                <div
                  className="mt-1 space-y-1"
                  aria-labelledby="projects-headline"
                >
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
            </aside>
            <Tab.Panels className="space-y-6  sm:px-6 lg:px-0 lg:col-span-9">
              {screens.map(({ name, Component }) => (
                <Tab.Panel key={name}>
                  <Component asset={asset} />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>
    </UpdateCreatorAssetProvider>
  )
}
