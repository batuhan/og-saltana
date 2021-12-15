import DashboardShell from '../Common/Shell'
import CreatorDashboardSettingsSidebar from './SettingsSidebar'

// export default function CreatorDashboardSettingsShell({ children }) {
//   return (
//     <DashboardShell>
//       <main>
//         <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

//           {/* Page header */}
//           <div className="mb-8">
//             {/* Title */}
//             <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">Account Settings ✨</h1>
//           </div>

//           {/* Content */}
//           <div className="bg-white shadow-lg rounded-sm mb-8">
//             <div className="flex flex-col md:flex-row md:-mr-px">
//               <CreatorDashboardSettingsSidebar />
//               {children}
//             </div>
//           </div>

//         </div>
//       </main>
//     </DashboardShell>
//   )
// }
/*
  This example requires Tailwind CSS v2.0+

  This example requires some changes to your config:

  ```
  // tailwind.config.js
  const colors = require('tailwindcss/colors')

  module.exports = {
    // ...
    theme: {
      extend: {
        colors: {
          'blue-gray': colors.blueGray,
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  BellIcon,
  BookmarkAltIcon,
  CashIcon,
  CogIcon,
  FireIcon,
  HomeIcon,
  InboxIcon,
  KeyIcon,
  MenuIcon,
  PhotographIcon,
  SearchCircleIcon,
  UserIcon,
  ViewGridAddIcon,
  XIcon,
} from '@heroicons/react/outline'
import { ChevronLeftIcon } from '@heroicons/react/solid'

const navigation = [
  {
    name: 'Profile', description: 'ddd', href: '/customize', current: true, icon: HomeIcon
  },
  {
    name: 'Embeds', description: 'ddd', href: '/embeds', current: false, icon: FireIcon
  },
  {
    name: 'Custom Domains', description: 'ddd', href: '/domains', current: false, icon: BookmarkAltIcon
  },
  {
    name: 'E-mails', description: 'ddd', href: '/emails', current: false, enabled: false, icon: InboxIcon
  },
  {
    name: 'API', description: 'ddd', href: '/emails', current: false, enabled: false, icon: UserIcon
  },
  { name: 'Team', description: 'ddd', href: '/emails', current: false, enabled: false, icon: UserIcon },
]
const secondaryNavigation = []

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CreatorDashboardSettingsShell({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (

    <DashboardShell>
      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col overflow-y-auto xl:overflow-hidden">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-200 xl:hidden">
            <div className="max-w-3xl mx-auto py-3 px-4 flex items-start sm:px-6 lg:px-8">
              <a
                href="#"
                className="-ml-1 inline-flex items-center space-x-3 text-sm font-medium text-slate-900"
              >
                <ChevronLeftIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
                <span>Settings</span>
              </a>
            </div>
          </nav>

          <div className="flex-1 flex xl:overflow-hidden">
            {/* Secondary sidebar */}
            <nav
              aria-label="Sections"
              className="hidden flex-shrink-0 w-96 bg-white border-r border-slate-200 xl:flex xl:flex-col"
            >
              <div className="flex-shrink-0 h-16 px-6 border-b border-slate-200 flex items-center">
                <p className="text-lg font-medium text-slate-900">Settings</p>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-blue-50 bg-opacity-50' : 'hover:bg-blue-50 hover:bg-opacity-50',
                      'flex p-6 border-b border-slate-200'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <item.icon className="flex-shrink-0 -mt-0.5 h-6 w-6 text-slate-400" aria-hidden="true" />
                    <div className="ml-3 text-sm">
                      <p className="font-medium text-slate-900">{item.name}</p>
                      <p className="mt-1 text-slate-500">{item.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </nav>

            {/* Main content */}
            <div className="flex-1 xl:overflow-y-auto">
              <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
                {children}
              </div>
            </div>
          </div>
        </div>
      </main>

    </ DashboardShell>
  )
}
