import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'

import { NextSeo } from 'next-seo'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import { dehydrate } from 'react-query/hydration'
import _ from 'lodash'

import DashboardShell from 'components/Dashboard/Common/Shell'
import {
  createQueryClient,
  getSaltanaInstance,
  setUserData,
} from '@/client/api'
import useCurrentUser from 'hooks/useCurrentUser'
import useUpdateCurrentUser from 'hooks/useUpdateCurrentUser'

export default function WelcomeCreator({ creatorId }) {
  const user = useCurrentUser()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: _.pick(user.data, [
      'firstname',
      'lastname',
      'description',
      'username',
    ]),
  })

  async function onSuccess() {
    router.push(`/dashboard`)
  }

  const updateUserSettings = useUpdateCurrentUser({ onSuccess })

  async function onSubmit(data) {
    await updateUserSettings.mutateAsync(data)
  }

  return (
    <DashboardShell>
      <NextSeo title="Complete your profile" />
      <Transition.Root show as={Fragment}>
        <Dialog as={Fragment} static open onClose={() => {}}>
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay as={Fragment}>
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Dialog.Overlay>
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="inline-block align-bottom bg-white rounded-lg px-5 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <div className="space-y-6">
                        <div>
                          <h1 className="text-lg leading-8 font-extrabold text-gray-900">
                            Finish setting up your account
                          </h1>
                          <p className="mt-1 text-sm text-gray-500">
                            Let’s get started by filling in the information
                            below to create your new project.
                          </p>
                        </div>

                        <div>
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Username
                          </label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                              saltana.com/
                            </span>
                            <input
                              type="text"
                              name="username"
                              id="username"
                              {...register('username', {
                                required: true,
                              })}
                              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                              placeholder="RickAstley"
                            />
                          </div>
                        </div>
                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="firstname"
                              className="block text-sm font-medium text-gray-700"
                            >
                              First name
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                autoComplete="given-name"
                                {...register('firstname', {
                                  required: true,
                                })}
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                            {errors.firstname && (
                              <p className="text-red-500 text-sm mt-2">
                                First name is required :(
                              </p>
                            )}
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="lastname"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Last name
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                {...register('lastname', {
                                  required: true,
                                })}
                                autoComplete="family-name"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                        </div>

                        <p
                          className="mt-2 text-sm text-gray-500"
                          id="name-description"
                        >
                          Most creators prefer using the name they are most
                          known with, sdfs
                        </p>
                        <div>
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Short description
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="description"
                              name="description"
                              rows={3}
                              {...register('description', {
                                required: true,
                                minLength: 10,
                              })}
                              className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border border-gray-300 rounded-md"
                              defaultValue=""
                              placeholder="Senior Never Giving Upper"
                            />
                          </div>

                          <p
                            className="mt-2 text-sm text-gray-500"
                            id="name-description"
                          >
                            Displayed at the top of your links
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <button
                        type="submit"
                        disabled={updateUserSettings.isLoading}
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        {updateUserSettings.isLoading
                          ? 'Crafting your profile...'
                          : 'Start using Saltana'}
                      </button>
                    </div>
                  </form>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </DashboardShell>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })
  if (!session) {
    res.statusCode = 403
    return { props: {} }
  }

  const instance = await getSaltanaInstance(session)

  const userData = await instance.users.read(session.user.id)

  const queryClient = createQueryClient(session)

  setUserData(queryClient, userData)

  if (
    _.get(userData.platformData, '_private.finishedOnboarding', false) === true
  ) {
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        creatorId: userData.id,
      },
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      creatorId: userData.id,
    },
  }
}
