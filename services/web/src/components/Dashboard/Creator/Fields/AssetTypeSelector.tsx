import { ListChoice, InputField, Popover } from '@kiwicom/orbit-components'
import useApi from 'hooks/useApi'
import useAssetTypes from 'hooks/useAssetTypes'
import React, { useMemo, useState } from 'react'
import { useWatch } from 'react-hook-form'
/* This example requires Tailwind CSS v2.0+ */
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/solid'

const assetTypes = [
  { id: 'typ_F6MUvze1YT01mXJDTYT0', title: 'One-time', fee: '5% fee', description: 'Sell access to any content or service in exchange with a single payment ' },
  { id: 2, title: 'Subscription', fee: '', description: 'Sell access to any content or service in exchange with recurring payment', disabled: true },
  { id: 3, title: 'Time-based services', fee: '', description: 'Sell any resource with a time constraint like online meetings, freelance services and more ', disabled: true },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AssetTypeSelector({
  control,
  register,
  setValue,
  FIELD_NAME = 'asset.assetTypeId',
}) {

  const assetTypeId = register(FIELD_NAME, { required: true })

  const selectedAssetType = useWatch({
    control,
    name: FIELD_NAME,
  })

  return (
    <RadioGroup value={selectedAssetType} onChange={(value) => setValue(FIELD_NAME, value)}>
      <RadioGroup.Label className="text-base font-small text-gray-900">Pick a type for your asset</RadioGroup.Label>

      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
        {assetTypes.map((assetType) => (
          <RadioGroup.Option
            key={assetType.id}
            value={assetType.id}
            disabled={assetType.disabled}
            className={({ checked, active }) =>
              classNames(
                checked ? 'border-transparent' : 'border-gray-300',
                active ? 'ring-2 ring-indigo-500' : '',
                'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
              )
            }
          >
            {({ checked, active }) => (
              <>
                <div className="flex-1 flex">
                  <div className="flex flex-col">
                    <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                      {assetType.title}
                    </RadioGroup.Label>
                    <RadioGroup.Description as="span" className="mt-1 flex items-center text-sm text-gray-500">
                      {assetType.description}
                    </RadioGroup.Description>
                    {assetType.disabled ? <RadioGroup.Description as="span" className="mt-6 text-sm font-medium text-gray-900">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                        Coming Soon
                      </span>
                    </RadioGroup.Description> : <RadioGroup.Description as="span" className="mt-6 text-sm font-medium text-gray-900">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                        {assetType.fee}
                      </span>
                    </RadioGroup.Description>}
                  </div>
                </div>
                <CheckCircleIcon
                  className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-indigo-600')}
                  aria-hidden="true"
                />
                <div
                  className={classNames(
                    active ? 'border' : 'border-2',
                    checked ? 'border-indigo-500' : 'border-transparent',
                    'absolute -inset-px rounded-lg pointer-events-none'
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
