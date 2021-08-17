import React from 'react'
import tw, { styled, css } from 'twin.macro'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import getServerSidePropsForCreatorDashboardPages from '@/server/getServerSidePropsForCreatorDashboardPages'
import DashboardShell from 'components/Dashboard/Common/Shell'
import useApiMutation from 'hooks/useApiMutation'
import CreatorSlugField from 'components/Dashboard/Common/Inputs/CreatorPageSlug'
import useCreatorSpace from 'hooks/useCreatorSpace'

export default function CreatorDashboardCreateSmartLink(props) {
  const { creator } = useCreatorSpace()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const {
    query: { type },
    push,
  } = useRouter()

  const { mutateAsync } = useApiMutation('links', 'create', {
    onSuccess: ({ id }) => {
      push(`/${creator.data.username}/dashboard/links/${id}`)
    },
  })

  async function onSubmit({ destination, slug }) {
    await mutateAsync({ destination, slug, linkType: type })
  }

  return (
    <DashboardShell>
      <main tw="max-w-lg mx-auto pt-10 pb-12 px-4 lg:pb-16">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div tw="space-y-6">
            <div>
              <h1 tw="text-lg leading-6 font-medium text-gray-900">
                Create a smart link
              </h1>
              <p tw="mt-1 text-sm text-gray-500">
                Let’s get started by filling in the information below to create
                your new link.
              </p>
            </div>

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

            <CreatorSlugField
              register={register}
              username={creator.data.username}
              isSubmitting={isSubmitting}
              name="slug"
              errors={errors}
            />

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
