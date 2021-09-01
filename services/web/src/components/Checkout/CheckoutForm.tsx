import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import stripe, { formatAmountForDisplay } from '@/client/stripe'
import { useMutation, useQuery } from 'react-query'
import axios from 'axios'
import tw from 'twin.macro'

import { useForm } from 'react-hook-form'
import useLogin from 'hooks/useLogin'

import { Disclosure } from '@headlessui/react'
import { LockClosedIcon } from '@heroicons/react/solid'
import { useCart } from 'react-use-cart'
import useCreatorSpace from 'hooks/useCreatorSpace'
import useCheckout, { CHECKOUT_STATUSES } from 'hooks/useCheckout'
import OrderSummary from './OrderSummary'
import PaymentMethods from './PaymentMethods'
import getStripe from '@/client/stripe'
import { Elements } from '@stripe/react-stripe-js'

const PaymentStatus = ({
  status,
  errorMessage,
}: {
  status: string
  errorMessage: string
}) => {
  switch (status) {
    case 'waiting_email_verification':
      return <h2>Verifying your e-mail</h2>
    case 'processing':
    case 'requires_payment_method':
    case 'requires_confirmation':
      return <h2>Processing...</h2>

    case 'requires_action':
      return <h2>Authenticating...</h2>

    case 'succeeded':
      return <h2>Payment Succeeded 🥳</h2>

    case 'error':
      return (
        <>
          <h2>Error 😭</h2>
          <p className="error-message">{errorMessage}</p>
        </>
      )

    default:
      return null
  }
}

const CheckoutForm = () => {
  const {
    handleSubmit,
    formMethods: {
      register,
      formState: { errors },
    },
    status,
  } = useCheckout()

  const { items, totalUniqueItems, cartTotal } = useCart()

  const isSubmitDisabled = status !== CHECKOUT_STATUSES.READY
  return (
    <div tw="bg-white">
      <main tw="lg:min-h-screen lg:overflow-hidden lg:flex lg:flex-row-reverse">
        <h1 tw="sr-only">Checkout</h1>

        {status}
        {status === CHECKOUT_STATUSES.LOADING && <h2>Loading...</h2>}
        <section
          aria-labelledby="payment-heading"
          tw="flex-auto overflow-y-auto px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8 lg:pt-0 lg:pb-24"
        >
          <div tw="max-w-lg mx-auto">
            <form tw="mt-6" onSubmit={handleSubmit}>
              <div tw="grid grid-cols-12 gap-y-6 gap-x-4">
                <div tw="col-span-full border-b border-gray-200 mt-5 mb-5 bg-gray-200">
                  <Disclosure as="div">
                    {({ open }) => (
                      <OrderSummary
                        assets={items}
                        totalUniqueItems={totalUniqueItems}
                        cartTotal={cartTotal}
                        open={open}
                      />
                    )}
                  </Disclosure>
                </div>

                <div tw="col-span-full">
                  <label
                    htmlFor="email-address"
                    tw="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div tw="mt-1">
                    <input
                      type="email"
                      id="email-address"
                      {...register('email', {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                      })}
                      autoComplete="email"
                      tw="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <PaymentMethods />
              </div>
              {status !== CHECKOUT_STATUSES.READY
                ? 'shold be disabled'
                : 'should not be disabled'}
              <button
                type="submit"
                disabled={isSubmitDisabled}
                css={[
                  isSubmitDisabled && tw`disabled:opacity-50`,
                  tw`w-full mt-6 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`,
                ]}
              >
                Pay {formatAmountForDisplay(cartTotal, 'usd')}
              </button>

              <p tw="flex justify-center text-sm font-medium text-gray-500 mt-6">
                <LockClosedIcon
                  tw="w-5 h-5 text-gray-400 mr-1.5"
                  aria-hidden="true"
                />
                Agreements and stuff
              </p>

              <p tw="flex justify-center text-sm font-medium text-gray-500 mt-6">
                kyhjlkmk
              </p>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}

const WrappedCheckoutForm = () => {
  return (
    <Elements stripe={getStripe()}>
      <CheckoutForm />
    </Elements>
  )
}
export default WrappedCheckoutForm
