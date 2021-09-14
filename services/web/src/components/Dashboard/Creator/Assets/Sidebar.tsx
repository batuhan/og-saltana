import React from 'react'

import { useRouter } from 'next/router'
import {
  CreatorDashboardLink,
  CreatorDashboardAssetsLink,
} from 'components/Links'
import classnames from '@/common/classnames'

const secondaryNavigation = []

export default function CreatorDashboardAssetSidebar({ screens, assetId }) {
  return (
    <>
      <div>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            defaultValue={screens.find(({ current }) => current).name}
          >
            {screens.map(({ name, path, current }) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex" aria-label="Tabs">
              {screens.map(({ name, path, current }) => (
                <CreatorDashboardAssetsLink
                  key={name}
                  href={`/${assetId}/${path}`}
                  passHref
                >
                  <a
                    className={classnames(
                      current
                        ? `border-indigo-500 text-indigo-600`
                        : `border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300`,
                      `w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm`,
                    )}
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
