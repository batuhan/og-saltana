import * as React from 'react'
import DashboardShell from 'components/Dashboard/Common/Shell'

import { NextSeo } from 'next-seo'
import {
  CalendarIcon,
  ChevronRightIcon,
  DotsVerticalIcon,
  DuplicateIcon,
  PencilAltIcon,
  TrashIcon,
  UserAddIcon,
} from '@heroicons/react/solid'
import getServerSidePropsForCreatorDashboardPages from '@/server/getServerSidePropsForCreatorDashboardPages'
import useApi from 'hooks/useApi'
import useCurrentUser from 'hooks/useCurrentUser'
import { CreatorDashboardOrdersLink } from 'components/Links'
import { uniq } from 'lodash'
export function Title() {
  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Orders
        </h2>
      </div>
    </div>
  )
}

const stats = [
  { name: 'Total Subscribers', stat: '71,897' },
  { name: 'Avg. Open Rate', stat: '58.16%' },
  { name: 'Avg. Click Rate', stat: '24.57%' },
]

function UserPublicName({ userId }) {
  const user = useApi('users', 'read', userId, {
    enabled: !!userId,
  })
  return <span> {user.data.displayName || user.data.username}</span>
}
function AssetName({ transactionId }) {
  const transaction = useApi('transactions', 'read', transactionId, {
    enabled: !!transactionId,
  })
  const asset = useApi('assets', 'read', transaction.data.assetId, {
    enabled: transaction.isSuccess,
  })
  return (
    <CreatorDashboardOrdersLink href={`/${transaction.data.assetId}`} passHref>
      <a href="#" className="truncate hover:text-gray-600">
        {asset.data.name}
      </a>
    </CreatorDashboardOrdersLink>
  )
}
export function Stats() {
  return (
    <div className="px-4 mt-6 sm:px-6 lg:px-8">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Last 30 days
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
          >
            <dt className="text-sm font-medium text-gray-500 truncate">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
function GetPayerFromOrderLines({ lines }) {
  const payerId = lines[0].payerId
  return <UserPublicName userId={payerId} />
}
function ListAssetsFromOrderLines({ lines }) {
  const uniqueTransactions = uniq(
    lines.map(({ transactionId }) => transactionId),
  )
  return uniqueTransactions.map((transactionId) => {
    return <AssetName transactionId={transactionId} />
  })
}
function List({ orders }) {
  return (
    <div className="relative h-screen flex overflow-hidden bg-white">
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          {/* Projects list (only on smallest breakpoint) */}
          <div className="mt-10 sm:hidden">
            <div className="px-4 sm:px-6">
              <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                Assets
              </h2>
            </div>
            <ul
              role="list"
              className="mt-3 border-t border-gray-200 divide-y divide-gray-100"
            >
              {orders.map(({ id, name, description, ownerId, createdDate }) => (
                <li key={id}>
                  <CreatorDashboardOrdersLink href={`/${id}`} passHref>
                    <a
                      href="#"
                      className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6"
                    >
                      <span className="flex items-center truncate space-x-3">
                        <span
                          className={classNames(
                            'w-2.5 h-2.5 flex-shrink-0 rounded-full',
                          )}
                          aria-hidden="true"
                        />
                        <span className="font-medium truncate text-sm leading-6">
                          {name}
                          <span className="truncate font-normal text-gray-500">
                            in {description}
                          </span>
                        </span>
                      </span>
                      <ChevronRightIcon
                        className="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </a>
                  </CreatorDashboardOrdersLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects table (small breakpoint and up) */}
          <div className="hidden mt-8 sm:block">
            <div className="align-middle inline-block min-w-full border-b border-gray-200">
              <table className="min-w-full">
                <thead>
                  <tr className="border-t border-gray-200">
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span className="lg:pl-2">ORDER</span>
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Buyers
                    </th>
                    <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last updated
                    </th>
                    <th className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" />
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {orders.map(
                    ({ id, name, description, lines, createdDate }) => (
                      <tr key={id}>
                        <td className="px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900">
                          <div className="flex items-center space-x-3 lg:pl-2">
                            <span>
                              <GetPayerFromOrderLines lines={lines} />{' '}
                              <span className="text-gray-500 font-normal">
                                bought{' '}
                                <ListAssetsFromOrderLines lines={lines} />
                              </span>
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-500 font-medium">
                          <div className="flex items-center space-x-2">dfs</div>
                        </td>
                        <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                          <time dateTime={createdDate}>{createdDate}</time>
                        </td>
                        <td className="pr-6">
                          <Menu
                            as="div"
                            className="relative flex justify-end items-center"
                          >
                            <Menu.Button className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                              <span className="sr-only">Open options</span>
                              <DotsVerticalIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </Menu.Button>
                            <Transition
                              as={React.Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="mx-3 origin-top-right absolute right-7 top-0 w-48 mt-1 rounded-md shadow-lg z-10 bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                                <div className="py-1">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        href="#"
                                        className={classNames(
                                          active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700',
                                          'group flex items-center px-4 py-2 text-sm',
                                        )}
                                      >
                                        <PencilAltIcon
                                          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                          aria-hidden="true"
                                        />
                                        Edit
                                      </a>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        href="#"
                                        className={classNames(
                                          active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700',
                                          'group flex items-center px-4 py-2 text-sm',
                                        )}
                                      >
                                        <DuplicateIcon
                                          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                          aria-hidden="true"
                                        />
                                        Duplicate
                                      </a>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        href="#"
                                        className={classNames(
                                          active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700',
                                          'group flex items-center px-4 py-2 text-sm',
                                        )}
                                      >
                                        <UserAddIcon
                                          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                          aria-hidden="true"
                                        />
                                        Share
                                      </a>
                                    )}
                                  </Menu.Item>
                                </div>
                                <div className="py-1">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        href="#"
                                        className={classNames(
                                          active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700',
                                          'group flex items-center px-4 py-2 text-sm',
                                        )}
                                      >
                                        <TrashIcon
                                          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                          aria-hidden="true"
                                        />
                                        Delete
                                      </a>
                                    )}
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

import { Fragment, useState } from 'react'
import {
  Dialog,
  Disclosure,
  Menu,
  Popover,
  Transition,
} from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import CreatorDashboardAssetsLayout from 'components/Dashboard/Creator/Assets/Layout'
import classNames from '@/common/classnames'

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
]
const filters = [
  {
    id: 'asset',
    name: 'Assets',
    options: [
      { value: 'new-arrivals', label: 'All New Arrivals', checked: false },
      { value: 'tees', label: 'Tees', checked: false },
      { value: 'objects', label: 'Objects', checked: true },
    ],
  },
  {
    id: 'type',
    name: 'Asset Type',
    options: [
      { value: 'new-arrivals', label: 'All New Arrivals', checked: false },
      { value: 'tees', label: 'Tees', checked: false },
      { value: 'objects', label: 'Objects', checked: true },
    ],
  },
  {
    id: 'category',
    name: 'Asset Category',
    options: [
      { value: 'new-arrivals', label: 'All New Arrivals', checked: false },
      { value: 'tees', label: 'Tees', checked: false },
      { value: 'objects', label: 'Objects', checked: true },
    ],
  },
  {
    id: 'color',
    name: 'Time range',
    options: [
      { value: 'white', label: 'last month', checked: false },
      { value: 'beige', label: 'last 6 months', checked: false },
      { value: 'blue', label: 'all', checked: false },
    ],
  },
  {
    id: 'sizes',
    name: 'Sizes',
    options: [
      { value: 's', label: 'S', checked: false },
      { value: 'm', label: 'M', checked: false },
      { value: 'l', label: 'L', checked: false },
    ],
  },
]
const activeFilters = [{ value: 'objects', label: 'Objects' }]

function OrderNew2() {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white">
      {/* Mobile filter dialog */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 sm:hidden"
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.name}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              <ChevronDownIcon
                                className={classNames(
                                  open ? '-rotate-180' : 'rotate-0',
                                  'h-5 w-5 transform',
                                )}
                                aria-hidden="true"
                              />
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <div className="max-w-7xl mx-auto pb-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Orders
        </h1>
        <p className="mt-4 max-w-xl text-sm text-gray-700">
          Our thoughtfully designed workspace objects are crafted in limited
          runs. Improve your productivity and organization with these sale items
          before we run out.
        </p>
      </div>

      {/* Filters */}
      <section aria-labelledby="filter-heading">
        <h2 id="filter-heading" className="sr-only">
          Filters
        </h2>

        <div className="relative z-10 bg-white border-b border-gray-200 pb-4">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between sm:px-6 lg:px-8">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-left absolute left-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <a
                            href={option.href}
                            className={classNames(
                              option.current
                                ? 'font-medium text-gray-900'
                                : 'text-gray-500',
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm',
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              type="button"
              className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
              onClick={() => setOpen(true)}
            >
              Filters
            </button>

            <div className="hidden sm:block">
              <div className="flow-root">
                <Popover.Group className="-mx-4 flex items-center divide-x divide-gray-200">
                  {filters.map((section, sectionIdx) => (
                    <Popover
                      key={section.name}
                      className="px-4 relative inline-block text-left"
                    >
                      <Popover.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        <span>{section.name}</span>
                        {sectionIdx === 0 ? (
                          <span className="ml-1.5 rounded py-0.5 px-1.5 bg-gray-200 text-xs font-semibold text-gray-700 tabular-nums">
                            1
                          </span>
                        ) : null}
                        <ChevronDownIcon
                          className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Popover.Panel className="origin-top-right absolute right-0 mt-2 bg-white rounded-md shadow-2xl p-4 ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <form className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </form>
                        </Popover.Panel>
                      </Transition>
                    </Popover>
                  ))}
                </Popover.Group>
              </div>
            </div>
          </div>
        </div>

        {/* Active filters */}
        <div className="bg-gray-100">
          <div className="max-w-7xl mx-auto py-3 px-4 sm:flex sm:items-center sm:px-6 lg:px-8">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Filters
              <span className="sr-only">, active</span>
            </h3>

            <div
              aria-hidden="true"
              className="hidden w-px h-5 bg-gray-300 sm:block sm:ml-4"
            />

            <div className="mt-2 sm:mt-0 sm:ml-4">
              <div className="-m-1 flex flex-wrap items-center">
                {activeFilters.map((activeFilter) => (
                  <span
                    key={activeFilter.value}
                    className="m-1 inline-flex rounded-full border border-gray-200 items-center py-1.5 pl-3 pr-2 text-sm font-medium bg-white text-gray-900"
                  >
                    <span>{activeFilter.label}</span>
                    <button
                      type="button"
                      className="flex-shrink-0 ml-1 h-4 w-4 p-1 rounded-full inline-flex text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                    >
                      <span className="sr-only">
                        Remove filter for {activeFilter.label}
                      </span>
                      <svg
                        className="h-2 w-2"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 8 8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeWidth="1.5"
                          d="M1 1l6 6m0-6L1 7"
                        />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export const CreatorDashboardOrders = () => {
  const user = useCurrentUser()
  const ordersQuery = useApi(
    'orders',
    'list',
    {
      receiverId: user.data?.id,
      nbResultsPerPage: 100,
    },
    { enabled: user.isLoggedIn },
  )
  return (
    <CreatorDashboardAssetsLayout>
      <NextSeo title="Orders" />
      <OrderNew2 />
      {ordersQuery.data ? (
        <List orders={ordersQuery.data} />
      ) : (
        'You have no orders yet'
      )}
    </CreatorDashboardAssetsLayout>
  )
}

export const getServerSideProps = getServerSidePropsForCreatorDashboardPages(
  async ({ session, instance, queryClient }) => {
    const query = {
      receiverId: session.user.id,
      nbResultsPerPage: 100,
    }
    const orders = await instance.orders.list(query)

    queryClient.setQueryData(['orders', 'list', query], orders)

    return {}
  },
)

export default CreatorDashboardOrders
