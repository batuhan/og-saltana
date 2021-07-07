import tw, { styled } from 'twin.macro'
import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo'
import React, { useState } from 'react'
import { Switch } from '@headlessui/react'
import MarketingShell from '../components/Marketing/Shell'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Form() {
  const [agreed, setAgreed] = useState(false)

  return (
    <div tw="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
      <div tw="relative max-w-xl mx-auto">
        <div>
          <form
            action="#"
            method="POST"
            tw="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
          >
            <div tw="sm:col-span-2">
              <label
                htmlFor="company"
                tw="block text-sm font-medium text-gray-700"
              >
                Your name
              </label>
              <div tw="mt-1">
                <input
                  type="text"
                  name="company"
                  id="company"
                  autoComplete="organization"
                  tw="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div tw="sm:col-span-2">
              <label
                htmlFor="email"
                tw="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div tw="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  tw="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div tw="sm:col-span-2">
              <label
                htmlFor="message"
                tw="block text-sm font-medium text-gray-700"
              >
                What did you like about Saltana?
              </label>
              <div tw="mt-1">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  tw="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                  defaultValue=""
                />
              </div>
            </div>
            <div tw="sm:col-span-2">
              <div tw="flex items-start">
                <div tw="flex-shrink-0">
                  <Switch
                    checked={agreed}
                    onChange={setAgreed}
                    className={classNames(
                      agreed ? 'bg-indigo-600' : 'bg-gray-200',
                      'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    )}
                  >
                    <span tw="sr-only">Agree to policies</span>
                    <span
                      aria-hidden="true"
                      className={classNames(
                        agreed ? 'translate-x-5' : 'translate-x-0',
                        'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                      )}
                    />
                  </Switch>
                </div>
                <div tw="ml-3">
                  <p tw="text-base text-gray-500">
                    By selecting this, you agree to the{' '}
                    <a href="#" tw="font-medium text-gray-700 underline">
                      Privacy Policy
                    </a>{' '}
                    and{' '}
                    <a href="#" tw="font-medium text-gray-700 underline">
                      Cookie Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
            <div tw="sm:col-span-2">
              <button
                type="submit"
                tw="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send the request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function RequestInvite() {
  return (
    <MarketingShell>
      <div tw="bg-black">
        <NextSeo title="Request an invite" />
        <div tw="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div tw="lg:max-w-2xl lg:mx-auto lg:text-center">
            <h2 tw="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Request an invite to try Saltana
            </h2>
            <p tw="mt-4 text-gray-400">
              We accept a limited number of creators during our private beta.
            </p>
          </div>
        </div>
        <Form />
      </div>
    </MarketingShell>
  )
}

export default RequestInvite
