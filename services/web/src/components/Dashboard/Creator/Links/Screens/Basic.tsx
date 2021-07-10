import { PlusIcon } from '@heroicons/react/outline'
import CreatorSlugField from 'components/Dashboard/Common/Fields/CreatorSlugField'
import useCreatorSpace from 'hooks/useCreatorSpace'
import React from 'react'
import 'twin.macro'

import { useFormContext } from 'react-hook-form'
import RichContentField from 'components/Dashboard/Common/Fields/RichContentField'
import AssetPriceField from 'components/Dashboard/Creator/Fields/AssetPriceField'
import { NextSeo } from 'next-seo'

export default function CreatorDashboardLinkBasicScreen() {
  const { register } = useFormContext()

  const { creator, link } = useCreatorSpace()

  return (
    <main>
      <NextSeo title="Basic" />

      {link.data?.linkType === 'asset' && (
        <AssetPriceField register={register} />
      )}

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

      {link.data?.linkType === 'asset' && (
        <div tw="space-y-10">
          <div>
            <label
              htmlFor="description"
              tw="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <div tw="mt-1">
              <RichContentField register={register} />
            </div>
          </div>
        </div>
      )}

      <div tw="space-y-10">
        <CreatorSlugField
          username={creator.data.username}
          register={register}
        />
      </div>
    </main>
  )
}
