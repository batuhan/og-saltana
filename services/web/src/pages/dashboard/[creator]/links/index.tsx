import { Fragment, useEffect, useState } from 'react'
import { Disclosure } from '@headlessui/react'

import classNames from '@/common/classnames'

import {
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  CalendarIcon,
  CogIcon,
  HomeIcon,
  MapIcon,
  MenuIcon,
  SearchCircleIcon,
  SpeakerphoneIcon,
  UserGroupIcon,
  ViewGridAddIcon,
  XIcon,
} from '@heroicons/react/outline'
import {
  ChevronLeftIcon,
  FilterIcon,
  MailIcon,
  PhoneIcon,
  SearchIcon,
} from '@heroicons/react/solid'
import { NextSeo } from 'next-seo'
import React from 'react'
import DashboardShell from 'components/Dashboard/Common/Shell'
import getServerSidePropsForCreatorDashboardPages from '@/server/getServerSidePropsForCreatorDashboardPages'
import { CreatorDashboardLinksLink } from 'components/Links'
import CreatorDashboardNewLinkBox from 'components/Dashboard/Creator/NewLinkBox'

import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import useApi from 'hooks/useApi'
import LinkView from 'components/Dashboard/Creator/Links/LinkView'
const user = {
  name: 'Tom Cook',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const secondaryNavigation = [
  { name: 'Apps', href: '#', icon: ViewGridAddIcon },
  { name: 'Settings', href: '#', icon: CogIcon },
]
const item = {
  name: 'Total Subscribers',
  stat: '71,897',
  previousStat: '70,946',
  change: '12%',
  changeType: 'increase',
}

function DiscoverWorkflows() {
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Discover workflows
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
            totam at reprehenderit maxime aut beatae ad.
          </p>
        </div>
        <div className="mt-3 text-sm">
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {' '}
            Learn more about our features <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  )
}

function Overview() {
  return (
    <article>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="max-w-3xl mx-auto">
          <DiscoverWorkflows />

          <h2 className="text-lg font-medium text-gray-900">Create a new...</h2>
          <CreatorDashboardNewLinkBox />
        </div>
      </div>
    </article>
  )
}
function Directory({ links }) {
  const [listActive, setListActive] = useState(true)
  const router = useRouter()

  return (
    <div className="relative bg-white">
      <div className="flex flex-col min-w-0 flex-1 ">
        <div className="flex-1 relative z-0 flex overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
            {/* Breadcrumb */}
            <nav
              className="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden"
              aria-label="Breadcrumb"
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setListActive(!listActive)
                }}
                className="inline-flex items-center space-x-3 text-sm font-medium text-gray-900"
              >
                <ChevronLeftIcon
                  className="-ml-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span>Link attachments</span>
              </a>
            </nav>
          </main>
          <aside
            className={`flex order-first flex-col flex-shrink-0 w-96 border-r border-gray-200 ${
              listActive === false ? 'hidden' : ''
            }`}
          >
            <div className="px-6 pt-6 pb-4">
              <h2 className="text-lg font-medium text-gray-900">Links</h2>
              <p className="mt-1 text-sm text-gray-600">
                You have {links.data.length} links.
              </p>
              <form className="mt-6 flex space-x-4" action="#">
                <div className="flex-1 min-w-0">
                  <label htmlFor="search" className="sr-only">
                    Search links & assets
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SearchIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type="search"
                      name="search"
                      id="search"
                      className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="Search"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  <FilterIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Search</span>
                </button>
              </form>
            </div>
            {/* Directory list */}
            <nav
              className="flex-1 min-h-0 overflow-y-auto"
              aria-label="Directory"
            >
              <div className="relative">
                <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                  <h3>letter</h3>
                </div>
                <ul
                  role="list"
                  className="relative z-0 divide-y divide-gray-200"
                >
                  {links.data.map((link) => (
                    <li key={link.id}>
                      <div
                        className={`${
                          link.id === router.query.link ? 'bg-gray-50 ' : ''
                        } relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500`}
                      >
                        <div className="flex-1 min-w-0">
                          <CreatorDashboardLinksLink
                            href={`?link=${link.id}`}
                            passHref
                            shallow
                          >
                            <a href="#" className="focus:outline-none">
                              {/* Extend touch target to entire panel */}
                              <span
                                className="absolute inset-0"
                                aria-hidden="true"
                              />
                              <p className=" font-bold text-gray-900">
                                /{link.slug}
                              </p>
                              <p className="text-sm text-gray-500 truncate">
                                {link.linkType} - {link.destination}
                              </p>
                            </a>
                          </CreatorDashboardLinksLink>
                        </div>
                        <div className="flex-shrink-0">
                          <div
                            className={classNames(
                              item.changeType === 'increase'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800',
                              'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0',
                            )}
                          >
                            {item.changeType === 'increase' ? (
                              <ArrowSmUpIcon
                                className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                                aria-hidden="true"
                              />
                            ) : (
                              <ArrowSmDownIcon
                                className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
                                aria-hidden="true"
                              />
                            )}

                            <span className="sr-only">
                              {item.changeType === 'increase'
                                ? 'Increased'
                                : 'Decreased'}{' '}
                              by
                            </span>
                            {item.change}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </aside>
          {router.query.link ? (
            <LinkView linkId={router.query.link} />
          ) : (
            <Overview />
          )}
        </div>
      </div>
    </div>
  )
}

export default function CreatorDashboardLinks() {
  const [session, loading] = useSession()
  const links = useApi(
    'links',
    'list',
    {
      ownerId: session.user.id,
      nbResultsPerPage: 100,
    },
    { initialData: [], enabled: !loading },
  )

  return (
    <DashboardShell>
      <NextSeo title="Links" />
      <Directory links={links} />
    </DashboardShell>
  )
}

export const getServerSideProps = getServerSidePropsForCreatorDashboardPages(
  async ({ session, instance, queryClient }) => {
    const query = {
      ownerId: session.user.id,
      nbResultsPerPage: 100,
    }
    const links = await instance.links.list(query)

    queryClient.setQueryData(['links', 'list', query], links)

    return {}
  },
)
