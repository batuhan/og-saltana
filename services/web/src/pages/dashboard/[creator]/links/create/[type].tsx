import React, { useMemo } from 'react'
import tw, { styled, css } from 'twin.macro'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import getServerSidePropsForCreatorDashboardPages from '@/server/getServerSidePropsForCreatorDashboardPages'
import DashboardShell from 'components/Dashboard/Common/Shell'
import useApiMutation from 'hooks/useApiMutation'
import CreatorSlugField from 'components/Dashboard/Common/Inputs/CreatorPageSlug'
import useCreatorSpace from 'hooks/useCreatorSpace'

import linkTypes from '@/common/link-types'
import AssetPriceField from 'components/Dashboard/Creator/Fields/AssetPriceField'
import AssetTypeSelector from 'components/Dashboard/Creator/Fields/AssetTypeSelector'
import AssetCategorySelector from 'components/Dashboard/Creator/Fields/AssetCategorySelector'
export default function CreatorDashboardCreateSmartLink(props) {
  const { creator } = useCreatorSpace()
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm()

  const {
    query: { type },
    push,
  } = useRouter()

  const typeData = useMemo(
    () => linkTypes.find((linkType) => linkType.type === type),
    [type],
  )

  const { mutateAsync } = useApiMutation('links', 'create', {
    onSuccess: ({ id }) => {
      push(`/${creator.data.username}/dashboard/links/${id}`)
    },
  })

  async function onSubmit(formValues) {
    await mutateAsync({ ...formValues, linkType: type })
  }

  return (
    <DashboardShell>
      <main tw="max-w-lg mx-auto pt-10 pb-12 px-4 lg:pb-16">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div tw="space-y-6">
            <div>
              <h1 tw="text-lg leading-6 font-medium text-gray-900">
                {typeData.createTitle}
              </h1>
              <p tw="mt-1 text-sm text-gray-500">
                Let’s get started by filling in the information below to create
                your new link.
              </p>
            </div>

            {typeData.createFields.includes('destination') && (
              <div>
                <label
                  htmlFor="destination"
                  tw="block text-sm font-medium text-gray-700"
                >
                  Destination (URL)
                </label>
                <div tw="mt-1">
                  <input
                    type="text"
                    {...register('destination', {
                      required: true,
                    })}
                    disabled={isSubmitting}
                    id="destination"
                    css={[
                      isSubmitting && tw`disabled:opacity-50`,
                      tw`block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md`,
                    ]}
                    placeholder="https://notion.so/test-change-this"
                  />
                </div>
                {errors.destination && (
                  <div>{JSON.stringify(errors.destination)}</div>
                )}
              </div>
            )}

            {type === 'asset' && (
              <>
                <div>
                  <label
                    htmlFor="name"
                    tw="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div tw="mt-1">
                    <input
                      type="text"
                      {...register('name', {
                        required: true,
                      })}
                      id="name"
                      tw="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="asset.description"
                    tw="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <div tw="mt-1">
                    <textarea
                      id="asset.description"
                      {...register('asset.description', {
                        required: true,
                      })}
                      rows={3}
                      tw="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border border-gray-300 rounded-md"
                      defaultValue=""
                    />
                  </div>
                </div>
                <div>
                  <AssetTypeSelector
                    register={register}
                    control={control}
                    setValue={setValue}
                  />
                </div>
                <div>
                  <AssetCategorySelector
                    register={register}
                    control={control}
                    setValue={setValue}
                  />
                </div>
                <AssetPriceField register={register} />
              </>
            )}
            {typeData.createFields.includes('slug') && (
              <CreatorSlugField
                register={register}
                username={creator.data.username}
                isSubmitting={isSubmitting}
                name="slug"
                errors={errors}
              />
            )}

            <div tw="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                css={[
                  isSubmitting && tw`disabled:opacity-50`,
                  tw`ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`,
                ]}
              >
                {isSubmitting ? 'Creating your new link' : 'Create my link'}
              </button>
            </div>
          </div>
        </form>
      </main>
    </DashboardShell>
  )
}

export const getServerSideProps = getServerSidePropsForCreatorDashboardPages()
