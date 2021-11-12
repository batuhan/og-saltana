/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition, Popover, Listbox } from '@headlessui/react'
import { ClockIcon, HomeIcon, MenuAlt1Icon, ViewListIcon, XIcon, BellIcon, MenuIcon, TrendingUpIcon, LinkIcon, CashIcon, ShareIcon, SwitchHorizontalIcon, AdjustmentsIcon } from '@heroicons/react/outline'
import { ChevronRightIcon, DotsVerticalIcon, SearchIcon, SelectorIcon } from '@heroicons/react/solid'
import Avatar from "boring-avatars";

import { Logo } from 'components/Logo'
// import Avatar from 'components/Avatar'
import {
  DefaultLink,
  CreatorDashboardLink,
  UserDashboardLink,
} from 'components/Links'
import { useRouter } from 'next/router'
import { useClerk } from "@clerk/clerk-react";
import useCurrentUser from 'hooks/useCurrentUser'
import { Disclosure } from '@headlessui/react'
import { SignIn, SignedOut, UserButton, SignedIn } from "@clerk/nextjs";

import { PlusSmIcon } from '@heroicons/react/solid'
import classNames from '@/common/classnames'
import linkTypes from '@/common/link-types'
const creatorNavigation = [
  {
    name: 'Links',
    href: '/links',
    current: false,
    icon: LinkIcon
  },
  {
    name: 'Assets',
    href: '/assets',
    current: false,
    icon: CashIcon
  },
  {
    name: 'Orders',
    href: '/assets/orders',
    current: false,
    icon: CashIcon
  },
  {
    name: 'Analytics',
    href: '/analytics',
    current: false,
    icon: TrendingUpIcon
  },
  {
    name: 'Workflows & Integrations',
    href: '/workflows',
    current: false,
    icon: SwitchHorizontalIcon
  },
  {
    name: 'Customize',
    href: '/customize',
    current: false,
    icon: AdjustmentsIcon
  },
]


