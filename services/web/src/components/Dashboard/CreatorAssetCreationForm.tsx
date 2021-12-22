import React, { useMemo } from 'react'

import AssetPriceField from 'components/Dashboard/Creator/Fields/AssetPriceField'
import AssetTypeSelector from 'components/Dashboard/Creator/Fields/AssetTypeSelector'
import classNames from '@/common/classnames'
import GenericFormFieldError from 'components/GenericFormFieldError'
import { useFormContext } from 'react-hook-form'
const getFieldName = (namePrefix, name) => namePrefix ? `${namePrefix}.${name}` : name

export default function CreatorDashboardCreateAsset({ namePrefix, form }) {
  const fields = React.useMemo(() => ({
    name: getFieldName(namePrefix, 'name'),
    description: getFieldName(namePrefix, 'description'),
    assetTypeId: getFieldName(namePrefix, 'assetTypeId'),
    price: getFieldName(namePrefix, 'price'),
    currency: getFieldName(namePrefix, 'currency')
  }), [namePrefix])
  const { register, setValue, formState: { errors, isSubmitting }, watch, control } = form

  return (

    <>

      <div>
        <label
          htmlFor={fields['description']}
          className="block text-sm font-medium text-gray-700"
        >
          Describe your asset with one or two sentences
        </label>
        <div className="mt-1">
          <textarea
            id={fields['description']}
            {...register(fields['description'], {
              required: true,
            })}
            rows={3}
            className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border border-gray-300 rounded-md"
            defaultValue=""
          />
        </div>
        <GenericFormFieldError errors={errors} fieldName={fields['description']} />

      </div>
      {/* <div>
        <label
          htmlFor="categoryId"
          className="block text-sm font-medium text-gray-700"
        >
          categoryId
        </label>
        <div className="mt-1">

          <AssetCategorySelector
            register={register}
            control={control}
            setValue={setValue}
            FIELD_NAME='categoryId'
          />
        </div>
        <GenericFormFieldError errors={errors} fieldName="categoryId" />

      </div> */}
      <div>
        {/* <label
          htmlFor="assetTypeId"
          className="block text-sm font-medium text-gray-700"
        >
          assetTypeId
        </label> */}
        <div className="mt-1">
          <AssetTypeSelector
            register={register}
            control={control}
            setValue={setValue}
            FIELD_NAME={fields['assetTypeId']}
          />
        </div>
        <GenericFormFieldError errors={errors} fieldName={fields['assetTypeId']} />

      </div>
      <div>

      </div>
      <AssetPriceField register={register}
        priceFieldName={fields['price']}
        currencyFieldName={fields['currency']} />
    </>

  )
}
