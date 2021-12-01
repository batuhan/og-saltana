import useCreatorSpace from 'hooks/useCreatorSpace'
import { useFormContext } from 'react-hook-form'
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'

import SaveButton from '../../SaveButton'
import classnames from '@/common/classnames'
const settings = [
  {
    name: 'Public access',
    value: 'public',
    description: 'This link would be available to anyone who has it',
  },
  {
    name: 'Require purchase of any asset',
    value: 'purchase',
    description:
      'Anyone who bought any assets from you will be able to access the link ',
  },
  {
    name: 'Require purchase of particular assets',
    value: 'purchase',

    description:
      "Anyone who bought one or more assets you'll pick will be able to access the link ",
  },
  {
    name: 'Require e-mail',
    value: 'email',
    description: 'Require e-mail validation to access the link',
  },
]

const RadioGroupOption =
  (settingIdx) =>
  ({ checked, children }) =>
    (
      <div
        className={classnames(
          settingIdx === 0 ? `rounded-tl-md rounded-tr-md` : '',
          settingIdx === settings.length - 1
            ? `rounded-bl-md rounded-br-md`
            : '',
          checked ? `bg-indigo-50 border-indigo-200 z-10` : `border-gray-200`,
          `relative border p-4 flex cursor-pointer focus:outline-none`,
        )}
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
            className={classnames(
              checked
                ? `bg-indigo-600 border-transparent`
                : `bg-white border-gray-300`,
              active ? `ring-2 ring-offset-2 ring-indigo-500` : '',
              `h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center`,
            )}
            aria-hidden="true"
          >
            <span className="rounded-full bg-white w-1.5 h-1.5" />
          </span>
          <div className="ml-3 flex flex-col">
            <RadioGroup.Label
              as="span"
              className={classnames(
                checked ? `text-indigo-900` : `text-gray-900`,
                `block text-sm font-medium`,
              )}
            >
              {setting.name}
            </RadioGroup.Label>
            <RadioGroup.Description
              as="span"
              className={classnames(
                checked ? `text-indigo-700` : `text-gray-500`,
                `block text-sm`,
              )}
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
    <>
      <RadioGroup value={selected} onChange={setSelected}>
        <RadioGroup.Label className="sr-only">Privacy setting</RadioGroup.Label>
        <div className="bg-white rounded-md -space-y-px">
          <List settings={settings} />
        </div>
      </RadioGroup>
      <SaveButton />
    </>
  )
}
