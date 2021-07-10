import { PlusIcon } from '@heroicons/react/outline'
import CreatorSlugField from 'components/Dashboard/Common/Fields/CreatorSlugField'
import useCreatorSpace from 'hooks/useCreatorSpace'
import { NextSeo } from 'next-seo'
import 'twin.macro'

import { useFormContext } from 'react-hook-form'

export default function CreatorDashboardLinkOrderScreen() {
  const methods = useFormContext()

  console.log('methods', methods)
  const { creator } = useCreatorSpace()

  return (
    <main>
      <NextSeo title="Order #23432" />

      <CreatorSlugField username={creator.data.username} {...methods} />

      <div tw="space-y-6">
        <div>
          <label
            htmlFor="destination"
            tw="block text-sm font-medium text-gray-700"
          >
            Destination
          </label>
          <div tw="mt-1">
            <input
              type="text"
              {...methods.register('destination', {
                required: true,
              })}
              id="destination"
              tw="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <div tw="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
            <div tw="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
              <div tw="ml-4 mt-2">
                <h3 tw="text-lg leading-6 font-medium text-gray-900">
                  Preview
                </h3>
              </div>
              <div tw="ml-4 mt-2 flex-shrink-0">
                <button
                  type="button"
                  tw="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create new job
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor="description"
            tw="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <div tw="mt-1">
            <textarea
              id="description"
              name="description"
              rows={3}
              tw="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border border-gray-300 rounded-md"
              defaultValue=""
            />
          </div>
        </div>

        <div tw="space-y-2">
          <div tw="space-y-1">
            <label
              htmlFor="add_team_members"
              tw="block text-sm font-medium text-gray-700"
            >
              Add Team Members
            </label>
            <p id="add_team_members_helper" tw="sr-only">
              Search by email address
            </p>
            <div tw="flex">
              <div tw="flex-grow">
                <input
                  type="text"
                  name="add_team_members"
                  id="add_team_members"
                  tw="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Email address"
                  aria-describedby="add_team_members_helper"
                />
              </div>
              <span tw="ml-3">
                <button
                  type="button"
                  tw="bg-white inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  <PlusIcon
                    tw="-ml-2 mr-1 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span>Add</span>
                </button>
              </span>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="tags" tw="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            tw="mt-1 block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div tw="flex justify-end">
          <button
            type="button"
            tw="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            tw="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Create this project
          </button>
        </div>
      </div>
    </main>
  )
}
