import { PlusIcon } from '@heroicons/react/outline'
import CreatorSlugField from 'components/Dashboard/Common/Fields/CreatorSlugField'
import useCreatorSpace from 'hooks/useCreatorSpace'
import React from 'react'
import 'twin.macro'

import { useFormContext } from 'react-hook-form'
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import tw from 'twin.macro'

const settings = [
  {
    name: 'Public access',
    description: 'This link would be available to anyone who has it',
  },
  {
    name: 'Require purchase of any asset',
    description:
      'Anyone who bought any assets from you will be able to access the link ',
  },
  {
    name: 'Require purchase of particular assets',
    description:
      "Anyone who bought one or more assets you'll pick will be able to access the link ",
  },
  {
    name: 'Require e-mail',
    description: 'Require e-mail validation to access the link',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const RadioGroupOption =
  (settingIdx) =>
  ({ checked, children }) =>
    (
      <div
        css={[
          settingIdx === 0 ? tw`rounded-tl-md rounded-tr-md` : '',
          settingIdx === settings.length - 1
            ? tw`rounded-bl-md rounded-br-md`
            : '',
          checked
            ? tw`bg-indigo-50 border-indigo-200 z-10`
            : tw`border-gray-200`,
          tw`relative border p-4 flex cursor-pointer focus:outline-none`,
        ]}
      >
        {children}
      </div>
    )

function List({ settings }) {
  return settings.map((setting, settingIdx) => (
    <RadioGroup.Option
      key={setting.name}
      value={setting}
      as={RadioGroupOption(settingIdx)}
    >
      {({ active, checked }) => (
        <>
          <span
            css={[
              checked
                ? tw`bg-indigo-600 border-transparent`
                : tw`bg-white border-gray-300`,
              active ? tw`ring-2 ring-offset-2 ring-indigo-500` : '',
              tw`h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center`,
            ]}
            aria-hidden="true"
          >
            <span tw="rounded-full bg-white w-1.5 h-1.5" />
          </span>
          <div tw="ml-3 flex flex-col">
            <RadioGroup.Label
              as="span"
              css={[
                checked ? tw`text-indigo-900` : tw`text-gray-900`,
                tw`block text-sm font-medium`,
              ]}
            >
              {setting.name}
            </RadioGroup.Label>
            <RadioGroup.Description
              as="span"
              css={[
                checked ? tw`text-indigo-700` : tw`text-gray-500`,
                tw`block text-sm`,
              ]}
            >
              {setting.description}
            </RadioGroup.Description>
          </div>
        </>
      )}
    </RadioGroup.Option>
  ))
}

export default function CreatorDashboardLinkAccessScreen() {
  const methods = useFormContext()
  const { creator } = useCreatorSpace()
  const [selected, setSelected] = useState(settings[0])

  return (
    <RadioGroup value={selected} onChange={setSelected}>
      <RadioGroup.Label tw="sr-only">Privacy setting</RadioGroup.Label>
      <div tw="bg-white rounded-md -space-y-px">
        <List settings={settings} />
      </div>
    </RadioGroup>
  )
}
