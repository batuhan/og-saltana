import DashboardShell from '../../components/DashboardShell/DashboardShell'
import {
  getSaltanaInstance,
  sharedQueryClient,
  useApi,
  useUpdateCurrentUser,
} from '../../modules/api'
import tw, { styled, css } from 'twin.macro'
import _ from 'lodash'

import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import React, { useEffect } from 'react'
import { NextSeo } from 'next-seo'

import { getSession, useSession } from 'next-auth/client'
import { GetServerSideProps } from 'next'
import { dehydrate } from 'react-query/hydration'
import { useQuery, useQueryClient } from 'react-query'
export default function DashboardUserSettings({ userId }) {
  const queryClient = useQueryClient()
  const { data, isLoading } = useApi('users', 'read', userId)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: _.pick(data, ['firstname', 'lastname', 'email', 'metadata']),
  })

  const updateUserSettings = useUpdateCurrentUser()

  function onSubmit(data) {
    return updateUserSettings.mutateAsync(data)
  }

  return (
    <DashboardShell>
      <NextSeo title="Account Settings" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        tw="space-y-8 divide-y divide-gray-200 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-2xl lg:px-8"
      >
        <div tw="space-y-8 divide-y divide-gray-200">
          <div tw="pt-8">
            <div>
              <h3 tw="text-lg leading-6 font-medium text-gray-900">
                Personal Information
              </h3>
              <p tw="mt-1 text-sm text-gray-500">
                Use a permanent address where you can receive mail.
              </p>
            </div>
            <div tw="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div tw="sm:col-span-3">
                <label
                  htmlFor="firstname"
                  tw="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <div tw="mt-1">
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    autoComplete="given-name"
                    {...register('firstname', {
                      required: true,
                    })}
                    tw="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                {errors.firstname && (
                  <p tw="text-red-500 text-sm mt-2">
                    First name is required :(
                  </p>
                )}
              </div>

              <div tw="sm:col-span-3">
                <label
                  htmlFor="lastname"
                  tw="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <div tw="mt-1">
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    {...register('lastname', {
                      required: true,
                    })}
                    autoComplete="family-name"
                    tw="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div tw="sm:col-span-4">
                <label
                  htmlFor="email"
                  tw="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div tw="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    disabled
                    autoComplete="email"
                    {...register('email', {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                    placeholder="E-mail address"
                    tw="disabled:opacity-50 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div tw="sm:col-span-3">
                <label
                  htmlFor="country"
                  tw="block text-sm font-medium text-gray-700"
                >
                  Country / Region
                </label>
                <div tw="mt-1">
                  <select
                    id="country"
                    name="country"
                    {...register('metadata._private.address_country', {
                      required: true,
                    })}
                    autoComplete="country"
                    tw="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>

              <div tw="sm:col-span-6">
                <label
                  htmlFor="street_address"
                  tw="block text-sm font-medium text-gray-700"
                >
                  Street address
                </label>
                <div tw="mt-1">
                  <input
                    type="text"
                    name="street_address"
                    id="street_address"
                    autoComplete="street-address"
                    tw="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div tw="sm:col-span-2">
                <label
                  htmlFor="city"
                  tw="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <div tw="mt-1">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    tw="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div tw="sm:col-span-2">
                <label
                  htmlFor="state"
                  tw="block text-sm font-medium text-gray-700"
                >
                  State / Province
                </label>
                <div tw="mt-1">
                  <input
                    type="text"
                    name="state"
                    id="state"
                    tw="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div tw="sm:col-span-2">
                <label
                  htmlFor="zip"
                  tw="block text-sm font-medium text-gray-700"
                >
                  ZIP / Postal
                </label>
                <div tw="mt-1">
                  <input
                    type="text"
                    name="zip"
                    id="zip"
                    autoComplete="postal-code"
                    tw="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>

          <div tw="pt-8">
            <div>
              <h3 tw="text-lg leading-6 font-medium text-gray-900">
                Notifications
              </h3>
              <p tw="mt-1 text-sm text-gray-500">
                We&apos;ll always let you know about important changes, but you
                pick what else you want to hear about.
              </p>
            </div>
            <div tw="mt-6">
              <fieldset>
                <legend tw="text-base font-medium text-gray-900">
                  By Email
                </legend>
                <div tw="mt-4 space-y-4">
                  <div tw="relative flex items-start">
                    <div tw="flex items-center h-5">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        tw="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div tw="ml-3 text-sm">
                      <label htmlFor="comments" tw="font-medium text-gray-700">
                        Comments
                      </label>
                      <p tw="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div tw="relative flex items-start">
                    <div tw="flex items-center h-5">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        tw="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div tw="ml-3 text-sm">
                      <label
                        htmlFor="candidates"
                        tw="font-medium text-gray-700"
                      >
                        Candidates
                      </label>
                      <p tw="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div tw="relative flex items-start">
                    <div tw="flex items-center h-5">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        tw="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div tw="ml-3 text-sm">
                      <label htmlFor="offers" tw="font-medium text-gray-700">
                        Offers
                      </label>
                      <p tw="text-gray-500">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset tw="mt-6">
                <div>
                  <legend tw="text-base font-medium text-gray-900">
                    Push Notifications
                  </legend>
                  <p tw="text-sm text-gray-500">
                    These are delivered via SMS to your mobile phone.
                  </p>
                </div>
                <div tw="mt-4 space-y-4">
                  <div tw="flex items-center">
                    <input
                      id="push_everything"
                      name="push_notifications"
                      type="radio"
                      tw="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      htmlFor="push_everything"
                      tw="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Everything
                    </label>
                  </div>
                  <div tw="flex items-center">
                    <input
                      id="push_email"
                      name="push_notifications"
                      type="radio"
                      tw="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      htmlFor="push_email"
                      tw="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Same as email
                    </label>
                  </div>
                  <div tw="flex items-center">
                    <input
                      id="push_nothing"
                      name="push_notifications"
                      type="radio"
                      tw="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      htmlFor="push_nothing"
                      tw="ml-3 block text-sm font-medium text-gray-700"
                    >
                      No push notifications
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div tw="pt-5 fixed bottom-0 inset-x-0 pb-2 sm:pb-5 bg-white">
          <div tw="flex justify-end max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <button
              type="submit"
              disabled={updateUserSettings.isLoading}
              tw="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </DashboardShell>
  )
}

DashboardUserSettings.auth = true

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })
  if (!session) {
    res.statusCode = 403
    return { props: {} }
  }

  const instance = await getSaltanaInstance(session)

  const userData = await instance.users.read(session.user.id)

  sharedQueryClient.setQueryData(['users', 'read', session.user.id], userData)
  //await prefetchQuery('assets', 'list', { ownerId: user.id })

  return {
    props: {
      dehydratedState: dehydrate(sharedQueryClient),
      userId: userData.id,
    },
  }
}
