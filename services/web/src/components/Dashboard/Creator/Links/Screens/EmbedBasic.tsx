import useCreatorSpace from 'hooks/useCreatorSpace'
import { useFormContext, Controller } from 'react-hook-form'

import React, { Fragment, useState } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import {
  CheckIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from '@heroicons/react/solid'
import classNames from '@/common/classnames'
import SaveButton from '../../SaveButton'

const _linkTypes = {
  embed: {
    name: 'Embedded',
    description: 'Embeds the content into your space with your styles',
  },
  redirect: {
    name: 'Redirection',
    description: 'Redirect to the destination while counting page views',
  },
}

function LinkType({ onChange, onBlur, value }) {
  return (
    <>
      <div className="sm:flex sm:justify-between">
        <RadioGroup value={value} onChange={onChange}>
          <RadioGroup.Label className="block text-sm font-medium text-gray-700">
            Type
          </RadioGroup.Label>
          <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Object.keys(_linkTypes).map((linkType) => (
              <RadioGroup.Option
                as="div"
                key={linkType}
                value={linkType}
                className={({ active }) =>
                  classNames(
                    active ? 'ring-2 ring-indigo-500' : '',
                    'relative block border border-gray-300 rounded-lg p-4 cursor-pointer focus:outline-none',
                  )
                }
              >
                {({ active, checked }) => (
                  <>
                    <RadioGroup.Label
                      as="p"
                      className="text-base font-medium text-gray-900"
                    >
                      {_linkTypes[linkType].name}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="p"
                      className="mt-1 text-sm text-gray-500"
                    >
                      {_linkTypes[linkType].description}
                    </RadioGroup.Description>
                    <div
                      className={classNames(
                        active ? 'border' : 'border-2',
                        checked ? 'border-indigo-500' : 'border-transparent',
                        'absolute -inset-px rounded-lg pointer-events-none',
                      )}
                      aria-hidden="true"
                    />
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      <div className="mt-4 flex">
        <a
          href="#"
          className="group flex text-sm text-gray-500 hover:text-gray-700"
        >
          <span>Which option should I use?</span>
          <QuestionMarkCircleIcon
            className="flex-shrink-0 ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
        </a>
      </div>
    </>
  )
}

export default function EmbedBasic() {
  const { register, control, setValue } = useFormContext()

  return (
    <div className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div className="sm:col-span-4">
            <label
              htmlFor="destination"
              className="block text-sm font-medium text-gray-700"
            >
              Destination
            </label>
            <div className="mt-1">
              <input
                type="url"
                {...register('destination', {
                  required: true,
                })}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="sm:col-span-4 mt-2">
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-700"
            >
              Slug
            </label>
            <div className="mt-1">
              <input
                type="text"
                {...register('slug', {
                  required: true,
                })}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <Controller
                control={control}
                name="linkType"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <LinkType onChange={onChange} onBlur={onBlur} value={value} />
                )}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <SaveButton />
        </div>
      </div>
    </div>
  )
}
