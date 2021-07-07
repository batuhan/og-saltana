import React from 'react'

import tw, { styled, css } from 'twin.macro'
import { useForm } from 'react-hook-form'

import { useRouter } from 'next/router'

import { NextSeo } from 'next-seo'
import getServerSidePropsForCreatorDashboardPages from '@/server/getServerSidePropsForCreatorDashboardPages'
import DashboardShell from 'components/Dashboard/Common/Shell'
import useApi from 'hooks/useApi'
import useApiMutation from 'hooks/useApiMutation'
import useCurrentUser from 'hooks/useCurrentUser'
import CreatorSlugField from 'components/Dashboard/Common/Fields/CreatorSlugField'
import AssetCategoryField from 'components/Dashboard/Creator/Fields/AssetCategoryField'
import AssetPriceField from 'components/Dashboard/Creator/Fields/AssetPriceField'

export default function CreatorDashboardCreateSmartLink(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const router = useRouter()
  const assetTypes = useApi('assetTypes', 'list', {})

  const user = useCurrentUser()
  const addLink = useApiMutation('links', 'create', {
    onSuccess: ({ id }) => {
      router.push(`/${user.data.username}/dashboard/links/${id}`)
    },
  })

  function onSubmit(data) {
    return addLink.mutate({ ...data, linkType: 'asset' })
  }

  return (
    <DashboardShell>
      <NextSeo title="Create an asset link" />
      <main tw="max-w-lg mx-auto pt-10 pb-12 px-4 lg:pb-16">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div tw="space-y-6">
            <div>
              <h1 tw="text-lg leading-6 font-medium text-gray-900">
                Create an asset
              </h1>
              <p tw="mt-1 text-sm text-gray-500">
                Let’s get started by filling in the information below to create
                your new asset.
              </p>
            </div>
            {errors && <p>{JSON.stringify(errors)}</p>}
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
              <label
                htmlFor="asset.assetTypeId"
                tw="block text-sm font-medium text-gray-700"
              >
                Asset Type
              </label>
              <select
                id="asset.assetTypeId"
                tw="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                {...register('asset.assetTypeId', {
                  required: true,
                })}
              >
                {assetTypes.data.map(({ name, id }) => {
                  return (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  )
                })}
              </select>
            </div>
            <AssetCategoryField register={register} />
            <AssetPriceField register={register} />
            <CreatorSlugField
              register={register}
              username={user.data.username}
            />
            <div tw="flex justify-end">
              <button
                type="submit"
                disabled={addLink.isLoading}
                tw="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                Create the asset
              </button>
            </div>
          </div>
        </form>
      </main>
    </DashboardShell>
  )
}

export const getServerSideProps = getServerSidePropsForCreatorDashboardPages(
  async ({ session, instance, queryClient }) => {
    const [assetTypes, categories] = await Promise.all([
      instance.assetTypes.list(),
      instance.categories.list(),
    ])

    queryClient.setQueryData(['assetTypes', 'list', {}], assetTypes)
    queryClient.setQueryData(['categories', 'list', {}], categories)

    return {}
  }
)
