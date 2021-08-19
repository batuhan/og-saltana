import React from 'react'
import tw from 'twin.macro'

import _ from 'lodash'
import { CreatorDashboardLinksLink } from 'components/Links'

const actions = [
  {
    name: 'Embed',
    description:
      'Show your content on other platform within your Saltana space. Supports Notion, AirTable, Figma, YouTube, Twich and more!',
    type: 'embed',
  },
  {
    name: 'Digital Asset',
    description: 'Sell documents, downloadable files and more',
    type: 'asset',
  },
  {
    name: 'Redirection',
    description:
      'Create a link you can track and modify to share on social media',
    type: 'redirect',
  },
  {
    name: 'Notion page',
    description: 'Show your Notion documents within your Saltana space',
    type: 'embed?type=notion',
  },
]

export default function CreatorDashboardNewLinkBox() {
  const actionsMap = actions.map(({ name, description, type }, actionIdx) => (
    <li key={name} tw="flow-root">
      <div tw="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
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
  ))

  return (
    <section aria-labelledby="quick-links-title" tw="my-3">
      <ul
        role="list"
        tw="mt-6 px-4 border-t border-b border-gray-200 py-6 grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2"
      >
        {actionsMap}
      </ul>
    </section>
  )
}
