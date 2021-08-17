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

function AssetCategorySelector({ control, register, setValue }) {
  const FIELD_NAME = 'asset.categoryId'
  const assetCategories = useAssetCategories({})
  const assetCategoryId = register(FIELD_NAME, { required: true })
  const selectedCategoryId = useWatch({
    control,
    name: FIELD_NAME,
  })

  const selectedCategory = assetCategories.data?.find(
    (type) => type.id === selectedCategoryId,
  )

  return (
    <Popover
      content={
        <>
          {assetCategories.data?.map(({ id, name }) => (
            <ListChoice
              key={id}
              description="23 km from city center"
              onClick={() => setValue(FIELD_NAME, id)}
              title={name}
            />
          ))}
        </>
      }
      noPadding
    >
      <InputField
        inlineLabel
        label="Category"
        readOnly
        value={selectedCategory?.name}
      />
    </Popover>
  )
}

function AssetTypeSelector({ control, register, setValue }) {
  const FIELD_NAME = 'asset.assetTypeId'
  const assetTypes = useAssetTypes({})
  const assetTypeId = register(FIELD_NAME, { required: true })
  const selectedTypeId = useWatch({
    control,
    name: FIELD_NAME,
  })

  const selectedType = assetTypes.data?.find(
    (type) => type.id === selectedTypeId,
  )

  return (
    <Popover
      content={
        <>
          {assetTypes.data?.map(({ id, name }) => (
            <ListChoice
              key={id}
              description="23 km from city center"
              onClick={() => setValue(FIELD_NAME, id)}
              title={name}
            />
          ))}
        </>
      }
      noPadding
    >
      <InputField
        inlineLabel
        label="Asset Type"
        readOnly
        value={selectedType?.name}
      />
    </Popover>
  )
}

export default function CreatorDashboardLinkBasicScreen() {
  const { register, control, setValue } = useFormContext()

  const { creator, link } = useCreatorSpace()

  return (
    <main tw="max-w-3xl mx-auto pt-5 pb-12 px-4 lg:pb-16">
      <NextSeo title="Basic" />
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
          consectetur.
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
