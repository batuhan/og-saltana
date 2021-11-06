import { Fragment, useEffect, useState } from 'react'
import { Disclosure } from '@headlessui/react'

import classNames from '@/common/classnames'
import { Dialog, Menu, Transition, Popover, Listbox } from '@headlessui/react'
import { ChevronRightIcon, DotsVerticalIcon, SelectorIcon } from '@heroicons/react/solid'

import {
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  CalendarIcon,
  CogIcon,
  HomeIcon,
  MapIcon,
  MenuIcon,
  PlusSmIcon,
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
import linkTypes from '@/common/link-types'

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
import LinkSlideOverView from 'components/Dashboard/Creator/Links/LinkSlideOverView'
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


const projects = [
  {
    id: 1,
    title: 'GraphQL API',
    initials: 'GA',
    team: 'Engineering',
    members: [
      {
        name: 'Dries Vincent',
        handle: 'driesvincent',
        imageUrl:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Lindsay Walton',
        handle: 'lindsaywalton',
        imageUrl:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Courtney Henry',
        handle: 'courtneyhenry',
        imageUrl:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Tom Cook',
        handle: 'tomcook',
        imageUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    ],
    totalMembers: 12,
    lastUpdated: 'March 17, 2020',
    pinned: true,
    bgColorClass: 'bg-pink-600',
  },
  // More projects...
]
const pinnedProjects = projects.filter((project) => project.pinned)

function DiscoverWorkflows() {
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Discover workflows</h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, totam at reprehenderit maxime aut beatae
            ad.
          </p>
        </div>
        <div className="mt-3 text-sm">
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            {' '}
            Learn more about our features <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>

  )
}

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

export default function CreatorDashboardLinks() {
  const [session, loading] = useSession()
  const router = useRouter()
  const links = useApi(
    'links',
    'list',
    {
      ownerId: session.user.id,
      nbResultsPerPage: 100,
    },
    { initialData: [], enabled: !loading },
  )

  function onLinkClose() {
    router.push(`/dashboard/${session.user.id}/links`)
  }
  return (
    <DashboardShell>
      <NextSeo title="Links" />
      <main className="flex-1">

        {/* Page title & actions */}
        <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">Links</h1>
          </div>
          <div className="mt-4 flex sm:mt-0 sm:ml-4">
            <button
              type="button"
              className="order-1 ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-0 sm:ml-0"
            >
              Share
            </button>
            <button
              type="button"
              className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
            >
              Create
            </button>
            <CreatorAddNewButton />
          </div>

        </div>
        <div className="px-4 mt-6 sm:px-6 lg:px-8">

          <DiscoverWorkflows />
        </div>
        {/* Pinned projects */}
        <div className="px-4 mt-6 sm:px-6 lg:px-8">
          <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Pinned Projects</h2>
          <ul role="list" className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4 mt-3">
            {pinnedProjects.map((project) => (
              <li key={project.id} className="relative col-span-1 flex shadow-sm rounded-md">
                <div
                  className={classNames(
                    project.bgColorClass,
                    'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
                  )}
                >
                  {project.initials}
                </div>
                <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                  <div className="flex-1 px-4 py-2 text-sm truncate">
                    <a href="#" className="text-gray-900 font-medium hover:text-gray-600">
                      {project.title}
                    </a>
                    <p className="text-gray-500">{project.totalMembers} Members</p>
                  </div>
                  <Menu as="div" className="flex-shrink-0 pr-2">
                    <Menu.Button className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                      <span className="sr-only">Open options</span>
                      <DotsVerticalIcon className="w-5 h-5" aria-hidden="true" />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="z-10 mx-3 origin-top-right absolute right-10 top-3 w-48 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
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
                                View
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
                                Removed from pinned
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
                                Share
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Projects list (only on smallest breakpoint) */}
        <div className="mt-10 sm:hidden">
          <div className="px-4 sm:px-6">
            <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Projects</h2>
          </div>
          <ul role="list" className="mt-3 border-t border-gray-200 divide-y divide-gray-100">
            {links.data.map((link) => (
              <li key={link.id}>
                <CreatorDashboardLinksLink
                  href={`?link=${link.id}`}
                  passHref
                  shallow
                >
                  <a href="#" className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6">
                    <span className="flex items-center truncate space-x-3">
                      <span
                        className={classNames(link.bgColorClass, 'w-2.5 h-2.5 flex-shrink-0 rounded-full')}
                        aria-hidden="true"
                      />
                      <span className="font-medium truncate text-sm leading-6">
                        /{link.slug} <span className="truncate font-normal text-gray-500">{link.destination || link.linkType}</span>
                      </span>
                    </span>
                    <ChevronRightIcon
                      className="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </a></CreatorDashboardLinksLink>
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
                    <span className="lg:pl-2">Link</span>
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hits
                  </th>
                  <th className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" />
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {links.data.map((link) => (
                  <tr key={link.id}>
                    <td className="px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="flex items-center space-x-3 lg:pl-2">
                        <div
                          className={classNames(link.bgColorClass, 'flex-shrink-0 w-2.5 h-2.5 rounded-full')}
                          aria-hidden="true"
                        />
                        <CreatorDashboardLinksLink
                          href={`?link=${link.id}`}
                          passHref
                          shallow
                        >
                          <a className="truncate hover:text-gray-600">
                            <span>
                              /{link.slug}
                            </span>
                          </a></CreatorDashboardLinksLink>
                      </div>    <div className="flex items-center space-x-3 lg:pl-2">
                        <div
                          className={classNames(link.bgColorClass, 'flex-shrink-0 w-2.5 h-2.5 rounded-full')}
                          aria-hidden="true"
                        />
                        <a href="#" className="truncate text-gray-500  hover:text-gray-400">
                          <span className="font-normal">in {link.destination}</span>
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-500 font-medium">
                      <div className="flex items-center space-x-2">
                        <div className="flex flex-shrink-0 -space-x-1">
                          sds
                        </div>
                        <span className="flex-shrink-0 text-xs leading-5 font-medium">
                          +34534
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <button type="button" className="text-gray-900 font-medium">
                        Reply
                      </button>
                      <span className="text-gray-500 font-medium">&middot;</span>{' '}
                      <button type="button" className="text-gray-900 font-medium">
                        Edit
                      </button>
                      <span className="text-gray-500 font-medium">&middot;</span>{' '}
                      <button type="button" className="text-gray-900 font-medium">
                        Reply
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <LinkSlideOverView />
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
