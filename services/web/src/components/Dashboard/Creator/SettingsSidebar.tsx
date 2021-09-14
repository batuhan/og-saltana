import React from 'react'

import { CreatorDashboardLink } from 'components/Links'
import classNames from '@/common/classnames'

const navigation = [
  { name: 'Profile', href: '/customize', current: true },
  { name: 'Embeds', href: '/embeds', current: false },
  { name: 'Integrations', href: '/integrations', current: false },
  { name: 'Workflows', href: '/workflows', current: false },
  { name: 'Privacy', href: '/privacy', current: false },
  { name: 'Custom Domain', href: '/domains', current: false },
]
const secondaryNavigation = []

export default function CreatorDashboardSettingsSidebar() {
  return (
    <nav aria-label="Sidebar">
      <div className="space-y-1">
        {navigation.map(({ name, href, current }) => (
          <CreatorDashboardLink key={name} href={href}>
            <a
              href="#"
              className={classNames(
                'group',
                current
                  ? `bg-gray-100 text-gray-900`
                  : `text-gray-600 hover:bg-gray-50 hover:text-gray-900`,
                ` flex items-center px-3 py-2 text-sm font-medium rounded-md`,
              )}
              aria-current={current ? 'page' : undefined}
            >
              <span className="truncate">{name}</span>
            </a>
          </CreatorDashboardLink>
        ))}
      </div>
      {secondaryNavigation.length > 0 && (
        <div className="mt-8">
          <h3
            className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
            id="projects-headline"
          >
            Projects
          </h3>
          <div className="mt-1 space-y-1" aria-labelledby="projects-headline">
            {secondaryNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className=" group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
              >
                <span className="truncate">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
