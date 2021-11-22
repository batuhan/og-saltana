import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { NextSeo } from 'next-seo'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { GetServerSideProps } from 'next'

import { dehydrate } from 'react-query/hydration'
import _ from 'lodash'
import { requireSession } from "@clerk/nextjs/api";

import DashboardShell from 'components/Dashboard/Common/Shell'
import FormSubmitButton from 'components/FormSubmitButton'
import GenericFormFieldError from 'components/GenericFormFieldError'
import {
  createQueryClient,
  getSaltanaInstance,
  setUserData,
} from '@/client/api'
import useCurrentUser from 'hooks/useCurrentUser'
import useUpdateCurrentUser from 'hooks/useUpdateCurrentUser'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.umd'
import * as Yup from 'yup'
import { isUsernameUnique } from '@/client/field-validators'

function NonCreator({ userData }) {
  return "box"
}
function WelcomeCreator({ userData }) {
  const router = useRouter()
  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required').min(3),
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    description: Yup.string().required('Description is required'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
    criteriaMode: 'all',
    defaultValues: _.pick(userData, [
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

    try {
      await isUsernameUnique(data.username)
    } catch (error) {
      setError('username', {
        type: 'unique',
        message: 'This username is unavailable. If you are known with this username across the web, contact us, we might be able to help.',
      }, { shouldFocus: true })

      return
    }

    try {
      const result = await updateUserSettings.mutateAsync(data)
      console.log("we have a result I guess", result)
    } catch (error) {
      //@TODO: what errors?
      console.log("got some errors from the api", error)
    }
  }

  return (
    <DashboardShell>
      <NextSeo title="Complete your profile" />
      <Transition.Root show as={Fragment}>
        <Dialog as={Fragment} static open onClose={() => { }}>
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
                            <input
                              type="text"
                              name="username"
                              id="username"
                              {...register('username')}
                              className={`
                              flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300
                              ${errors.username && 'border-red-500'}
                              `}
                              placeholder="RickAstley"
                            />
                            <span className={`
                            inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm
                            ${errors.username && 'border-red-500'}
                            `}
                            >
                              .saltana.com
                            </span>
                          </div>

                          <GenericFormFieldError errors={errors} fieldName='username' />

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
                                className={`
                                shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md
                                ${errors.firstname && 'border-red-500'}
                              `}
                              />
                            </div>
                            <GenericFormFieldError errors={errors} fieldName='firstname' />
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
                            <GenericFormFieldError errors={errors} fieldName='lastname' />

                          </div>
                        </div>

                        <p
                          className="mt-2 text-sm text-gray-500"
                          id="name-description"
                        >
                          Most creators prefer using the name they are most
                          known with, sdfs

                          You'll be able to select a different display name if you prefer but your real name is used to verify your identity.
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
                              className={`block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border border-gray-300 rounded-md`}
                              defaultValue=""
                              placeholder="Senior Never Giving Upper"
                            />
                          </div>
                          <GenericFormFieldError errors={errors} fieldName='description' />

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
                      <FormSubmitButton
                        type="submit"
                        isLoading={updateUserSettings.isLoading}
                        text="Start using Saltana"
                        textWhenLoading="Crafting your profile..."
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      />
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

export default function WelcomePage({ userData, ...props }) {
  return userData.roles.includes('provider') ? <WelcomeCreator userData={userData} {...props} /> : <NonCreator userData={userData} {...props} />
}

// export const getServerSideProps: GetServerSideProps = requireSession(async ({ req, res }) => {
//   debugger
//   const session = await getSession({ req })
//   if (!session) {
//     res.statusCode = 403
//     return {
//       redirect: {
//         destination: `/login`,
//         permanent: false, // @TODO: This should be true
//       },
//     }
//   }

//   const instance = await getSaltanaInstance(session)

//   const userData = await instance.users.read(session.user.id)

//   const finishedOnboarding = _.get(userData.platformData, '_private.finishedOnboarding', false)
//   const roles = _.get(userData, 'roles', [])
//   const isCreator = roles.includes('provider')

//   if (isCreator === false) {
//     return {
//       redirect: {
//         destination: '/request-invite',
//         permanent: false,
//       },
//     }
//   }

//   if (
//     finishedOnboarding === true
//   ) {
//     return {
//       redirect: {
//         destination: `/dashboard`,
//         permanent: false, // @TODO: This should be true
//       },
//     }
//   }

//   return {
//     props: {
//       userData
//     },
//   }
// })
