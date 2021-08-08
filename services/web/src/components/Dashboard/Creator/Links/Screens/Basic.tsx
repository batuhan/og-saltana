/* eslint-disable jsx-a11y/label-has-associated-control */
import { PlusIcon } from '@heroicons/react/outline'
import CreatorSlugField from 'components/Dashboard/Common/Fields/CreatorSlugField'
import useCreatorSpace from 'hooks/useCreatorSpace'
import React from 'react'
import 'twin.macro'

import { useFormContext } from 'react-hook-form'
import RichContentField from 'components/Dashboard/Common/Fields/RichContentField'
import AssetPriceField from 'components/Dashboard/Creator/Fields/AssetPriceField'
import { NextSeo } from 'next-seo'
import { Card, CardSection, InputField } from '@kiwicom/orbit-components'

export default function CreatorDashboardLinkBasicScreen() {
  const { register } = useFormContext()

  const { creator, link } = useCreatorSpace()

  return (
    <main>
      <NextSeo title="Basic" />
      <div tw="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
        {link.data?.linkType === 'asset' && (
          <>
            <div tw="sm:col-span-3">
              <label htmlFor="asset.name" tw="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                {...register('asset.name', {
                  required: true,
                })}
                tw="mt-1 block w-full rounded-md shadow-sm  sm:text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div tw="sm:col-span-3">
              <AssetPriceField register={register} />
            </div>
          </>
        )}
      </div>
      <div tw="space-y-6 sm:col-span-6">
        <div tw="px-10 py-5">
          <h3 tw="text-lg leading-6 font-medium text-gray-900">Description</h3>
          <p tw="mt-1 text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit quam
            corrupti consectetur.
          </p>
          <div tw=" ">
            <RichContentField
              fieldName="link.content"
              content={link.data?.content}
            />
          </div>
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
