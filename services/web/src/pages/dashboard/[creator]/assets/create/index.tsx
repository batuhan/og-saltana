import React, { useMemo } from 'react'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import getServerSidePropsForCreatorDashboardPages from '@/server/getServerSidePropsForCreatorDashboardPages'
import CreatorDashboardAssetsLayout from 'components/Dashboard/Creator/Assets/Layout'
import useApiMutation from 'hooks/useApiMutation'
import CreatorSlugField from 'components/Dashboard/Common/Inputs/CreatorPageSlug'
import useCreatorSpace from 'hooks/useCreatorSpace'

import AssetPriceField from 'components/Dashboard/Creator/Fields/AssetPriceField'
import AssetTypeSelector from 'components/Dashboard/Creator/Fields/AssetTypeSelector'
import AssetCategorySelector from 'components/Dashboard/Creator/Fields/AssetCategorySelector'
import classNames from '@/common/classnames'
import GenericFormFieldError from 'components/GenericFormFieldError'

export default function CreatorDashboardCreateAsset(props) {
  const { creator } = useCreatorSpace()
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm()

  const {
    push,
  } = useRouter()


  const { mutateAsync } = useApiMutation('assets', 'create', {
    onSuccess: ({ id }) => {
      push(`/dashboard/${creator.data.username}/assets/${id}#ref=create`)
    },
  })

  async function onSubmit(formValues) {
    await mutateAsync({ ...formValues })
  }

  return (
    <CreatorDashboardAssetsLayout>
      <main className="max-w-2xl mx-auto pt-10 pb-12 px-4 lg:pb-16">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div>
              <h1 className="text-lg leading-6 font-medium text-gray-900">
                Create a new asset
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Let’s get started by filling in the information below to create
                your new
              </p>
            </div>

            <>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    {...register('name', {
                      required: true,
                    })}
                    id="name"
                    className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <GenericFormFieldError errors={errors} fieldName="name" />

              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Describe your asset with one or two sentences
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    {...register('description', {
                      required: true,
                    })}
                    rows={3}
                    className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border border-gray-300 rounded-md"
                    defaultValue=""
                  />
                </div>
                <GenericFormFieldError errors={errors} fieldName="name" />

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
                    FIELD_NAME='assetTypeId'
                  />
                </div>
                <GenericFormFieldError errors={errors} fieldName="assetTypeId" />

              </div>
              <div>

              </div>
              <AssetPriceField register={register}
                priceFieldName={'price'}
                currencyFieldName={'currency'} />
            </>
            <div>Deliverables for this asset can be added in the next page.</div>
            <div className="flex justify-end bg-black">
              <button
                type="submit"
                disabled={isSubmitting}
                className={classNames(
                  isSubmitting && `disabled:opacity-50`,
                  `ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`,
                )}
              >
                {isSubmitting ? 'Creating your new asset' : 'Create asset'}
              </button>
            </div>
          </div>
        </form>
      </main>
    </CreatorDashboardAssetsLayout>
  )
}

export const getServerSideProps = getServerSidePropsForCreatorDashboardPages()
