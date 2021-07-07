import React from 'react'
import tw, { styled, css } from 'twin.macro'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { Switch } from '@headlessui/react'
import getServerSidePropsForCreatorDashboardPages from '@/server/getServerSidePropsForCreatorDashboardPages'
import DashboardShell from 'components/Dashboard/Common/Shell'
import useApiMutation from 'hooks/useApiMutation'
import useCurrentUser from 'hooks/useCurrentUser'

export default function CreatorDashboardCreateSmartLink(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const router = useRouter()
  const { type } = router.query
  const user = useCurrentUser()
  const addLink = useApiMutation('links', 'create', {
    onSuccess: ({ id }) => {
      router.push(`/${user.data.username}/dashboard/links/${id}`)
    },
  })

  function onSubmit({ destination, slug }) {
    return addLink.mutate({ destination, slug, linkType: type })
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
                your new project.
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
                  id="destination"
                  tw="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                  defaultValue="https://notion.so/test-change-this"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="slug"
                tw="block text-sm font-medium text-gray-700"
              >
                Link
              </label>
              <div tw="mt-1 sm:mt-0 sm:col-span-2">
                <div tw="max-w-lg flex rounded-md shadow-sm">
                  <span tw="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    saltana.com/batuhan/
                  </span>
                  <input
                    type="text"
                    name="slug"
                    id="slug"
                    {...register('slug', {
                      required: true,
                    })}
                    autoComplete="slug"
                    tw="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
              </div>
            </div>

            <div tw="flex justify-end">
              <button
                type="submit"
                disabled={addLink.isLoading}
                tw="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                Create the link
              </button>
            </div>
          </div>
        </form>
      </main>
    </DashboardShell>
  )
}

export const getServerSideProps = getServerSidePropsForCreatorDashboardPages()
