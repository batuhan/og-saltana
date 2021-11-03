import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import stripe, { formatAmountForDisplay } from '@/client/stripe'
import { useMutation, useQuery } from 'react-query'
import axios from 'axios'

import { useForm } from 'react-hook-form'
import useLogin from 'hooks/useLogin'

import { Disclosure } from '@headlessui/react'
import { LockClosedIcon } from '@heroicons/react/solid'
import useCreatorSpace from 'hooks/useCreatorSpace'
import useCheckout, { CHECKOUT_STATUSES } from 'components/Checkout/useCheckout'
import OrderSummary from './OrderSummary'
import PaymentMethods from './PaymentMethods'
import getStripe from '@/client/stripe'
import HookFormDevTools from '@/client/devtools'
import { Elements } from '@stripe/react-stripe-js'
import classNames from '@/common/classnames'
import GmailLoader from 'components/Dashboard/Common/PlaceholderContent'
import _ from 'lodash'
import useCurrentUser from '@/hooks/useCurrentUser'

function WhoAmI() {
  const { data } = useCurrentUser()
  return <div>You are logged in as {data.email} Click here to logout</div>
}
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

const CheckoutForm = ({ assetIds }) => {
  const {
    handleSubmit,
    formMethods: {
      register,
      control,
      setValue,
      setError,
      formState: { errors, isValid, isSubmitting },
    },
    status,
    onPaymentMethodChange,
    transactions,
    totalAmount,
    currency,
    requiredFields,
  } = useCheckout({ assetIds })

  const isSubmitDisabled = isValid !== true && isSubmitting !== true
  return (
    <div className="bg-white">
      <main className="lg:min-h-screen lg:overflow-hidden lg:flex lg:flex-row-reverse">
        <h1 className="sr-only">Checkout</h1>

        {status}
        {status === CHECKOUT_STATUSES.LOADING && <h2>Loading...</h2>}
        <section
          aria-labelledby="payment-heading"
          className="flex-auto overflow-y-auto px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8 lg:pt-0 lg:pb-24"
        >
          <div className="max-w-lg mx-auto">
            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-12 gap-y-6 gap-x-4">
                <div className="col-span-full border-b border-gray-200 mt-5 mb-5 bg-gray-200">
                  <Disclosure as="div">
                    {({ open }) => (
                      <OrderSummary
                        transactions={transactions}
                        totalAmount={totalAmount}
                        open={open}
                      />
                    )}
                  </Disclosure>
                </div>

                {requiredFields.includes('whoami') && <WhoAmI />}

                {requiredFields.includes('email') && (
                  <div className="col-span-full">
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        id="email-address"
                        {...register('email')}
                        autoComplete="email"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                )}
                <PaymentMethods onPaymentMethodChange={onPaymentMethodChange} />
              </div>
              <pre>{JSON.stringify(errors, null, 2)}</pre>
              <pre>{JSON.stringify({ isValid }, null, 2)}</pre>
              <button
                type="submit"
                disabled={isSubmitDisabled}
                className={classNames(
                  isSubmitDisabled && `disabled:opacity-50`,
                  `w-full mt-6 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`,
                )}
              >
                {isSubmitting
                  ? 'Processing...'
                  : `Pay ${formatAmountForDisplay(
                      totalAmount,
                      currency.toLowerCase(),
                    )}`}
              </button>
              <p className="flex justify-center text-sm font-medium text-gray-500 mt-6">
                <LockClosedIcon
                  className="w-5 h-5 text-gray-400 mr-1.5"
                  aria-hidden="true"
                />
                Agreements and stuff
              </p>
              <p className="flex justify-center text-sm font-medium text-gray-500 mt-6">
                kyhjlkmk
              </p>

              <HookFormDevTools control={control} />
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}

const WrappedCheckoutForm = ({ assetIds }) => {
  return (
    <Elements stripe={getStripe()}>
      {_.isEmpty(assetIds) ? (
        <GmailLoader />
      ) : (
        <CheckoutForm assetIds={assetIds} />
      )}
    </Elements>
  )
}
export default WrappedCheckoutForm
