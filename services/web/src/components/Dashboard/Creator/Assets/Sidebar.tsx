import React from 'react'
import tw from 'twin.macro'
import { useRouter } from 'next/router'
import {
  CreatorDashboardLink,
  CreatorDashboardAssetsLink,
} from 'components/Links'

const secondaryNavigation = []

export default function CreatorDashboardAssetSidebar({ screens, assetId }) {
  return (
    <>
      <div>
        <div tw="sm:hidden">
          <label htmlFor="tabs" tw="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            tw="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            defaultValue={screens.find(({ current }) => current).name}
          >
            {screens.map(({ name, path, current }) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </div>
        <div tw="hidden sm:block">
          <div tw="border-b border-gray-200">
            <nav tw="-mb-px flex" aria-label="Tabs">
              {screens.map(({ name, path, current }) => (
                <CreatorDashboardAssetsLink
                  key={name}
                  href={`/${assetId}/${path}`}
                  passHref
                >
                  <a
                    css={[
                      current
                        ? tw`border-indigo-500 text-indigo-600`
                        : tw`border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300`,
                      tw`w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm`,
                    ]}
                    aria-current={current ? 'page' : undefined}
                  >
                    {name}
                  </a>
                </CreatorDashboardAssetsLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
