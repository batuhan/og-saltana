import * as React from 'react'

import { NextSeo } from 'next-seo'
import {
  ArrowSmDownIcon,
  ArrowSmUpIcon,
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
import { CreatorDashboardAssetsLink } from 'components/Links'

import AssetCategoryName from 'components/AssetCategoryName'
import CreatorDashboardAssetsLayout from 'components/Dashboard/Creator/Assets/Layout'
import { Menu, Transition } from '@headlessui/react'
import { useMyAssets } from 'hooks/useAssets'
import classNames from '@/common/classnames'

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
const project = projects[0]

const stats = [
  {
    name: 'Total Subscribers',
    stat: '71,897',
    previousStat: '70,946',
    change: '12%',
    changeType: 'increase',
  },
  {
    name: 'Avg. Open Rate',
    stat: '58.16%',
    previousStat: '56.14%',
    change: '2.02%',
    changeType: 'increase',
  },
  {
    name: 'Avg. Click Rate',
    stat: '24.57%',
    previousStat: '28.62%',
    change: '4.05%',
    changeType: 'decrease',
  },
]

function Stats() {
  return (
    <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
      {stats.map((item) => (
        <div key={item.name} className="px-4 py-5 sm:p-6">
          <dt className="text-base font-normal text-gray-900">{item.name}</dt>
          <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
              {item.stat}
              <span className="ml-2 text-sm font-medium text-gray-500">
                from {item.previousStat}
              </span>
            </div>

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
                {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by
              </span>
              {item.change}
            </div>
          </dd>
        </div>
      ))}
    </dl>
  )
}
function AssetTable({ assets }) {
  return (
    <div className="relative h-screen flex overflow-hidden bg-white">
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          {/* Pinned projects */}
          <div className="px-4 mt-6 sm:px-6 lg:px-8">
            <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
              Pinned Projects
            </h2>
            <Stats />
          </div>

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
              {assets.map(
                ({ id, name, description, categoryId, createdDate }) => (
                  <li key={id}>
                    <CreatorDashboardAssetsLink href={`/${id}`} passHref>
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
                    </CreatorDashboardAssetsLink>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Projects table (small breakpoint and up) */}
          <div className="hidden mt-8 sm:block">
            <div className="align-middle inline-block min-w-full border-b border-gray-200">
              <table className="min-w-full">
                <thead>
                  <tr className="border-t border-gray-200">
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span className="lg:pl-2">ASSET</span>
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
                  {assets.map(
                    ({ id, name, description, categoryId, createdDate }) => (
                      <tr key={id}>
                        <td className="px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900">
                          <div className="flex items-center space-x-3 lg:pl-2">
                            <CreatorDashboardAssetsLink
                              href={`/${id}`}
                              passHref
                            >
                              <a
                                href="#"
                                className="truncate hover:text-gray-600"
                              >
                                <span>
                                  {name}{' '}
                                  <span className="text-gray-500 font-normal">
                                    in{' '}
                                    <AssetCategoryName
                                      categoryId={categoryId}
                                    />
                                  </span>
                                </span>
                              </a>
                            </CreatorDashboardAssetsLink>
                          </div>
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-500 font-medium">
                          <div className="flex items-center space-x-2">
                            <div className="flex flex-shrink-0 -space-x-1">
                              {project.members.map((member) => (
                                <img
                                  key={member.handle}
                                  className="max-w-none h-6 w-6 rounded-full ring-2 ring-white"
                                  src={member.imageUrl}
                                  alt={member.name}
                                />
                              ))}
                            </div>
                            {project.totalMembers > project.members.length ? (
                              <span className="flex-shrink-0 text-xs leading-5 font-medium">
                                +{project.totalMembers - project.members.length}
                              </span>
                            ) : null}
                          </div>
                        </td>
                        <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                          {createdDate}
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

function ListNew({ assets }) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Title
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Status
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Role
          </th>
          <th scope="col" className="relative px-6 py-3">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {assets.map(({ id, name, description, categoryId, createdDate }) => (
          <tr key={id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    <AssetCategoryName categoryId={categoryId} />
                  </span>
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {name}
                  </div>
                  <div className="text-sm text-gray-500">{description}</div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{name}</div>
              <div className="text-sm text-gray-500">{description}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <time dateTime={createdDate}>{createdDate}</time>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <CreatorDashboardAssetsLink href={`/${id}`} passHref>
                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                  Edit
                </a>
              </CreatorDashboardAssetsLink>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export const CreatorDashboardAssets = () => {
  const user = useCurrentUser()
  const assetsQuery = useMyAssets()
  return (
    <CreatorDashboardAssetsLayout>
      <NextSeo title="Assets" />

      <div className="max-w-7xl mx-auto pb-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Assets
        </h1>
        <p className="mt-4 max-w-xl text-sm text-gray-700">
          Our thoughtfully designed workspace objects are crafted in limited
          runs. Improve your productivity and organization with these sale items
          before we run out.
        </p>
      </div>
      {assetsQuery.data ? (
        <AssetTable assets={assetsQuery.data} />
      ) : (
        'You have no assets yet'
      )}
    </CreatorDashboardAssetsLayout>
  )
}

export const getServerSideProps = getServerSidePropsForCreatorDashboardPages(
  async ({ session, instance, queryClient }) => {
    const query = {
      ownerId: session.user.id,
      nbResultsPerPage: 100,
    }
    const assets = await instance.assets.list(query)

    queryClient.setQueryData(['assets', 'list', query], assets)

    return {}
  },
)

export default CreatorDashboardAssets
