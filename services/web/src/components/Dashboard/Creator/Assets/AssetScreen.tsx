import 'twin.macro'

import { HomeIcon, PlusIcon, SearchIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { useForm, useFormContext } from 'react-hook-form'
import getServerSidePropsForCreatorDashboardPages from '@/server/getServerSidePropsForCreatorDashboardPages'
import useApiMutation from 'hooks/useApiMutation'
import useCurrentUser from 'hooks/useCurrentUser'
import React, { Suspense, useMemo } from 'react'
import useCreatorSpace from 'hooks/useCreatorSpace'
import CreatorSlugField from 'components/Dashboard/Common/Inputs/CreatorPageSlug'
import _ from 'lodash'

import GmailLoader from 'components/Dashboard/Common/PlaceholderContent'
import DashboardShell from 'components/Dashboard/Common/Shell'
import CreatorDashboardAssetSidebar from 'components/Dashboard/Creator/Assets/Sidebar'
import CreatorDashboardAssetSubHeader from 'components/Dashboard/Creator/Assets/Header'
import UpdateCreatorAssetProvider from '@/client/UpdateCreatorAssetProvider'

import Basic from 'components/Dashboard/Creator/Assets/Screens/Basic'
import Stats from 'components/Dashboard/Creator/Assets/Screens/Stats'
import Workflows from 'components/Dashboard/Creator/Assets/Screens/Workflows'
import Deliverables from 'components/Dashboard/Creator/Assets/Screens/Deliverables'
import Discounts from 'components/Dashboard/Creator/Assets/Screens/Discounts'
import Orders from 'components/Dashboard/Creator/Assets/Screens/Orders'
import Access from 'components/Dashboard/Creator/Assets/Screens/Access'
import Customize from 'components/Dashboard/Creator/Assets/Screens/Customize'
import Advanced from 'components/Dashboard/Creator/Assets/Screens/Advanced'

const screens = [
  {
    name: 'Basic',
    path: '',
    Component: Basic,
    current: false,
  },
  {
    name: 'Deliverables',
    path: 'deliverables',
    Component: Deliverables,
    current: false,
  },
  {
    name: 'Workflows',
    path: 'workflows',
    Component: Workflows,
    current: false,
  },
  {
    name: 'Discounts & Vouchers',
    path: 'deliverables',
    Component: Discounts,
    current: false,
  },
  {
    name: 'Customize',
    path: 'customize',
    Component: Customize,
    current: false,
  },
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  const colors = require('tailwindcss/colors')
  
  module.exports = {
    // ...
    theme: {
      extend: {
        colors: {
          orange: colors.orange,
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react'
import {
  Disclosure,
  Menu,
  RadioGroup,
  Switch,
  Tab,
  Transition,
} from '@headlessui/react'
import { QuestionMarkCircleIcon } from '@heroicons/react/solid'
import {
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  MenuIcon,
  UserCircleIcon,
  ViewGridAddIcon,
  XIcon,
} from '@heroicons/react/outline'
import useApi from 'hooks/useApi'

const user = {
  name: 'Lisa Marie',
  email: 'lisamarie@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80',
}
const secondaryNavigation = [
  { name: 'Website redesign', href: '#' },
  { name: 'GraphQL API', href: '#' },
  { name: 'Customer migration guides', href: '#' },
  { name: 'Profit sharing program', href: '#' },
]

const navigation = [
  { name: 'Dashboard', href: '#' },
  { name: 'Jobs', href: '#' },
  { name: 'Applicants', href: '#' },
  { name: 'Company', href: '#' },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]
const subNavigation = [
  { name: 'Basic', href: '#', icon: UserCircleIcon, current: false },
  { name: 'Deliverables', href: '#', icon: CogIcon, current: false },
  {
    name: 'Discounts & Vouchers',
    href: '#',
    icon: ViewGridAddIcon,
    current: false,
  },
  { name: 'Integrations', href: '#', icon: ViewGridAddIcon, current: false },
  { name: 'Workflows', href: '#', icon: ViewGridAddIcon, current: false },
  { name: 'Customize', href: '#', icon: ViewGridAddIcon, current: false },
]
const plans = [
  {
    name: 'Startup',
    priceMonthly: 29,
    priceYearly: 290,
    limit: 'Up to 5 active job postings',
  },
  {
    name: 'Business',
    priceMonthly: 99,
    priceYearly: 990,
    limit: 'Up to 25 active job postings',
  },
  {
    name: 'Enterprise',
    priceMonthly: 249,
    priceYearly: 2490,
    limit: 'Unlimited active job postings',
  },
]
const payments = [
  {
    id: 1,
    date: '1/1/2020',
    datetime: '2020-01-01',
    description: 'Business Plan - Annual Billing',
    amount: 'CA$109.00',
    href: '#',
  },
  // More payments...
]

/** end */

export default function CreatorDashboardAssetScreen({ assetId }) {
  const { creator, isLoading } = useCreatorSpace()
  const asset = useApi('assets', 'read', assetId, {
    enabled: !!assetId,
  })
  const [selectedPlan, setSelectedPlan] = useState(plans[1])
  const [annualBillingEnabled, setAnnualBillingEnabled] = useState(true)

  if (isLoading) {
    return (
      <main className="py-6 lg:col-span-9 xl:col-span-10">
        <GmailLoader />
      </main>
    )
  }
  return (
    <UpdateCreatorAssetProvider creator={creator} asset={asset}>
      <main className="mx-auto ">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          <Tab.Group
            onChange={(index) => {
              console.log('Changed selected tab to:', index)
            }}
          >
            <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
              <nav className="space-y-1">
                <Tab.List>
                  {subNavigation.map((item) => (
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
                  Projects
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
            <Tab.Panels className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
              {/* Payment details */}
              <Tab.Panel>
                <Basic asset={asset} />
              </Tab.Panel>
              <Tab.Panel>
                <Deliverables asset={asset} />
              </Tab.Panel>
              <Tab.Panel>
                {/* Billing history */}
                <section aria-labelledby="billing-history-heading">
                  <div className="bg-white pt-6 shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 sm:px-6">
                      <h2
                        id="billing-history-heading"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Billing history
                      </h2>
                    </div>
                    <div className="mt-6 flex flex-col">
                      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                          <div className="overflow-hidden border-t border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Date
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Description
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Amount
                                  </th>
                                  {/*
                                `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                              */}
                                  <th
                                    scope="col"
                                    className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    <span className="sr-only">
                                      View receipt
                                    </span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {payments.map((payment) => (
                                  <tr key={payment.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      <time dateTime={payment.datetime}>
                                        {payment.date}
                                      </time>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {payment.description}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {payment.amount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                      <a
                                        href={payment.href}
                                        className="text-orange-600 hover:text-orange-900"
                                      >
                                        View receipt
                                      </a>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>
    </UpdateCreatorAssetProvider>
  )
}
