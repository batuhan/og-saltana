import { NextSeo } from 'next-seo'
import React from 'react'
import DashboardShell from 'components/Dashboard/Common/Shell'
import getServerSidePropsForCreatorDashboardPages from '@/server/getServerSidePropsForCreatorDashboardPages'
import tw, { styled, css } from 'twin.macro'
import { CreatorDashboardLinksLink } from 'components/Links'
import CreatorDashboardNewLinkBox from 'components/Dashboard/Creator/NewLinkBox'
import useApi from 'hooks/useApi'
import useCreatorSpace from 'hooks/useCreatorSpace'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

function LinkItem({ name, assetId, linkType, slug, id, destination }) {
  return (
    <tr>
      <td tw="px-6 py-4 whitespace-nowrap">
        <div tw="flex items-center">
          <span tw="px-4 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Live
          </span>
          <div tw="px-3 text-sm font-medium text-gray-900">/{slug}</div>
          <div tw="px-2 text-sm text-gray-500">
            {linkType} {destination}
          </div>
        </div>
      </td>
      <td tw="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <CreatorDashboardLinksLink href={`/${id}`}>
          <a tw="text-indigo-600 hover:text-indigo-900">View</a>
        </CreatorDashboardLinksLink>
      </td>
    </tr>
  )
}
export function Links({ links }) {
  return (
    <div tw="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <CreatorDashboardNewLinkBox />
      <div tw="mt-4 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table tw="min-w-full divide-y divide-gray-200">
          <thead tw="bg-gray-50">
            <tr>
              <th
                scope="col"
                tw="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              />
              <th scope="col" tw="relative px-6 py-3">
                <span tw="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody tw="bg-white divide-y divide-gray-200">
            {links.data.map((fields) => (
              <LinkItem {...fields} key={fields.id} />
            ))}
          </tbody>
        </table>
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
    { initialData: [], enabled: !loading }
  )

  return (
    <DashboardShell>
      <NextSeo title="Links" />
      <Links links={links} />
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
  }
)
