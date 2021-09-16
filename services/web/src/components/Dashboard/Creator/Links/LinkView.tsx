import useApi from 'hooks/useApi'
import useCreatorSpace from 'hooks/useCreatorSpace'
import UpdateCreatorLinkProvider from '@/client/UpdateCreatorLinkProvider'
import Access from './Screens/Access'
import EmbedBasic from './Screens/EmbedBasic'
import CheckoutBasic from './Screens/CheckoutBasic'
import Workflows from './Screens/Workflows'
import Overview from './Screens/Overview'
import { Tab } from '@headlessui/react'
import Customize from './Screens/Customize'
import { NextSeo } from 'next-seo'

import { Fragment, useMemo, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/solid'
import classNames from '@/common/classnames'
import GmailLoader from 'components/Dashboard/Common/PlaceholderContent'

const screens = {
  Overview: {
    Component: Overview,

    name: 'Overview',

    onLinkTypes: ['*'],
  },
  CheckoutBasic: {
    Component: CheckoutBasic,

    name: 'Basic',

    onLinkTypes: ['asset'],
  },
  EmbedBasic: {
    Component: EmbedBasic,

    name: 'Basic',

    onLinkTypes: ['embed', 'redirect'],
  },
  Workflows: {
    Component: Workflows,

    name: 'Workflows',

    onLinkTypes: ['*'],
  },
  Access: {
    Component: Access,

    name: 'Access',
    path: 'access',

    onLinkTypes: ['embed', 'redirect'],
  },
  Customize: {
    Component: Customize,

    name: 'Customize',
    path: 'customize',

    onLinkTypes: ['embed', 'asset'],
  },
}

function LinkViewPlaceholder() {
  return <GmailLoader />
}
export default function LinkView({ linkId }) {
  const link = useApi('links', 'read', linkId, {
    initialData: {},
    enabled: linkId && linkId.length > 0,
  })
  const { creator, asset, isLink, isLoading } = useCreatorSpace()
  const linkType = link.data?.linkType
  const filteredScreens = useMemo(
    () =>
      Object.keys(screens).filter((screenKey) => {
        const { onLinkTypes } = screens[screenKey]
        if (onLinkTypes.includes('*')) {
          return true
        }

        if (onLinkTypes.includes(linkType)) {
          return true
        }

        return false
      }),
    [linkType],
  )
  const [dropdownOpen, setDropDownOpen] = useState(false)

  const [selectedScreenKey, setSelectedScreenKey] = useState('Overview')
  const SelectedScreen = screens[selectedScreenKey]

  return link.isFetched ? (
    <UpdateCreatorLinkProvider
      link={link}
      creator={creator}
      asset={asset}
      className="w-full h-full"
    >
      <NextSeo title={`${SelectedScreen.name} - /${link.data.slug} - Links`} />

      <article>
        {/* Profile header */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="block  mt-6 min-w-0 flex-1">
            <div className="pb-5 border-b border-gray-200">
              <div className="sm:flex sm:justify-between sm:items-baseline">
                <div className="sm:w-0 sm:flex-1">
                  <h1
                    id="message-heading"
                    className="text-xl font-bold text-gray-900 truncate"
                  >
                    /{link.data.slug}
                  </h1>
                  <p className="mt-1 text-sm text-gray-500 overflow-hidden overflow-ellipsis">
                    https://{creator.data.username}.saltana.com/
                    {link.data.slug}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:justify-start">
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Open
                  </span>
                  <Menu
                    as="div"
                    className="ml-3 relative inline-block text-left"
                  >
                    <div>
                      <Menu.Button
                        onClick={() => setDropDownOpen(!dropdownOpen)}
                        className="-my-2 p-2 rounded-full bg-white flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <span className="sr-only">Open options</span>
                        <DotsVerticalIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      show={dropdownOpen}
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'flex justify-between px-4 py-2 text-sm',
                                )}
                              >
                                <span>Edit</span>
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
                                  'flex justify-between px-4 py-2 text-sm',
                                )}
                              >
                                <span>Duplicate</span>
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                type="button"
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'w-full flex justify-between px-4 py-2 text-sm',
                                )}
                              >
                                <span>Archive</span>
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Tab.Group
          onChange={(index) => {
            setSelectedScreenKey(filteredScreens[index])
            console.log(
              'Changed selected tab to:',
              index,
              filteredScreens[index],
            )
          }}
        >
          <div className="mt-6 sm:mt-2 2xl:mt-5">
            <div className="border-b border-gray-200">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  <Tab.List>
                    {filteredScreens.map((screenKey) => (
                      <Tab
                        key={screenKey}
                        className={({ selected }) => `
                        ${
                          selected
                            ? 'border-pink-500 text-gray-900'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }
                          whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                        `}
                      >
                        {screens[screenKey].name}
                      </Tab>
                    ))}
                  </Tab.List>
                </nav>
              </div>
            </div>
          </div>

          <Tab.Panels>
            {filteredScreens.map((key, index) => {
              return (
                <Tab.Panel
                  key={key}
                  className="mt-6 min-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
                >
                  <SelectedScreen.Component />
                </Tab.Panel>
              )
            })}
          </Tab.Panels>
        </Tab.Group>
      </article>
    </UpdateCreatorLinkProvider>
  ) : (
    <LinkViewPlaceholder />
  )
}