const userNavigation = [
  { name: 'Purchased Assets', href: '/assets', current: false },
  { name: 'Wallet', href: '/payments', current: false },
  { name: 'Security', href: '/settings/security', current: false },
  { name: 'Settings', href: '/settings', current: false },
  { name: 'Help', href: '/help', current: false },
  // { name: 'Logout', href: '/logout' }
]
export default function WrappedDashboardShell(props) {

  return (
    <SignedIn>
      <DashboardShell {...props} />
    </SignedIn>
  )
}
function DashboardShell({
  children,
  container = true,
  subHeader = null,
}) {
  const { signOut } = useClerk();

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const user = useCurrentUser()
  const router = useRouter()
  const isRegularUserPath = router.pathname.startsWith('/my/')
  const _userNavigation = userNavigation.map((item) => {
    return { ...item, current: router.pathname.endsWith(`my${item.href}`) }
  })
  const _creatorNavigation = creatorNavigation.map((item) => {
    return { ...item, current: isRegularUserPath ? false : router.pathname.endsWith(item.href) }
  })


  const name = user.firstname
    ? `${user.firstname} ${user.lastname} (${user.displayName})`
    : (user.displayName || 'testr')
  return (

    <div className="min-h-full">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">

                <DefaultLink passHref>
                  <a href="#" className=" w-auto">
                    <Logo h="8" fill="#00000" />
                  </a>
                </DefaultLink>
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2">
                  <div className="space-y-1">
                    {_creatorNavigation.map((item) => (
                      <CreatorDashboardLink key={item.name}
                        href={item.href} >
                        <a
                          href="#"
                          className={classNames(
                            item.current
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                            'group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          <item.icon
                            className={classNames(
                              item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                              'mr-3 flex-shrink-0 h-6 w-6'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a></CreatorDashboardLink>
                    ))}
                  </div>
                  <div className="mt-8">
                    <h3
                      className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                      id="mobile-myaccount-headline"
                    >
                      My Account
                    </h3>
                    <div className="mt-1 space-y-1" role="group" aria-labelledby="mobile-myaccount-headline">
                      {_userNavigation.map((item) => (
                        <UserDashboardLink
                          key={item.name}
                          href={item.href}

                        >
                          <a
                            href="#"
                            className="group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                          >
                            <span className="truncate">{item.name}</span>
                          </a></UserDashboardLink>
                      ))}
                      <a

                        onClick={() => signOut()}
                        href="#"
                        className="group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                      >
                        <span className="truncate">Logout</span>
                      </a>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:pt-5 lg:pb-4 lg:bg-gray-100">
        <div className="flex items-center flex-shrink-0 px-6">
          <DefaultLink passHref>
            <a href="#" className="h-8 w-auto"
            >
              <Logo h="8" fill="#00000" />
            </a>
          </DefaultLink>
        </div>
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="mt-6 h-0 flex-1 flex flex-col overflow-y-auto">
          {/* Creator spaces dropdown */}
          <Menu as="div" className="px-3 relative inline-block text-left">
            <div>
              <Menu.Button className="group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500">
                <span className="flex w-full justify-between items-center">
                  <span className="flex min-w-0 items-center justify-between space-x-3">

                    <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0">
                      <Avatar
                        size={40}
                        name={name}

                      /></div>
                    <span className="flex-1 flex flex-col min-w-0">
                      <span className="text-gray-900 text-sm font-medium truncate">{name}</span>
                      <span className="text-gray-500 text-sm truncate">@{user.username}</span>
                    </span>
                  </span>
                  <SelectorIcon
                    className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </span>
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
              <Menu.Items className="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        View profile
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Settings
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Notifications
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
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Get desktop app
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Support
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
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Logout
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          {/* Sidebar Search */}
          <div className="px-3 mt-5">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div
                className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                aria-hidden="true"
              >
                <SearchIcon className="mr-3 h-4 w-4 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                name="search"
                id="search"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search"
              />
            </div>
          </div>
          {/* Navigation */}
          <nav className="px-3 mt-6">
            <div className="space-y-1">
              {_creatorNavigation.map((item) => (
                <CreatorDashboardLink key={item.name}
                  href={item.href} passHref>
                  <a
                    className={classNames(
                      item.current ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a></CreatorDashboardLink>
              ))}
            </div>
            <div className="mt-8">
              {/* Secondary navigation */}
              <h3
                className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                id="desktop-myaccount-headline"
              >
                My Account
              </h3>
              <div className="mt-1 space-y-1" role="group" aria-labelledby="desktop-teams-headline">
                {_userNavigation.map((item) => (
                  <UserDashboardLink href={item.href} key={item.href} passHref>
                    <a
                      key={item.name}
                      className={classNames(
                        item.current ? 'bg-gray-200 text-gray-900' : 'text-gray-700  hover:text-gray-900 hover:bg-gray-50',
                        'group flex items-center px-3 py-2 text-sm font-medium  rounded-md '
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      <span className="truncate">{item.name}</span>
                    </a>
                  </UserDashboardLink>
                ))}
                <a
                  onClick={() => signOut()}
                  href="#"
                  className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50"
                >
                  <span className="truncate">Logout</span>
                </a>
              </div>
            </div>
          </nav>
          {/* User account dropdown */}

          <div className="flex-shrink-0 flex border-t border-gray-200 p-4 mt-5">
            <div className="flex items-center">
              <div>
                <UserButton />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Tom Cook</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main column */}
      <div className="lg:pl-64 flex flex-col">
        {/* Search header */}
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex-1 flex">
              <form className="w-full flex md:ml-0" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    id="search-field"
                    name="search-field"
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center">
              {/* Profile dropdown */}
              <Menu as="div" className="ml-3 relative">
                <div>
                  <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            View profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Notifications
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
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Get desktop app
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Support
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
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Logout
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        {container === true ? (
          <>
            {subHeader}
            <main className="flex-1">
              {children}
            </main>
          </>
        ) : (
          children
        )}

      </div>
    </div >
  )
}
