import React, { useState } from 'react'
import tw from 'twin.macro'

import _ from 'lodash'
import { CreatorDashboardLinksLink } from 'components/Links'
import { RadioGroup } from '@headlessui/react'

const actions = [
  {
    name: 'Embed',
    description:
      'Show your content on other platform within your Saltana space. Supports Notion, AirTable, Figma, YouTube, Twich and more!',
    type: 'embed',
  },
  {
    name: 'Checkout',
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
    name: 'Live',
    description: 'Show your Notion documents within your Saltana space',
    type: 'embed?type=notion',
  },
  {
    name: 'Music Cover',
    description: 'List your music Spotify, SoundCloud etc',
    type: 'music',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Example() {
  const [selected, setSelected] = useState(plans[0])

  return (
    <RadioGroup value={selected} onChange={setSelected}>
      <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
      <div className="space-y-4">
        {plans.map((plan) => (
          <RadioGroup.Option
            key={plan.name}
            value={plan}
            className={({ active }) =>
              classNames(
                active ? 'ring-1 ring-offset-2 ring-indigo-500' : '',
                'relative block rounded-lg border border-gray-300 bg-white shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus:outline-none',
              )
            }
          >
            {({ checked }) => (
              <>
                <div className="flex items-center">
                  <div className="text-sm">
                    <RadioGroup.Label
                      as="p"
                      className="font-medium text-gray-900"
                    >
                      {plan.name}
                    </RadioGroup.Label>
                    <RadioGroup.Description as="div" className="text-gray-500">
                      <p className="sm:inline">
                        {plan.ram} / {plan.cpus}
                      </p>{' '}
                      <span
                        className="hidden sm:inline sm:mx-1"
                        aria-hidden="true"
                      >
                        &middot;
                      </span>{' '}
                      <p className="sm:inline">{plan.disk}</p>
                    </RadioGroup.Description>
                  </div>
                </div>
                <RadioGroup.Description
                  as="div"
                  className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right"
                >
                  <div className="font-medium text-gray-900">{plan.price}</div>
                  <div className="ml-1 text-gray-500 sm:ml-0">/mo</div>
                </RadioGroup.Description>
                <div
                  className={classNames(
                    checked ? 'border-indigo-500' : 'border-transparent',
                    'absolute -inset-px rounded-lg border-2 pointer-events-none',
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}
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
    <section aria-labelledby="quick-links-title">
      <ul
        role="list"
        tw="mt-6 px-4 border-t border-b border-gray-200 py-6 grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2"
      >
        {actionsMap}
      </ul>
    </section>
  )
}
