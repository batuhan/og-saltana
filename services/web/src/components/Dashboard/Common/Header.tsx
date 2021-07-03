import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import tw from 'twin.macro'
import {
  BellIcon,
  MenuIcon,
  XIcon,
} from '@heroicons/react/outline'
import { Logo } from 'components/Logo'
import Avatar from 'components/Avatar'
import { DefaultLink, CreatorDashboardLink, UserDashboardLink } from 'components/Links'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/client'
import useCurrentUser from 'hooks/useCurrentUser'
import Link from 'next/link'

const creatorNavigation = [
  { name: 'Dashboard', href: '/', current: true },
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
  { name: 'My Assets', href: '/assets' },
  { name: 'Payments', href: '/payments' },
  { name: 'Account Settings', href: '/settings' },
]

// md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center
export default function Header() {
  const user = useCurrentUser()
  const router = useRouter()
  const isRegularUserPath = router.pathname.startsWith('/my/')
  const navigation = isRegularUserPath ? userNavigation : creatorNavigation
  const NavigationLink = isRegularUserPath ? UserDashboardLink : CreatorDashboardLink
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

  const name = user.data.firstname
    ? `${user.data.firstname} ${user.data.lastname} (${user.data.displayName})`
    : user.data.displayName

  return (
    <Popover tw="py-5 ">
      {({ open }) => (
        <div tw="bg-black text-white">
          <div tw="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-5xl lg:px-8">
            <div tw="relative flex flex-wrap items-center justify-center lg:justify-between">
              {/* Logo */}
              <div tw="absolute left-0 py-5 flex-shrink-0 lg:static">
                <DefaultLink>
                  <a>
                    <span tw="sr-only">Saltana</span>
                    <Logo h="5" fill="#ffffff" />
                  </a>
                </DefaultLink>
              </div>
              {/* test */}
              {/* Left nav */}
              <div tw="hidden lg:flex lg:py-5">
                <nav tw="flex space-x-4">
                  {navigation.map((item) => (
                    <NavigationLink>
                      <a
                        css={[
                          tw`text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10`,
                          item.current ? tw`bg-gray-400` : tw`text-cyan-100`,
                        ]}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a></NavigationLink>
                  ))}
                </nav>
              </div>
              {/* dd */}
              {/* Right section on desktop */}
              <div tw="hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5">
                <div tw="ml-4 relative flex-shrink-0">
                  <Link href="/give-feedback">
                    <a
                      tw="text-sm font-medium text-white hover:underline "
                    >
                      Give Feedback
                    </a>
                  </Link>
                </div>
                <div tw="ml-4 relative flex-shrink-0">
                  {!user.data.roles.includes('provider') && (
                    <Link href="/request-invite">
                      <a
                        tw="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <span>Apply for a creator account</span>
                      </a>
                    </Link>
                  )}
                  {isRegularUserPath && user.data.roles.includes('provider') && (
                    <CreatorDashboardLink>
                      <a
                        tw="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <span>Creator Dashboard</span>
                      </a>
                    </CreatorDashboardLink>
                  )}
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
                                name={user.data.displayName}
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
                            <Menu.Item>
                              {({ active }) => (
                                <div tw="px-4 py-3 text-black">
                                  <p tw="text-sm">Signed in as</p>
                                  <p tw="text-sm font-medium  truncate">
                                    {name}
                                  </p>
                                </div>
                              )}
                            </Menu.Item>
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <UserDashboardLink href={item.href}>
                                    <a
                                      css={[
                                        tw`block px-4 py-2 text-sm text-gray-700`,
                                        active && 'bg-gray-100',
                                      ]}
                                    >
                                      {item.name}
                                    </a></UserDashboardLink>
                                )}
                              </Menu.Item>
                            ))}
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  onClick={() => signOut()}
                                  css={[
                                    tw`block px-4 py-2 text-sm text-gray-700`,
                                    active && 'bg-gray-100',
                                  ]}
                                >
                                  Logout
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
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
                        {miniNavigation.map((item) => (
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
                              name={user.data.displayName}
                              src={user.imageUrl}
                            />
                          </div>
                        </div>
                        <div tw="ml-3 min-w-0 flex-1">
                          <div tw="text-base font-medium text-gray-800 truncate">
                            {name}
                          </div>
                          <div tw="text-sm font-medium text-gray-500 truncate">
                            {user.data.email}
                          </div>
                        </div>
                        <button tw="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                          <span tw="sr-only">View notifications</span>
                          <BellIcon tw="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                      <div tw="mt-3 px-2 space-y-1">
                        {userNavigation.map((item) => (
                          <UserDashboardLink
                            key={item.name}
                            href={item.href}>
                            <a
                              tw="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                            >
                              {item.name}
                            </a>
                          </UserDashboardLink>
                        ))}
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition.Child>
            </div>
          </Transition.Root>
        </div>
      )}
    </Popover>
  )
}
