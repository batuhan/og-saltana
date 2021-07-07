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
    name: 'Asset Bundle',
    description: 'Sell multiple assets with a single payment',
    type: 'asset-bundle',
  },
  {
    name: 'Notion page',
    description: 'Embed your Notion documents within your Saltana space',
    type: 'embed?type=notion',
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
  {
    name: 'Notion collection',
    description: 'Embed your Notion documents within your Saltana space',
    type: 'embed?type=notion',
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
  {
    name: 'Typeform page',
    type: 'embed?type=typeorm',
    description: 'Embed your Typeform forms within your Saltana space',
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
  {
    name: 'Form',
    description:
      'Ask your audience questions (Requires Airtable or Notion integration)',
    type: 'form',
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
  },
  {
    name: 'Poll',
    description: 'Poll your audience',
    type: 'embed?type=form',
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
  },
  {
    name: 'Resume',
    description: 'Poll your audience',
    type: 'resume',
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
  },
]

export default function CreatorDashboardNewLinkBox() {
  const actionsMap = actions.map(
    (
      { name, description, iconBackground, type, iconForeground },
      actionIdx
    ) => (
      <div
        key={name}
        tw="relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500"
        css={[
          'group',
          actionIdx === 0
            ? tw`rounded-tl-lg rounded-tr-lg sm:rounded-tr-none`
            : '',
          actionIdx === 1 ? tw`sm:rounded-tr-lg` : '',
          actionIdx === actions.length - 2 ? tw`sm:rounded-bl-lg` : '',
          actionIdx === actions.length - 1
            ? tw`rounded-bl-lg rounded-br-lg sm:rounded-bl-none`
            : '',
          tw`relative  bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500`,
        ]}
      >
        <div tw="mt-8">
          <h3 tw="text-lg font-medium">
            <CreatorDashboardLinksLink href={`/create/${type}`}>
              <a tw="focus:outline-none">
                {/* Extend touch target to entire panel */}
                <span tw="absolute inset-0" aria-hidden="true" />
                {name}
              </a>
            </CreatorDashboardLinksLink>
          </h3>
          <p tw="mt-2 text-sm text-gray-500">{description}</p>
        </div>
        <span
          tw="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
          aria-hidden="true"
        >
          <svg
            tw="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
          </svg>
        </span>
      </div>
    )
  )

  return (
    <section aria-labelledby="quick-links-title" tw="my-3">
      <div tw=" bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-3 sm:gap-px">
        <h2 tw="sr-only" id="quick-links-title">
          Quick links
        </h2>
        {actionsMap}
      </div>
    </section>
  )
}
