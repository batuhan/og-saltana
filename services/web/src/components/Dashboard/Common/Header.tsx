import { Fragment, useState } from 'react'
import { Menu, Popover, Transition, Listbox } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { Logo } from 'components/Logo'
import Avatar from 'components/Avatar'
import {
  DefaultLink,
  CreatorDashboardLink,
  UserDashboardLink,
} from 'components/Links'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/client'
import useCurrentUser from 'hooks/useCurrentUser'
import { Disclosure } from '@headlessui/react'

import { PlusSmIcon } from '@heroicons/react/solid'
import classNames from '@/common/classnames'
import linkTypes from '@/common/link-types'

const creatorNavigation = [
  {
    name: 'Links',
    href: '/links',
    current: false,
  },
  {
    name: 'Assets',
    href: '/assets',
    current: false,
  },
  {
    name: 'Analytics',
    href: '/analytics',
    current: false,
  },
  {
    name: 'Customize',
    href: '/customize',
    current: false,
  },
]

const userNavigation = [
  { name: 'Assets', href: '/assets' },
  { name: 'Payments', href: '/payments' },
  { name: 'Account Settings', href: '/settings' },
]

/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid'

function CreatorAddNewButton() {
  const {
    push,
    query: { creator },
  } = useRouter()
  return (
    <Listbox
      onChange={(type) => {
        push(`/dashboard/${creator}/links/create/${type}`)
      }}
    >
      <Listbox.Label className="sr-only">Create a new link</Listbox.Label>
      <div className="relative">
        <div className="inline-flex shadow-sm rounded-md divide-x divide-indigo-600">
          <div className="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-indigo-600">
            <div className="relative inline-flex items-center bg-indigo-500 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white">
              <p className="ml-2.5 text-sm font-medium">Create...</p>
            </div>
            <Listbox.Button className="relative inline-flex items-center bg-indigo-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
              <span className="sr-only">Create a new link</span>
              <PlusSmIcon className="h-5 w-5 text-white" aria-hidden="true" />
            </Listbox.Button>
          </div>
        </div>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="origin-top-right absolute z-10 right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none">
            {linkTypes.map((type) => (
              <Listbox.Option
                key={type.type}
                className={({ active }) =>
                  classNames(
                    active ? 'text-white bg-indigo-500' : 'text-gray-900',
                    'cursor-default select-none relative p-4 text-sm',
                  )
                }
                value={type.type}
              >
                {({ selected, active }) => (
                  <div className="flex flex-col">
                    <div className="flex justify-between">
                      <p className={selected ? 'font-semibold' : 'font-normal'}>
                        {type.name}
                      </p>
                      {selected ? (
                        <span
                          className={active ? 'text-white' : 'text-indigo-500'}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </div>
                    <p
                      className={classNames(
                        active ? 'text-indigo-200' : 'text-gray-500',
                        'mt-2',
                      )}
                    >
                      {type.description}
                    </p>
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

// md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center
export default function Header() {
  const user = useCurrentUser()
  const router = useRouter()
  const isRegularUserPath = router.pathname.startsWith('/my/')
  const navigation = (
    isRegularUserPath ? userNavigation : creatorNavigation
  ).map((item) => {
    return { ...item, current: router.pathname.includes(item.href) }
  })
  const NavigationLink = isRegularUserPath
    ? UserDashboardLink
    : CreatorDashboardLink
  const isCreator = user.data.roles.includes('provider')
  const miniNavigation = isCreator
    ? creatorNavigation
    : [
        {
          name: 'Apply for a creator account',
          href: '/request-invite',
          creatorScoped: false,
          current: true,
        },
      ]
  const MiniNavigationLink = isCreator
    ? CreatorDashboardLink
    : UserDashboardLink

  const name = user.data.firstname
    ? `${user.data.firstname} ${user.data.lastname} (${user.data.displayName})`
    : user.data.displayName

  return (
    <>
      <Disclosure as="nav" className="bg-black shadow">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="-ml-2 mr-2 flex items-center md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex-shrink-0 flex items-center">
                    <DefaultLink passHref>
                      <a href="#">
                        <Logo h="5" fill="#ffffff" />
                      </a>
                    </DefaultLink>
                  </div>
                  <div className="hidden md:ml-6 md:flex md:space-x-8">
                    {/* Current: "border-white text-white", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                    {navigation.map((item) => (
                      <NavigationLink href={item.href} key={item.name} passHref>
                        <a
                          href="#"
                          className={
                            item.current
                              ? 'border-white text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                          }
                        >
                          {item.name}
                        </a>
                      </NavigationLink>
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CreatorAddNewButton />
                  </div>
                  <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                    <button
                      type="button"
                      className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.data.imageUrl}
                            alt={user.data.displayName}
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <UserDashboardLink href={item.href} passHref>
                                  <a
                                    href="#"
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700',
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                </UserDashboardLink>
                              )}
                            </Menu.Item>
                          ))}
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                onClick={() => signOut()}
                                href="#"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700',
                                )}
                              >
                                Logout
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="pt-2 pb-3 space-y-1">
                {/* Current: "bg-indigo-50 border-white text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                {navigation.map((item) => (
                  <NavigationLink key={item.name} {...item} passHref>
                    <a
                      href="#"
                      className={
                        item.current
                          ? 'bg-indigo-50 border-white text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6'
                          : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6'
                      }
                    >
                      {item.name}
                    </a>
                  </NavigationLink>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4 sm:px-6">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user.data.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1">
                  {userNavigation.map((item) => (
                    <UserDashboardLink
                      key={item.name}
                      href={item.href}
                      passHref
                    >
                      <a
                        href="#"
                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
                      >
                        {item.name}
                      </a>
                    </UserDashboardLink>
                  ))}

                  <a
                    onClick={() => signOut()}
                    href="#"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
                  >
                    Logout
                  </a>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  )
}
