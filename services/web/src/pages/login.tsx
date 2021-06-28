import { useLogin } from '../modules/auth/Login'

import tw, { styled } from 'twin.macro'

import { LockClosedIcon } from '@heroicons/react/solid'
import { Logo } from '../components/Logo'
import React, { useEffect } from 'react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { getSession } from 'next-auth/client'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const router = useRouter()
  const loginMutation = useLogin({ redirect: true })

  useEffect(() => {
    if (loginMutation.session) {
      router.push(router.query.callbackUrl as string)
    }
    return () => {}
  }, [loginMutation.session, router])

  return (
    <div tw="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <NextSeo title="Login" />
      <div tw="max-w-md w-full space-y-8">
        <div>
          <Logo tw="mx-auto h-12 w-auto" h={9} />
          <h2 tw="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form
          tw="mt-8 space-y-6"
          onSubmit={handleSubmit(loginMutation.onSubmit)}
        >
          <div tw="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" tw="sr-only">
                Email address
              </label>
              <input
                {...register('email', {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                tw="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
          </div>

          <div tw="flex items-center justify-between">
            <p tw="mt-2 text-center text-sm text-gray-600">
              {loginMutation.isError ? (
                <div>An error occurred: {loginMutation.error.message}</div>
              ) : null}
              By entering your e-mail, you agree to our{' '}
              <a
                href="#"
                tw="font-medium text-indigo-600 hover:text-indigo-500"
              >
                terms of service
              </a>
            </p>
          </div>

          <div>
            <button
              type="submit"
              className="group"
              tw="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span tw="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  tw="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              {loginMutation.isLoading ? 'Logging you in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

Login.auth = false

export const getServerSideProps = async (context) => {
  const session = await getSession(context)
  if (session) {
    return {
      redirect: {
        destination: context.req.query?.callbackUrl || '/my/purchases',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
