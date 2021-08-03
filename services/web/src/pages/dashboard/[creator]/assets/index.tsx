import * as React from 'react'
import DashboardShell from 'components/Dashboard/Common/Shell'
import 'twin.macro'
import { NextSeo } from 'next-seo'
import { CalendarIcon, ChevronRightIcon } from '@heroicons/react/solid'
import getServerSidePropsForCreatorDashboardPages from '@/server/getServerSidePropsForCreatorDashboardPages'
import useApi from 'hooks/useApi'
import useCurrentUser from 'hooks/useCurrentUser'

export function Title() {
  return (
    <div tw="md:flex md:items-center md:justify-between">
      <div tw="flex-1 min-w-0">
        <h2 tw="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Assets
        </h2>
      </div>
      <div tw="mt-4 flex md:mt-0 md:ml-4">
        <button
          type="button"
          tw="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Product
        </button>
      </div>
    </div>
  )
}

const stats = [
  { name: 'Total Subscribers', stat: '71,897' },
  { name: 'Avg. Open Rate', stat: '58.16%' },
  { name: 'Avg. Click Rate', stat: '24.57%' },
]

export function Stats() {
  return (
    <div tw="px-4 mt-6 sm:px-6 lg:px-8">
      <h3 tw="text-lg leading-6 font-medium text-gray-900">Last 30 days</h3>
      <dl tw="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            tw="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
          >
            <dt tw="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
            <dd tw="mt-1 text-3xl font-semibold text-gray-900">{item.stat}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function List({ assets }) {
  return (
    <div tw="px-4 mt-6 sm:px-6 lg:px-8">
      <h3 tw="text-lg leading-6 font-medium text-gray-900">
        All Assets ({assets.length} products)
      </h3>

      <div tw="shadow overflow-hidden sm:rounded-md mt-5">
        <ul tw="divide-y divide-gray-200">
          {assets.map(({ id, name, description, ownerId, createdDate }) => (
            <li key={id}>
              <a href="#" tw="block hover:bg-gray-50">
                <div tw="px-4 py-4 flex items-center sm:px-6">
                  <div tw="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                    <div tw="truncate">
                      <div tw="flex text-sm">
                        <p tw="font-medium text-indigo-600 truncate">{name}</p>
                        <p tw="ml-1 flex-shrink-0 font-normal text-gray-500">
                          {description}
                        </p>
                      </div>
                      <div tw="mt-2 flex">
                        <div tw="flex items-center text-sm text-gray-500">
                          <CalendarIcon
                            tw="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <p>
                            Published on{' '}
                            <time dateTime={createdDate}>{createdDate}</time>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div tw="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                      <div tw="flex overflow-hidden -space-x-1">A</div>
                    </div>
                  </div>
                  <div tw="ml-5 flex-shrink-0">
                    <ChevronRightIcon
                      tw="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export const CreatorDashboardAssets = () => {
  const user = useCurrentUser()
  const assetsQuery = useApi(
    'assets',
    'list',
    {
      ownerId: user.data?.id,
      nbResultsPerPage: 100,
    },
    { enabled: user.isLoggedIn }
  )
  return (
    <DashboardShell>
      <NextSeo title="Assets" />
      <Title />
      <Stats />
      {assetsQuery.data ? (
        <List assets={assetsQuery.data} />
      ) : (
        'You have no assets yet'
      )}
    </DashboardShell>
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
  }
)

export default CreatorDashboardAssets
