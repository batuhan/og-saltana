import React from 'react'
import tw from 'twin.macro'
import { useRouter } from 'next/router'
import {
  CreatorDashboardLink,
  CreatorDashboardLinksLink,
} from 'components/Links'

const secondaryNavigation = []

export default function CreatorDashboardLinkSidebar({ screens, linkId }) {
  return (
    <nav aria-label="Sidebar">
      <div tw="space-y-1">
        {screens.map(({ name, path, current }) => (
          <CreatorDashboardLinksLink key={name} href={`/${linkId}/${path}`}>
            <a
              css={[
                'group',
                current
                  ? tw`bg-gray-100 text-gray-900`
                  : tw`text-gray-600 hover:bg-gray-50 hover:text-gray-900`,
                tw` flex items-center px-3 py-2 text-sm font-medium rounded-md`,
              ]}
              aria-current={current ? 'page' : undefined}
            >
              <span tw="truncate">{name}</span>
            </a>
          </CreatorDashboardLinksLink>
        ))}
      </div>
      {secondaryNavigation.length > 0 && (
        <div tw="mt-8">
          <h3
            tw="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
            id="projects-headline"
          >
            Projects
          </h3>
          <div tw="mt-1 space-y-1" aria-labelledby="projects-headline">
            {secondaryNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group"
                tw=" flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
              >
                <span tw="truncate">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
