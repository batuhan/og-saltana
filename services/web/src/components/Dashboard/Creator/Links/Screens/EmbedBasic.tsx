import useCreatorSpace from 'hooks/useCreatorSpace'
import { useFormContext } from 'react-hook-form'

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { ShieldCheckIcon, XIcon } from '@heroicons/react/outline'
import {
  CheckIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from '@heroicons/react/solid'

const product = {
  name: 'Everyday Ruck Snack',
  price: '$220',
  rating: 3.9,
  href: '#',
  imageSrc:
    'https://tailwindui.com/img/ecommerce-images/product-quick-preview-03-detail.jpg',
  imageAlt:
    'Interior of light green canvas bag with padded laptop sleeve and internal organization pouch.',
  sizes: [
    {
      name: 'Embedded',
      description: 'Embeds the content into your space with your styles',
    },
    {
      name: 'Redirection',
      description: 'Redirect to the destination while counting page views',
    },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Size() {
  const [open, setOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])

  return (
    <>
      <div className="sm:flex sm:justify-between">
        {/* Size selector */}
        <RadioGroup value={selectedSize} onChange={setSelectedSize}>
          <RadioGroup.Label className="block text-sm font-medium text-gray-700">
            Size
          </RadioGroup.Label>
          <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {product.sizes.map((size) => (
              <RadioGroup.Option
                as="div"
                key={size.name}
                value={size}
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
                      {size.name}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="p"
                      className="mt-1 text-sm text-gray-500"
                    >
                      {size.description}
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
          <span>What size should I buy?</span>
          <QuestionMarkCircleIcon
            className="flex-shrink-0 ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
        </a>
      </div>
    </>
  )
}

export default function NewBasic() {
  const { register, control, setValue } = useFormContext()

  const { creator, link, asset } = useCreatorSpace()

  return (
    <form className="space-y-8 divide-y divide-gray-200">
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
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <Size />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  )
}
