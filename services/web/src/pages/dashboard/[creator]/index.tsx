import React from 'react'
import tw from 'twin.macro'

import _ from 'lodash'
import getServerSidePropsForCreatorDashboardPages from '@/server/getServerSidePropsForCreatorDashboardPages'
import { NextSeo } from 'next-seo'
import DashboardShell from 'components/Dashboard/Common/Shell'
import CreatorDashboardNewLinkBox from 'components/Dashboard/Creator/NewLinkBox'
import CreatorDashboardNotificationsFeed from 'components/Dashboard/Creator/NotificationsFeed'

const stats = [
  { label: 'Vacation days left', value: 12 },
  { label: 'Sick days left', value: 4 },
  { label: 'Personal days left', value: 2 },
]

export default function CreatorDashboardCustomize() {
  return (
    <DashboardShell>
      <NextSeo title="Creator Dashboard" />

      <div tw="min-h-screen ">
        <main tw="pb-8">
          <div tw="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 tw="sr-only">Profile</h1>
            {/* Main 3 column grid */}
            <div tw="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              <div tw="grid grid-cols-1 gap-4 lg:col-span-2">
                {/* Welcome panel */}
                <section aria-labelledby="profile-overview-title">
                  <div tw=" bg-white overflow-hidden shadow">
                    <h2 tw="sr-only" id="profile-overview-title">
                      Profile Overview
                    </h2>
                    <div tw="bg-white p-6">
                      <div tw="sm:flex sm:items-center sm:justify-between">
                        <div tw="sm:flex sm:space-x-5">
                          <div tw="flex-shrink-0">avatar</div>
                          <div tw="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                            <p tw="text-sm font-medium text-gray-600">
                              Welcome back,
                            </p>
                            <p tw="text-xl font-bold text-gray-900 sm:text-2xl">
                              dsfds
                            </p>
                            <p tw="text-sm font-medium text-gray-600">
                              sdfdsfds
                            </p>
                          </div>
                        </div>
                        <div tw="mt-5 flex justify-center sm:mt-0">
                          <a
                            href="#"
                            tw="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            View profile
                          </a>
                        </div>
                      </div>
                    </div>
                    <div tw="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                      {stats.map((stat) => (
                        <div
                          key={stat.label}
                          tw="px-6 py-5 text-sm font-medium text-center"
                        >
                          <span tw="text-gray-900">{stat.value}</span>{' '}
                          <span tw="text-gray-600">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>{' '}
                <CreatorDashboardNotificationsFeed />
              </div>

              {/* Right column */}
              <div tw="grid grid-cols-1 gap-4 px-3 py-3">
                <h3 tw="text-lg">Add a new...</h3>
                <CreatorDashboardNewLinkBox />
              </div>
            </div>
          </div>
        </main>
      </div>
    </DashboardShell>
  )
}

export const getServerSideProps = getServerSidePropsForCreatorDashboardPages()
