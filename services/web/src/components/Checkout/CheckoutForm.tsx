import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import { formatAmountForDisplay } from '@/client/stripe'
import { useMutation, useQuery } from 'react-query'
import axios from 'axios'
import tw from 'twin.macro'

import { useForm } from 'react-hook-form'
import useLogin from 'hooks/useLogin'

import { Disclosure } from '@headlessui/react'
import { LockClosedIcon } from '@heroicons/react/solid'
import { useCart } from 'react-use-cart'
import useCreatorSpace from 'hooks/useCreatorSpace'

const subtotal = '$210.00'
const discount = { code: 'CHEAPSKATE', amount: '$24.00' }
const taxes = '$23.68'
const shipping = '$22.00'

function AssetLine({ id, name, price, currency, description }) {
  return (
    <li tw="flex py-6 space-x-6">
      <div tw="flex flex-col justify-between space-y-4">
        <div tw="text-sm font-medium space-y-1">
          <h3 tw="text-gray-900">{name}</h3>
          <p tw="text-gray-900">
            {price} {currency}
          </p>
          <p tw="text-gray-500">{description}</p>
        </div>
      </div>
    </li>
  )
}
function OrderSummary({ open }) {
  const { addItem, isEmpty, totalUniqueItems, items, cartTotal } = useCart()

  return (
    <>
      <div tw="flex items-center justify-between">
        <h2 id="order-heading" tw="text-lg font-medium text-gray-900">
          Your Order {totalUniqueItems}
        </h2>
        <Disclosure.Button tw="font-medium text-indigo-600 hover:text-indigo-500">
          {open ? (
            <span>Hide full summary</span>
          ) : (
            <span>Show full summary</span>
          )}
        </Disclosure.Button>
      </div>

      <Disclosure.Panel>
        <ul role="list" tw="divide-y divide-gray-200 border-b border-gray-200">
          {items.map((asset) => (
            <AssetLine key={asset.id} {...asset} />
          ))}
        </ul>

        <dl tw="text-sm font-medium text-gray-500 mt-10 space-y-6">
          <div tw="flex justify-between">
            <dt>Subtotal</dt>
            <dd tw="text-gray-900">{subtotal}</dd>
          </div>
          <div tw="flex justify-between">
            <dt>Taxes</dt>
            <dd tw="text-gray-900">{taxes}</dd>
          </div>
          <div tw="flex justify-between">
            <dt>Shipping</dt>
            <dd tw="text-gray-900">{shipping}</dd>
          </div>
        </dl>
      </Disclosure.Panel>

      <p tw="flex items-center justify-between text-sm font-medium text-gray-900 border-t border-gray-200 pt-6 mt-6">
        <span tw="text-base">Total</span>
        <span tw="text-base">{cartTotal}</span>
      </p>
    </>
  )
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

const ElementsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [paymentStatus, setPaymentStatus] = useState('initial')
  const [errorMessage, setErrorMessage] = useState('')
  const stripe = useStripe()
  const elements = useElements()
  const { addItem, isEmpty, totalUniqueItems, items, cartTotal } = useCart()
  const assets = items.map(({ id, quantity }) => ({ id, quantity }))
  const loginMutation = useLogin({ redirect: true })
  const { link, creator, asset } = useCreatorSpace()

  const paymentIntentMutation = useMutation(async ({ assets, email }) => {
    const paymentIntentResponse = await axios.post(
      '/api/methods/checkout/intent',
      {
        assets,
        email,
      },
    )

    if (paymentIntentResponse.status === 500) {
      setPaymentStatus('error')
      setErrorMessage(JSON.stringify(paymentIntentResponse.data))
      return
    }
  })

  const onSubmit = async ({ email, cardholderName }) => {
    setPaymentStatus('processing')

    const cardElement = elements.getElement(CardElement)

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      paymentIntentResponse.data.paymentIntent.client_secret,
      {
        payment_method: {
          card: cardElement,
          billing_details: { name: cardholderName, email },
        },
      },
    )

    if (error) {
      setPaymentStatus('error')
      setErrorMessage(error.message ?? 'An unknown error occurred')
      return
    }

    if (paymentIntent) {
      setPaymentStatus('waiting_email_verification')
      await loginMutation.mutateAsync({ email })

      console.log(paymentIntent)
      setPaymentStatus('succeeded')
    }
  }

  return (
    <div tw="bg-white">
      {asset.data && <pre>{JSON.stringify(asset.data)}</pre>}
      <main tw="lg:min-h-screen lg:overflow-hidden lg:flex lg:flex-row-reverse">
        <h1 tw="sr-only">Checkout</h1>
        <section
          aria-labelledby="payment-heading"
          tw="flex-auto overflow-y-auto px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8 lg:pt-0 lg:pb-24"
        >
          <div tw="max-w-lg mx-auto">
            <form tw="mt-6" onSubmit={handleSubmit(onSubmit)}>
              <div tw="grid grid-cols-12 gap-y-6 gap-x-4">
                <div tw="col-span-full border-b border-gray-200 mt-5 mb-5 bg-gray-200">
                  <Disclosure as="div">
                    {({ open }) => <OrderSummary open={open} />}
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
                <div tw="col-span-full">
                  <label
                    htmlFor="card-number"
                    tw="block text-sm font-medium text-gray-700"
                  >
                    Card number
                  </label>
                  <div tw="mt-1 mb-5">
                    <div tw="block w-full">
                      <CardElement
                        options={CARD_OPTIONS}
                        onChange={(e) => {
                          if (e.error) {
                            setPaymentStatus('error')
                            setErrorMessage(
                              e.error.message ?? 'An unknown error occurred',
                            )
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={
                  !['initial', 'succeeded', 'error'].includes(paymentStatus) ||
                  !stripe
                }
                tw="w-full mt-6 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                <PaymentStatus
                  status={paymentStatus}
                  errorMessage={errorMessage}
                />
              </p>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ElementsForm
