import * as React from 'react'
import DashboardShell from 'components/Dashboard/Common/Shell'

import { NextSeo } from 'next-seo'
import getServerSidePropsForCreatorDashboardPages from '@/server/getServerSidePropsForCreatorDashboardPages'

import AnalyticsCard01 from 'components/Dashboard/Creator/Analytics/AnalyticsCard01';
import AnalyticsCard02 from 'components/Dashboard/Creator/Analytics/AnalyticsCard02';
import AnalyticsCard03 from 'components/Dashboard/Creator/Analytics/AnalyticsCard03';
import AnalyticsCard04 from 'components/Dashboard/Creator/Analytics/AnalyticsCard04';
import AnalyticsCard05 from 'components/Dashboard/Creator/Analytics/AnalyticsCard05';
import AnalyticsCard06 from 'components/Dashboard/Creator/Analytics/AnalyticsCard06';
import AnalyticsCard07 from 'components/Dashboard/Creator/Analytics/AnalyticsCard07';
import AnalyticsCard08 from 'components/Dashboard/Creator/Analytics/AnalyticsCard08';
import AnalyticsCard09 from 'components/Dashboard/Creator/Analytics/AnalyticsCard09';
import AnalyticsCard10 from 'components/Dashboard/Creator/Analytics/AnalyticsCard10';
import AnalyticsCard11 from 'components/Dashboard/Creator/Analytics/AnalyticsCard11';

export const CreatorStats = ({ currentUserId }) => {
  return (
    <DashboardShell>
      <NextSeo title="Stats" />

      <main>
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

          {/* Page header */}
          <div className="sm:flex sm:justify-between sm:items-center mb-8">

            {/* Left: Title */}
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">Analytics ✨</h1>
            </div>

            {/* Right: Actions */}
            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

              {/* Datepicker built with flatpickr */}
              <Datepicker align="right" />

            </div>

          </div>

          {/* Cards */}
          <div className="grid grid-cols-12 gap-6">

            {/* Line chart (Analytics) */}
            <AnalyticsCard01 />
            {/*  Line chart (Active Users Right Now) */}
            <AnalyticsCard02 />
            {/* Stacked bar chart (Acquisition Channels) */}
            <AnalyticsCard03 />
            {/* Horizontal bar chart (Audience Overview) */}
            <AnalyticsCard04 />
            {/* Report card (Top Channels) */}
            <AnalyticsCard05 />
            {/* Report card (Top Pages) */}
            <AnalyticsCard06 />
            {/* Report card (Top Countries) */}
            <AnalyticsCard07 />
            {/* Doughnut chart (Sessions By Device) */}
            <AnalyticsCard08 />
            {/* Doughnut chart (Visit By Age Category) */}
            <AnalyticsCard09 />
            {/* Polar chart (Sessions By Gender) */}
            <AnalyticsCard10 />
            {/* Table (Top Products) */}
            <AnalyticsCard11 />

          </div>

        </div>
      </main>

    </DashboardShell>
  )
}

export const getServerSideProps = getServerSidePropsForCreatorDashboardPages()

export default CreatorStats
