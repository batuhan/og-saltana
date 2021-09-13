/* eslint-disable jsx-a11y/label-has-associated-control */
import { PlusIcon } from '@heroicons/react/outline'
import useCreatorSpace from 'hooks/useCreatorSpace'
import React from 'react'
import 'twin.macro'
import ContentEditor from 'components/ContentEditor/ContentEditor'

import { useFormContext, useWatch } from 'react-hook-form'
import AssetPriceField from 'components/Dashboard/Creator/Fields/AssetPriceField'
import { NextSeo } from 'next-seo'
import {
  Card,
  CardSection,
  InputField,
  ListChoice,
  Popover,
} from '@kiwicom/orbit-components'
import useAssetTypes from 'hooks/useAssetTypes'
import useAssetCategories from 'hooks/useAssetCategories'
import AssetCategorySelector from '../../Fields/AssetCategorySelector'
import AssetTypeSelector from '../../Fields/AssetTypeSelector'
/* This example requires Tailwind CSS v2.0+ */
import { DotsVerticalIcon } from '@heroicons/react/solid'

const projects = [
  {
    name: 'Graph API',
    initials: 'GA',
    href: '#',
    members: 16,
    bgColor: 'bg-pink-600',
  },
  {
    name: 'Component Design',
    initials: 'CD',
    href: '#',
    members: 12,
    bgColor: 'bg-purple-600',
  },
  {
    name: 'Templates',
    initials: 'T',
    href: '#',
    members: 16,
    bgColor: 'bg-yellow-500',
  },
  {
    name: 'React Components',
    initials: 'RC',
    href: '#',
    members: 8,
    bgColor: 'bg-green-500',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import AssetScreen from '../../Assets/AssetScreen'

function AssetViewSide({ asset, open, setOpen }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-3xl">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="py-6 px-4 bg-indigo-700 sm:px-6">
                    <div className="flex items-center justify-between">
                      <Dialog.Title className="text-lg font-medium text-white">
                        Panel title
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="bg-indigo-700 rounded-md text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm text-indigo-300">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit
                        aliquam ad hic recusandae soluta.
                      </p>
                    </div>
                  </div>
                  <AssetScreen assetId={asset.data.id} />
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

function Example({ asset }) {
  const [open, setOpen] = useState(true)

  return (
    <div>
      <AssetViewSide open={open} setOpen={setOpen} asset={asset} />
      <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
        Pinned Projects
      </h2>
      <ul
        role="list"
        className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-2"
      >
        {projects.map((project) => (
          <li
            key={project.name}
            className="col-span-1 flex shadow-sm rounded-md"
          >
            <div className="flex-1 flex items-center justify-between border-l border-t border-r border-b border-gray-200 bg-white rounded-r-md  rounded-l-md  truncate">
              <div className="flex-1 px-4 py-2 text-sm truncate">
                <a
                  href={project.href}
                  className="text-gray-900 font-medium hover:text-gray-600"
                >
                  {project.name}
                </a>
                <p className="text-gray-500">{project.members} Members</p>
              </div>
              <div className="flex-shrink-0 pr-2">
                <button
                  type="button"
                  className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">Open options</span>
                  <DotsVerticalIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function CreatorDashboardLinkBasicScreen() {
  const { register, control, setValue } = useFormContext()

  const { creator, link, asset } = useCreatorSpace()

  return (
    <main tw="max-w-3xl mx-auto pt-5 pb-12 px-4 lg:pb-16">
      <NextSeo title="Basic" />
      <Example asset={asset} />
      {link.data?.linkType === 'asset' && (
        <>
          <div tw="mb-4">
            <label
              htmlFor="asset.name"
              tw="block text-sm font-medium text-gray-700"
            >
              Asset Name
            </label>
            <div tw="mt-1">
              <input
                type="text"
                id="asset.name"
                {...register('asset.name', {
                  required: true,
                })}
                tw="block focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-5 pr-12 sm:text-sm border-gray-300 rounded-md"
                defaultValue="Asset Nero"
              />
            </div>
          </div>
          <div tw="mb-4">
            <AssetCategorySelector
              register={register}
              control={control}
              setValue={setValue}
            />
          </div>

          <div tw="mb-4">
            <AssetTypeSelector
              register={register}
              control={control}
              setValue={setValue}
            />
          </div>
          <div tw="mb-4">
            <label
              htmlFor="asset.name"
              tw="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <div tw="mt-1">
              <AssetPriceField register={register} />
            </div>
          </div>
        </>
      )}
      <div tw="mb-4">
        <label
          htmlFor="asset.name"
          tw="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <p tw="mt-1 text-sm text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit quam corrupti
          consectetur. c
        </p>
        <div tw="mt-3">
          <ContentEditor fieldName="link.content" />
        </div>
      </div>
      {link.data?.linkType !== 'asset' && link.data?.destination && (
        <div tw="space-y-6">
          <div>
            <label
              htmlFor="link.destination"
              tw="block text-sm font-medium text-gray-700"
            >
              Destination
            </label>
            <div tw="mt-1">
              <input
                type="text"
                {...register('link.destination', {
                  required: true,
                })}
                id="link.destination"
                tw="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
