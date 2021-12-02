import getServerSidePropsForCreatorDashboardPages from '@/server/getServerSidePropsForCreatorDashboardPages'
import { GetServerSideProps } from 'next'
import CreatorOnboardingShell from '../../../components/Dashboard/Creator/Onboarding/Shell'

import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { NextSeo } from 'next-seo'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'


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
} from '@/common/api'
import useCurrentUser from 'hooks/useCurrentUser'
import useUpdateCurrentUser from 'hooks/useUpdateCurrentUser'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.umd'
import * as Yup from 'yup'
import CreatorSlugField from 'components/Dashboard/Common/Inputs/CreatorPageSlug'
import CreatorSpaceHostname from 'components/Dashboard/Common/Inputs/CreatorSpaceHostname'


const Link = ({ to, children, ...props }) => (
  <a href={`${to}`} {...props}>
    {children}
  </a>
)
function CreatorOnboarding() {
  const router = useRouter()
  const { user, instance } = useCurrentUser()

  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required').min(3),
    displayName: Yup.string().required('First name is required'),
    description: Yup.string().required('Description is required'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch
  } = useForm({
    resolver: yupResolver(validationSchema),
    criteriaMode: 'all',
    defaultValues: _.pick(user, [
      'displayName',
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
      const usernameAvailabilityResponse = await instance.users.checkAvailability({
        username: data.username,
      })
    } catch (error) {
      setError('username', {
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
    <CreatorOnboardingShell>
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl text-gray-800 font-bold mb-6">
          Finish setting up your account ✨
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Let’s get started by filling in the information
          below to create your new project.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <div className="space-y-6">


              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <CreatorSpaceHostname name="username" register={register} errors={errors} />

              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="displayName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Display name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="displayName"
                    id="displayName"
                    autoComplete="given-name"
                    {...register('displayName', {
                      required: true,
                    })}
                    className={`
                                shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md
                                ${errors.displayName && 'border-red-500'}
                              `}
                  />
                </div>
                <GenericFormFieldError errors={errors} fieldName='displayName' />
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
    </CreatorOnboardingShell>
  )
}

export const getServerSideProps: GetServerSideProps = getServerSidePropsForCreatorDashboardPages()
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

export default CreatorOnboarding
