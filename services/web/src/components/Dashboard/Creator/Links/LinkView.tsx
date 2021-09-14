import useApi from 'hooks/useApi'
import useCreatorSpace from 'hooks/useCreatorSpace'
import UpdateCreatorLinkProvider from '@/client/UpdateCreatorLinkProvider'
import Discounts from './Screens/Discounts'
import Access from './Screens/Access'
import EmbedBasic from './Screens/EmbedBasic'
import CheckoutBasic from './Screens/CheckoutBasic'
import Workflows from './Screens/Workflows'
import { Tab } from '@headlessui/react'
import Customize from './Screens/Customize'

import { Fragment, useMemo } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/solid'

function Overview() {
  return (
    <>
      <div className="mt-8 max-w-5xl mx-auto pb-12  lg:px-8">
        <h2 className="text-sm font-medium text-gray-500">Linked</h2>
        <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {team.map((person) => (
            <div
              key={person.handle}
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500"
            >
              {/*<div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src={person.imageUrl}
                alt=""
              />
            </div>*/}
              <div className="flex-1 min-w-0">
                <a href="#" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">
                    {person.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {person.role}
                  </p>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Description list */}
      <div className="mt-6 max-w-5xl mx-auto  lg:px-8">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          {Object.keys(profile.fields).map((field) => (
            <div key={field} className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">{field}</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {profile.fields[field]}
              </dd>
            </div>
          ))}
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">About</dt>
            <dd
              className="mt-1 max-w-prose text-sm text-gray-900 space-y-5"
              dangerouslySetInnerHTML={{ __html: profile.about }}
            />
          </div>
        </dl>
      </div>
    </>
  )
}
const profile = {
  name: 'Ricardo Cooper',
  imageUrl:
    'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  coverImageUrl:
    'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  about: `
    <p>Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.</p>
    <p>Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.</p>
  `,
  fields: {
    Phone: '(555) 123-4567',
    Email: 'ricardocooper@example.com',
    Title: 'Senior Front-End Developer',
    Team: 'Product Development',
    Location: 'San Francisco',
    Sits: 'Oasis, 4th floor',
    Salary: '$145,000',
    Birthday: 'June 8, 1990',
  },
}
const screens = [
  {
    name: 'Overview',
    Component: Overview,
    onLinkTypes: ['*'],
  },
  {
    name: 'Basic',
    Component: CheckoutBasic,
    onLinkTypes: ['asset'],
  },
  {
    name: 'Basic',
    Component: EmbedBasic,
    onLinkTypes: ['embed', 'redirect'],
  },
  {
    name: 'Workflows',
    Component: Workflows,
    onLinkTypes: ['*'],
  },
  {
    name: 'Access',
    path: 'access',
    Component: Access,
    onLinkTypes: ['embed', 'redirect'],
  },
  {
    name: 'Customize',
    path: 'customize',
    Component: Customize,
    onLinkTypes: ['embed', 'asset'],
  },
]
const team = [
  {
    name: 'kitap',
    handle: 'asswet',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Michael Foster',
    handle: 'michaelfoster',
    role: 'Co-Founder / CTO',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Dries Vincent',
    handle: 'driesvincent',
    role: 'Manager, Business Relations',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Lindsay Walton',
    handle: 'lindsaywalton',
    role: 'Front-end Developer',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
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
      screens
        .filter(({ onLinkTypes }) => {
          if (onLinkTypes.includes('*')) {
            return true
          }

          if (onLinkTypes.includes(linkType)) {
            return true
          }

          return false
        })
        .map((item) => ({
          ...item,
        })),
    [linkType],
  )
  return (
    <UpdateCreatorLinkProvider
      link={link}
      creator={creator}
      asset={asset}
      className="w-full h-full"
    >
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
                      <Menu.Button className="-my-2 p-2 rounded-full bg-white flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <span className="sr-only">Open options</span>
                        <DotsVerticalIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      show={true}
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

        {/* Tabs */}
        <Tab.Group>
          <div className="mt-6 sm:mt-2 2xl:mt-5">
            <div className="border-b border-gray-200">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  <Tab.List>
                    {filteredScreens.map((tab) => (
                      <Tab
                        key={tab.name}
                        className={({ selected }) => `
                        ${
                          selected
                            ? 'border-pink-500 text-gray-900'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }
                          whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                        `}
                      >
                        {tab.name}
                      </Tab>
                    ))}
                  </Tab.List>
                </nav>
              </div>
            </div>
          </div>

          <Tab.Panels>
            {filteredScreens.map(({ Component, name }) => (
              <Tab.Panel
                key={name}
                className="mt-6 min-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
              >
                <Component link={link} asset={asset} />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
        {/* Team member list */}
      </article>
    </UpdateCreatorLinkProvider>
  )
}
