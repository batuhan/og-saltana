import React from 'react'

import { CreatorDashboardLink } from 'components/Links'
import classNames from '@/common/classnames'

const navigation = [
  { name: 'Profile', href: '/customize', current: true },
  { name: 'Embeds', href: '/embeds', current: false },
  { name: 'Custom Domains', href: '/domains', current: false },
  { name: 'E-mails', href: '/emails', current: false, enabled: false },
  { name: 'API', href: '/emails', current: false, enabled: false },
  { name: 'Team', href: '/emails', current: false, enabled: false },
]
const secondaryNavigation = []


export default function CreatorDashboardSettingsSidebar() {
  return (
    <nav aria-label="Sidebar">
      <div className="flex flex-nowrap overflow-x-scroll no-scrollbar md:block md:overflow-auto px-3 py-6 border-b md:border-b-0 md:border-r border-gray-200 min-w-60 md:space-y-3">
        {/* Group 1 */}
        <div>
          <div className="text-xs font-semibold text-gray-400 uppercase mb-3">
            Business settings
          </div>
          <ul className="flex flex-nowrap md:block mr-3 md:mr-0">
            {navigation.map(({ name, href, current }) => (
              <li className="mr-0.5 md:mr-0 md:mb-0.5">
                <CreatorDashboardLink key={name} href={href}>
                  <a
                    href="#"
                    className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${current && "bg-indigo-50"
                      }`}
                    aria-current={current ? 'page' : undefined}

                  >
                    <svg
                      className={`w-4 h-4 flex-shrink-0 fill-current text-gray-400 mr-2 ${current && "text-indigo-400"
                        }`}
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.311 9.527c-1.161-.393-1.85-.825-2.143-1.175A3.991 3.991 0 0012 5V4c0-2.206-1.794-4-4-4S4 1.794 4 4v1c0 1.406.732 2.639 1.832 3.352-.292.35-.981.782-2.142 1.175A3.942 3.942 0 001 13.26V16h14v-2.74c0-1.69-1.081-3.19-2.689-3.733zM6 4c0-1.103.897-2 2-2s2 .897 2 2v1c0 1.103-.897 2-2 2s-2-.897-2-2V4zm7 10H3v-.74c0-.831.534-1.569 1.33-1.838 1.845-.624 3-1.436 3.452-2.422h.436c.452.986 1.607 1.798 3.453 2.422A1.943 1.943 0 0113 13.26V14z" />
                    </svg>
                    <span
                      className={`text-sm font-medium ${current
                        ? "text-indigo-500"
                        : "hover:text-gray-700"
                        }`}
                    >
                      {name}
                    </span>
                  </a>
                </CreatorDashboardLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </nav>
  )
}
