import React from 'react'
import tw from 'twin.macro'

import _ from 'lodash'
import { CreatorDashboardLinksLink } from 'components/Links'

const actions = [
  {
    name: 'Smart Link',
    description: 'Create a custom link to redirect to dynamic locations',
    type: 'redirect',
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
  },
  {
    name: 'Digital Asset',
    description: 'Sell documents, downloadable files and more',
    type: 'asset',
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
  },
  {
    name: 'Notion page',
    description: 'Embed your Notion documents within your Saltana space',
    type: 'embed?type=notion',
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
  {
    name: 'Donation',
    description: 'Accept donations and tips',
    type: 'embed?type=notion',
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
]


export default function CreatorDashboardNewLinkBox() {
  const actionsMap = actions.map(
    (
      { name, description, iconBackground, type, iconForeground },
      actionIdx
    ) => (
      <li key={name} tw="flow-root">
        <div tw="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
          <div
            css={[
              tw`flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg`,
            ]}
          >
            A
          </div>
          <div>
            <h3 tw="text-sm font-medium text-gray-900">
              <CreatorDashboardLinksLink href={`/create/${type}`}>
                <a tw="focus:outline-none">
                  <span tw="absolute inset-0" aria-hidden="true" />
                  {name}
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </CreatorDashboardLinksLink>
            </h3>
            <p tw="mt-1 text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </li>
    )
  )

  return (
    <section aria-labelledby="quick-links-title" tw="my-3">

      <ul
        role="list"
        tw="mt-6 border-t border-b border-gray-200 py-6 grid grid-cols-1 gap-6 sm:grid-cols-2"
      >
        {actionsMap}
      </ul>
    </section>
  )
}
