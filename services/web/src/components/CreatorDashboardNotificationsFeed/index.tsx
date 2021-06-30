import React, { useEffect } from 'react'
import tw, { styled, css } from 'twin.macro'

import { CheckIcon, ThumbUpIcon, UserIcon } from '@heroicons/react/solid'
import _ from 'lodash'

const timeline = [
  {
    id: 1,
    content: 'Applied to',
    target: 'Front End Developer',
    href: '#',
    date: 'Sep 20',
    datetime: '2020-09-20',
    icon: UserIcon,
    iconBackground: 'bg-gray-400',
  },
  {
    id: 2,
    content: 'Advanced to phone screening by',
    target: 'Bethany Blake',
    href: '#',
    date: 'Sep 22',
    datetime: '2020-09-22',
    icon: ThumbUpIcon,
    iconBackground: 'bg-blue-500',
  },
  {
    id: 3,
    content: 'Completed phone screening with',
    target: 'Martha Gardner',
    href: '#',
    date: 'Sep 28',
    datetime: '2020-09-28',
    icon: CheckIcon,
    iconBackground: 'bg-green-500',
  },
  {
    id: 4,
    content: 'Advanced to interview by',
    target: 'Bethany Blake',
    href: '#',
    date: 'Sep 30',
    datetime: '2020-09-30',
    icon: ThumbUpIcon,
    iconBackground: 'bg-blue-500',
  },
  {
    id: 5,
    content: 'Completed interview with',
    target: 'Katherine Snyder',
    href: '#',
    date: 'Oct 4',
    datetime: '2020-10-04',
    icon: CheckIcon,
    iconBackground: 'bg-green-500',
  },
]

export default function CreatorDashboardNotificationsFeed() {
  return (
    <div tw="flow-root  bg-white overflow-hidden shadow">
      <ul tw="-mb-8">
        {timeline.map(
          (
            {
              id,
              icon: LineItemIcon,
              href,
              iconBackground,
              content,
              target,
              datetime,
              date,
            },
            eventIdx
          ) => (
            <li key={id}>
              <div tw="relative pb-8">
                {eventIdx !== timeline.length - 1 ? (
                  <span
                    tw="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div tw="relative flex space-x-3">
                  <div>
                    <span
                      css={[
                        iconBackground,
                        tw`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white`,
                      ]}
                    >
                      a
                    </span>
                  </div>
                  <div tw="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p tw="text-sm text-gray-500">
                        {content}{' '}
                        <a href={href} tw="font-medium text-gray-900">
                          {target}
                        </a>
                      </p>
                    </div>
                    <div tw="text-right text-sm whitespace-nowrap text-gray-500">
                      <time dateTime={datetime}>{date}</time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  )
}
