import { useLoginForm } from 'hooks/useLogin'

import { LockClosedIcon } from '@heroicons/react/solid'
import { Logo } from 'components/Logo'
import React, { useEffect } from 'react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
import Link from 'next/link'
import classnames from '@/common/classnames'

export default function Login() {
  const { onSubmit, isSubmitting, registerEmail, errors } = useLoginForm()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <NextSeo title="Login" />
      <div className="max-w-md w-full space-y-8">
        <div>
          <Logo className="mx-auto h-8 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                {...registerEmail}
                id="email-address"
                type="email"
                autoComplete="email"
                required
                disabled={isSubmitting}
                className={classnames(
                  isSubmitting && `disabled:opacity-50`,
                  `appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`,
                )}
                placeholder="Email address"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="mt-2 text-center text-sm text-gray-600">
              {errors.email && (
                <div>An error occurred: {JSON.stringify(errors.email)}</div>
              )}
              By entering your e-mail, you agree to our{' '}
              <Link href="/terms">
                <a className="font-medium text-indigo-600 hover:text-indigo-500">
                  terms of service
                </a>
              </Link>
            </p>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              {isSubmitting ? 'Logging you in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context)
  if (session) {
    return {
      redirect: {
        destination: context.req.query?.callbackUrl || '/dashboard',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
