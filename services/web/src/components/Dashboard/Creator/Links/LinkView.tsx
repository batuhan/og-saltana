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
import SaveButton from '../SaveButton'

import { Fragment, useEffect, useMemo, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/solid'
import classNames from '@/common/classnames'
import GmailLoader from 'components/Dashboard/Common/PlaceholderContent'
import CopiableExternalLink from 'components/CopiableExternalLink'
const screens = {
  CheckoutBasic: {
    Component: CheckoutBasic,
    name: 'Basic',
    onLinkTypes: ['checkout'],
    isOpen: true,
  },
  EmbedBasic: {
    Component: EmbedBasic,
    name: 'Basic',
    onLinkTypes: ['embed', 'redirect'],
    isOpen: true
  },
  Workflows: {
    Component: Workflows,
    name: 'Workflows',
    onLinkTypes: ['*'],
    isOpen: false
  },
  Access: {
    Component: Access,
    name: 'Access',
    path: 'access',
    onLinkTypes: ['embed', 'redirect'],
    isOpen: false
  },
  Customize: {
    Component: Customize,
    name: 'Customize',
    path: 'customize',
    onLinkTypes: ['embed', 'checkout'],
    isOpen: true
  },
}

function LinkViewPlaceholder() {
  return <GmailLoader />
}

/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'


export default function LinkView({ linkId }) {
  const link = useApi('links', 'read', linkId, {
    initialData: {},
    enabled: linkId && linkId.length > 0,
  })
  const { creator } = useCreatorSpace()
  const linkType = link.data?.linkType



  const [dropdownOpen, setDropDownOpen] = useState(false)
  const [filteredScreens, setFilteredScreens] = useState([])

  useEffect(() => {
    if (link.isFetched) {
      setFilteredScreens(Object.keys(screens).filter((screenKey) => {
        const { onLinkTypes } = screens[screenKey]
        if (onLinkTypes.includes('*')) {
          return true
        }

        if (onLinkTypes.includes(linkType)) {
          return true
        }

        return false
      }))
    }
  }, [link.isFetched, linkType, linkId])

  return link.isFetched ? (
    <UpdateCreatorLinkProvider
      link={link}
      creator={creator}
      className="w-full h-full"
    >
      <NextSeo title={`/${link.data.slug} - Links`} />


      <article>
        <div className="mx-auto">
          <div className="block flex-1">
            <div className="pb-5 border-b border-gray-200">
              <div className="sm:flex sm:justify-between sm:items-baseline">
                <div className="sm:w-0 sm:flex-1">

                  <p className="mt-1 text-sm text-gray-500 overflow-hidden overflow-ellipsis">
                    <CopiableExternalLink
                      href={`https://${creator.data.username}.saltana.com/${link.data.slug}`}
                    />
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
        <dl className="mt-6 space-y-6 divide-y divide-gray-200">
          {filteredScreens.map((screenKey) => {
            const { Component, isOpen, name } = screens[screenKey]

            if (name === 'Basic') {
              return <Component linkId={linkId} key={`${linkId}-${screenKey}`} />
            }

            return (<Disclosure as="div" key={`${linkId}-${screenKey}`} className="pt-6" defaultOpen={isOpen || false}>
              {({ open }) => (
                <>
                  <dt className="text-lg">
                    <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                      <span className="font-medium text-gray-900">{name}</span>
                      <span className="ml-6 h-7 flex items-center">
                        <ChevronDownIcon
                          className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                          aria-hidden="true"
                        />
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                    <Component linkId={linkId} />
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>)
          })}
        </dl>


      </article >
      <div className="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
        <div className="space-x-3 flex justify-end">
          <SaveButton />
        </div>
      </div>
    </UpdateCreatorLinkProvider >
  ) : (
    <LinkViewPlaceholder />
  )
}
