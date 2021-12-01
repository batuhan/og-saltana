/* eslint-disable jsx-a11y/label-has-associated-control */
import { PlusIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline'
import useCreatorSpace from 'hooks/useCreatorSpace'
import React from 'react'

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
import SaveButton from '../../SaveButton'

export default function CreatorDashboardLinkBasicScreen({ asset }) {
  const { register, control, setValue } = useFormContext()

  return (
    <section aria-labelledby="payment-details-heading">
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="bg-white py-6 px-4 sm:p-6">
          <div>
            <h2
              id="payment-details-heading"
              className="text-lg leading-6 font-medium text-gray-900"
            >
              Basic information
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Update your billing information.Please note that updating your
              location could affect your tax rates.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-6">
            <div className="col-span-4 sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                {...register('name', { required: true })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="description"
                className="flex items-center text-sm font-medium text-gray-700"
              >
                <span>Description</span>
                <QuestionMarkCircleIcon
                  className="ml-1 flex-shrink-0 h-5 w-5 text-gray-300"
                  aria-hidden="true"
                />
              </label>
              <div className="mt-1">
                <textarea
                  rows={4}
                  {...register('description', { required: true })}
                  className="block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <p className="mt-3 text-sm text-gray-700">
                Brief description for this asset that will be shown on the
                checkout screens and invoices.
              </p>
            </div>

            <div className="col-span-4 sm:col-span-2">
              <label
                htmlFor="categoryId"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <AssetCategorySelector
                register={register}
                control={control}
                setValue={setValue}
                FIELD_NAME="categoryId"
              />
            </div>

            <div className="col-span-4 sm:col-span-2">
              <label
                htmlFor="assetTypeId"
                className="block text-sm font-medium text-gray-700"
              >
                Type
              </label>

              <AssetTypeSelector
                register={register}
                control={control}
                setValue={setValue}
                FIELD_NAME="assetTypeId"
              />
            </div>
          </div>

          <div className="mt-6">
            <h3
              id="payment-details-heading"
              className="text-md leading-6 font-medium text-gray-900"
            >
              Pricing
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Update your billing information.Please note that updating your
              location could affect your tax rates.
            </p>
          </div>

          <div className="mt-2 grid grid-cols-4 gap-6">
            <div className="col-span-4 sm:col-span-2">
              <AssetPriceField
                register={register}
                priceFieldName="price"
                currencyFieldName="currency"
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <SaveButton />
        </div>
      </div>
    </section>
  )
}
