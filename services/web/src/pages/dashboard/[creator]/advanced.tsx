import CreatorDashboardSettingsShell from 'components/Dashboard/Creator/SettingsShell'

import _ from 'lodash'
import getServerSidePropsForCreatorDashboardPages from '@/server/getServerSidePropsForCreatorDashboardPages'
import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'

import Uploader from 'components/ContentEditor/Editor/Uploader'

const Editor = dynamic(
  () => import('components/ContentEditor/Editor/EditorSink'),
  {
    ssr: false,
  },
)

export function ExampleOther() {
  return (
    <form tw="space-y-8 divide-y divide-gray-200">
      <div tw="space-y-8 divide-y divide-gray-200">
        <div>
          <div tw="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div tw="sm:col-span-4">
              <label
                htmlFor="username"
                tw="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div tw="mt-1 flex rounded-md shadow-sm">
                <span tw="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  workcation.com/
                </span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="username"
                  tw="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                />
              </div>
            </div>

            <div tw="sm:col-span-6">
              <label
                htmlFor="about"
                tw="block text-sm font-medium text-gray-700"
              >
                About
              </label>
              <div tw="mt-1">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  tw="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  defaultValue=""
                />
              </div>
              <p tw="mt-2 text-sm text-gray-500">
                Write a few sentences about yourself.
              </p>
            </div>

            <div tw="sm:col-span-6">
              <label
                htmlFor="photo"
                tw="block text-sm font-medium text-gray-700"
              >
                Photo
              </label>
              <div tw="mt-1 flex items-center">
                <span tw="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  <svg
                    tw="h-full w-full text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <button
                  type="button"
                  tw="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Change
                </button>
              </div>
            </div>

            <div tw="sm:col-span-6">
              <label
                htmlFor="photo"
                tw="block text-sm font-medium text-gray-700"
              >
                Photo
              </label>
              <div tw="mt-1 flex items-center">werew</div>
            </div>

            <div tw="sm:col-span-6">
              <label
                htmlFor="cover_photo"
                tw="block text-sm font-medium text-gray-700"
              >
                Cover photo
              </label>
              <div tw="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 rounded-md">
                <Uploader />
              </div>
            </div>

            <div tw="sm:col-span-6">
              <label
                htmlFor="cover_photo"
                tw="block text-sm font-medium text-gray-700"
              >
                Links
              </label>
              <div tw="mt-1 w-full ">
                <Editor />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div tw="pt-5">
        <div tw="flex justify-end">
          <button
            type="button"
            tw="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            tw="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  )
}

export default function CreatorDashboardCustomize() {
  return (
    <CreatorDashboardSettingsShell>
      <NextSeo title="Advanced Settings" />
      <ExampleOther />
    </CreatorDashboardSettingsShell>
  )
}

export const getServerSideProps = getServerSidePropsForCreatorDashboardPages()
