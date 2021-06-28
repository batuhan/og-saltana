import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import tw, { styled } from 'twin.macro'
import {
  AcademicCapIcon,
  BadgeCheckIcon,
  BellIcon,
  CashIcon,
  ClockIcon,
  MenuIcon,
  ReceiptRefundIcon,
  UsersIcon,
  XIcon,
  PlusIcon,
  SearchIcon,
} from '@heroicons/react/outline'
import { Logo } from '../Logo'
import { Avatar } from '@chakra-ui/react'

import { signOut, useSession } from 'next-auth/client'
import { useCurrentUser } from '../../modules/api'

const user = {
  name: 'Chelsea Hagon',
  email: 'chelseahagon@example.com',
  role: 'Human Resources Manager',
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Dashboard', href: '/dashboard', creatorScoped: true, current: true },
  {
    name: 'Links',
    href: '/dashboard/links',
    creatorScoped: true,
    current: false,
  },
  {
    name: 'Products',
    href: '/dashboard/products',
    creatorScoped: true,
    current: false,
  },
  {
    name: 'Analytics',
    href: '/dashboard/analytics',
    creatorScoped: true,
    current: false,
  },
  {
    name: 'Workflows',
    href: '/dashboard/workflows',
    creatorScoped: true,
    current: false,
  },
  {
    name: 'Payouts',
    href: '/dashboard/payouts',
    creatorScoped: true,
    current: false,
  },
  {
    name: 'Customize',
    href: '/dashboard/customize',
    creatorScoped: true,
    current: false,
  },
]

const userNavigation = [
  { name: 'My Purchases', href: '/my/purchases' },
  { name: 'Account Settings', href: '/my/settings' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Header() {
  const user = useCurrentUser()

  return (
    <Popover tw="pb-24 pt-3">
      {({ open }) => (
        <>
          <div tw="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div tw="relative flex flex-wrap items-center justify-center lg:justify-between">
              {/* Logo */}
              <div tw="absolute left-0 py-5 flex-shrink-0 lg:static">
                <a href="#">
                  <span tw="sr-only">Saltana</span>
                  <Logo h="5" fill="#ffffff" />
                </a>
              </div>

              {/* Right section on desktop */}
              <div tw="hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5">
                <div tw="ml-4 relative flex-shrink-0">
                  <a
                    href="#"
                    tw="text-sm font-medium text-white hover:underline "
                  >
                    Give Feedback
                  </a>
                </div>
                <div tw="ml-4 relative flex-shrink-0">
                  <button
                    type="button"
                    tw="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <PlusIcon tw="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    <span>New Job</span>
                  </button>
                </div>
                {/* Profile dropdown */}
                <div tw="ml-4 relative flex-shrink-0">
                  <Menu>
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button tw="rounded-full flex text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
                            <span tw="sr-only">Open user menu</span>

                            <div tw="h-8 w-8 rounded-full">
                              <Avatar
                                size="sm"
                                name={user.name}
                                src={user.imageUrl}
                              />
                            </div>
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            tw="origin-top-right z-40 absolute -right-2 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    tw="block px-4 py-2 text-sm text-gray-700"
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
              </div>

              <div tw="w-full py-5 lg:border-t lg:border-white lg:border-opacity-20">
                <div tw="lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center">
                  {/* Left nav */}
                  <div tw="hidden lg:block lg:col-span-2">
                    <nav tw="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          tw="text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10"
                          className={classNames(
                            item.current ? 'text-white' : 'text-cyan-100',
                            'text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                  <div tw="px-12 lg:px-0">{/* Search */}</div>
                </div>
              </div>

              {/* Menu button */}
              <div tw="absolute right-0 flex-shrink-0 lg:hidden">
                {/* Mobile menu button */}
                <Popover.Button tw="bg-transparent p-2 rounded-md inline-flex items-center justify-center text-cyan-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white">
                  <span tw="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon tw="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon tw="block h-6 w-6" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>
            </div>
          </div>

          <Transition.Root show={open} as={Fragment}>
            <div tw="lg:hidden">
              <Transition.Child
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Overlay
                  static
                  tw="z-20 fixed inset-0 bg-black bg-opacity-25"
                />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  static
                  tw="z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top"
                >
                  <div tw="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
                    <div tw="pt-3 pb-2">
                      <div tw="flex items-center justify-between px-4">
                        <div>
                          <Logo tw="h-8 w-auto" h="3" />
                        </div>
                        <div tw="-mr-2">
                          <Popover.Button tw="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500">
                            <span tw="sr-only">Close menu</span>
                            <XIcon tw="h-6 w-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                      <div tw="mt-3 px-2 space-y-1">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            tw="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div tw="pt-4 pb-2">
                      <div tw="flex items-center px-5">
                        <div tw="flex-shrink-0">
                          <div tw="h-10 w-10 rounded-full">
                            <Avatar
                              size="md"
                              name={user.name}
                              src={user.imageUrl}
                            />
                          </div>
                        </div>
                        <div tw="ml-3 min-w-0 flex-1">
                          <div tw="text-base font-medium text-gray-800 truncate">
                            {user.name}
                          </div>
                          <div tw="text-sm font-medium text-gray-500 truncate">
                            {user.email}
                          </div>
                        </div>
                        <button tw="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                          <span tw="sr-only">View notifications</span>
                          <BellIcon tw="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                      <div tw="mt-3 px-2 space-y-1">
                        {userNavigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            tw="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition.Child>
            </div>
          </Transition.Root>
        </>
      )}
    </Popover>
  )
}
