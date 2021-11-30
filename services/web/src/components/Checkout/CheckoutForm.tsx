import { CardElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import { stripePromise, formatAmountForDisplay } from '@/client/stripe'
import { useMutation, useQuery } from 'react-query'

import { Disclosure } from '@headlessui/react'
import { LockClosedIcon } from '@heroicons/react/solid'
import useCreatorSpace from 'hooks/useCreatorSpace'
import useCheckout, { CHECKOUT_STATUSES, _generatePaymentIntent } from 'components/Checkout/useCheckout'
import OrderSummary from './OrderSummary'
import PaymentMethods from './PaymentMethods'
import HookFormDevTools from '@/client/devtools'
import { Elements } from '@stripe/react-stripe-js';
import classNames from '@/common/classnames'
import GmailLoader from 'components/Dashboard/Common/PlaceholderContent'
import _ from 'lodash'
import useCurrentUser from '@/hooks/useCurrentUser'
import { StripeElementsOptions, StripePaymentElementChangeEvent } from '@stripe/stripe-js'
import Logger from '@/common/logger'

const log = Logger('CheckoutForm')

function WhoAmI() {
  const { user } = useCurrentUser()
  return <div>You are logged in as {user.email} Click here to logout</div>
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
function CheckoutForm({ assetIds, paymentIntent }) {

  const [card, setCard] = useState(true);
  const [stripePaymentElementStatus, setStripePaymentElementStatus] = useState({});
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
  } = useCheckout({ assetIds, paymentIntent })

  const isSubmitDisabled = isValid !== true && isSubmitting !== true

  return (
    <main>

      <form onSubmit={handleSubmit}>

        <div className="relative px-4 sm:px-6 lg:px-8 pb-8 max-w-lg mx-auto">
          <div className="bg-white px-8 pb-6 rounded-b shadow-lg">

            {/* Card header */}
            <div className="text-center mb-6">
              {/* <div className="mb-2"> */}
              {/* <img className="-mt-8 inline-flex rounded-full" src={User} width="64" height="64" alt="User" /> */}
              {/* </div> */}
              {/* <h1 className="text-xl leading-snug text-gray-800 font-semibold mb-2">Front-End Learning 🔥</h1>
              <div className="text-sm">
                Learn how to create real web apps using HTML & CSS. Code templates included.
              </div> */}

              <OrderSummary
                transactions={paymentIntent.data.transactions}
                totalAmount={paymentIntent.data.totalAmount}
              />
            </div>
            <div className="mb-4">

              <div className="space-y-4">
                {requiredFields.includes('whoami') && <WhoAmI />}
              </div>
            </div>
            {/* Toggle */}
            <div className="flex justify-center mb-6">
              <div className="relative flex w-full p-1 bg-gray-50 rounded">
                <span className="absolute inset-0 m-1 pointer-events-none" aria-hidden="true">
                  <span className={`absolute inset-0 w-1/2 bg-white rounded border border-gray-200 shadow-sm transform transition duration-150 ease-in-out ${card ? 'translate-x-0' : 'translate-x-full'}`}></span>
                </span>
                <button
                  className="relative flex-1 text-sm font-medium p-1 duration-150 ease-in-out"
                  onClick={(e) => { e.preventDefault(); setCard(true); }}
                >Cards & Bank Accounts</button>
                <button
                  className="relative flex-1 text-sm font-medium p-1 duration-150 ease-in-out"
                  onClick={(e) => { e.preventDefault(); setCard(false); }}
                >Cryptocurrency</button>
              </div>
            </div>

            {/* Card form */}
            {card &&
              <div>
                <div className="space-y-4">
                  <PaymentElement options={{ fields: { billingDetails: { email: 'never' } } }} onChange={(event: StripePaymentElementChangeEvent) => {
                    setStripePaymentElementStatus(event)
                    onPaymentMethodChange(event)
                    console.log('StripePaymentElementChangeEvent', event)
                  }} />

                  {requiredFields.includes('email') && stripePaymentElementStatus.value?.type === 'card' && (<div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email-address"
                    >Email <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      id="email-address"
                      {...register('email')}
                      autoComplete="email"
                      className="form-input w-full" placeholder="john@company.com" />
                  </div>

                  )}
                </div>
                {/* htmlForm footer */}
                <div className="mt-6">
                  <div className="mb-4">
                    <button
                      type="submit"
                      disabled={isSubmitDisabled}
                      className={classNames(
                        isSubmitDisabled && `disabled:opacity-50`,
                        `w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`,
                      )}
                    >


                      {isSubmitting
                        ? 'Processing...'
                        : `Pay ${formatAmountForDisplay(
                          paymentIntent.data.totalAmount,
                          currency.toLowerCase(),
                        )}`}
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 italic text-center">You'll be charged ${formatAmountForDisplay(
                    paymentIntent.data.totalAmount,
                    currency.toLowerCase(),
                  )}, including commissions & taxes.</div>
                </div>
              </div>
            }

            {/* PayPal htmlForm */}
            {!card &&
              <div>
                <div>
                  <div className="mb-4">
                    <button className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white" href="#0">Pay with Coinbase - ${paymentIntent.data.totalAmount}</button>
                  </div>
                  <div className="text-xs text-gray-500 italic text-center">You'll be charged ${paymentIntent.data.totalAmount}, excluding any processing fees from the transfer.</div>
                </div>
              </div>
            }

          </div>
        </div>

        <div>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
          <pre>{JSON.stringify({ isValid }, null, 2)}</pre>
        </div>
        <HookFormDevTools control={control} />

      </form>
    </main>
  );
}
const CheckoutForm2 = ({ assetIds, paymentIntent }) => {
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
  } = useCheckout({ assetIds, paymentIntent })

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
                <PaymentElement />
                {/* <PaymentMethods onPaymentMethodChange={onPaymentMethodChange} /> */}
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
  // [GENERATE_PAYMENT_INTENT] starts
  const paymentIntent = useMutation(
    async (assets) => {
      const paymentIntentData = await _generatePaymentIntent(assets)

      if (_.isEmpty(paymentIntentData?.paymentIntentClientSecret)) {
        throw new Error('Could not generate payment intent')
      }
      return { ...paymentIntentData, appearance: {} }
    }
  )

  // get a new payment intent every time items in the cart are changed
  useEffect(() => {
    log.debug(
      'generating payment intent',
      assetIds,
      paymentIntent.status,
    )

    if (_.isEmpty(assetIds) || paymentIntent.status === 'loading' || paymentIntent?.data?.paymentIntentClientSecret) {
      return
    } else {
      paymentIntent.mutate(assetIds.map((id) => ({ id, quantity: 1 })))
    }

  }, [assetIds])
  // [GENERATE_PAYMENT_INTENT] ends

  console.log("sdfds", { paymentIntent, assetIds, clientSecret: paymentIntent?.data?.paymentIntentClientSecret, appearance: paymentIntent?.data?.appearance })
  return (
    <div>
      <>
        {paymentIntent.isLoading ? (
          <GmailLoader />
        ) : null}
        {paymentIntent.isError ? (
          <div>An error occurred: {paymentIntent.error.message}</div>
        ) : null}

        {paymentIntent?.data?.paymentIntentClientSecret ? <Elements stripe={stripePromise} options={{ clientSecret: paymentIntent.data.paymentIntentClientSecret, appearance: paymentIntent.data.appearance }}>
          <CheckoutForm assetIds={assetIds} paymentIntent={paymentIntent} />
          {/* <CheckoutForm assetIds={assetIds} paymentIntent={paymentIntent} /> */}
        </Elements> : 'No payment intent'}
      </>
    </div>
  )

}
export default WrappedCheckoutForm
