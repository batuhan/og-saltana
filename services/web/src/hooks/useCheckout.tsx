import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useMemo, useState } from 'react'
import { formatAmountForDisplay } from '@/client/stripe'
import { useMutation, useQuery } from 'react-query'
import axios from 'axios'
import tw from 'twin.macro'

import { useForm } from 'react-hook-form'
import useLogin from 'hooks/useLogin'

import _ from 'lodash'
import { useCart } from 'react-use-cart'
import useCurrentUser from './useCurrentUser'

const checkoutApi = axios.create({
  baseURL: '/api/methods/checkout',
})

export const CARD_OPTIONS = {
  iconStyle: 'solid' as const,
  style: {
    base: {
      fontSize: '16px',
    },
  },
}

export const CHECKOUT_STATUSES = {
  EMPTY_CART: 'empty_cart',
  LOADING: 'loading',
  READY: 'ready',
  PROCESSING_ORDER: 'processing_order',
  CAPTURING_PAYMENT: 'capturing_payment',
  LOGIN_REQUIRED: 'login_required',
  SUCCESS: 'success',
  ERROR: 'error',
}

const ERROR_STATES = {}

// Helpers
async function _generatePaymentIntent(assets) {
  console.log('calling payment intent')
  const paymentIntentResponse = await checkoutApi.post('/intent', {
    assets,
  })

  console.log({ paymentIntentResponse })
  if (paymentIntentResponse.status !== 200) {
    throw new Error(`ERROR_${paymentIntentResponse.status}`)
  }

  return paymentIntentResponse.data
}

async function _processPaymentIntent({ paymentIntentId, assets, email }) {
  const processResult = await checkoutApi.post('/process', {
    paymentIntentId,
    assets,
    email,
  })

  return processResult
}

async function _confirmPaymentIntent({ stripe, paymentIntent, card, email }) {
  const paymentConfirmation = await stripe.confirmCardPayment(
    paymentIntent.client_secret,
    {
      payment_method: {
        card,
        billing_details: { email },
      },
    },
  )

  return paymentConfirmation
}

// get payment intent from server
// if we have a payment intent, we can render the checkout form
// if we don't have a payment intent, we can't render the checkout form
// when the form is validated and submitted, we can process the payment intent
// when the payment intent is processed, we can confirm the payment intent
// when the payment intent is confirmed, we can redirect the user to the success page
// if the payment intent fails, we can show an error message
// if the user is not logged in, we can show a login form
export default function useCheckout() {
  const formMethods = useForm() // basically for validating the email field
  const cart = useCart()
  const stripe = useStripe()
  const elements = useElements()
  const user = useCurrentUser()
  const login = useLogin()

  const [status, setStatus] = useState(CHECKOUT_STATUSES.EMPTY_CART)
  const [errorMessage, setErrorMessage] = useState(null)

  // [GENERATE_PAYMENT_INTENT] starts
  const generatePaymentIntent = useMutation(
    async () =>
      _generatePaymentIntent(
        cart.items.map(({ id, quantity }) => ({ id, quantity })),
      ),
    {
      onMutate: (variables) => {
        setStatus(CHECKOUT_STATUSES.LOADING)
      },
      onSuccess: (data) => {
        if (data?.paymentIntentId) {
          // when we have a new intent, checkout form is ready
          // @TODO: update the cart with the transaction preview
          setStatus(CHECKOUT_STATUSES.READY)
        }

        // if we don't have a payment intent, throw an error
        throw new Error('ERROR_NO_PAYMENT_INTENT')
      },
      onError: (error) => {
        console.warn('we have an error generating payment intent', error)
      },
    },
  )

  // get a new payment intent every time items in the cart are changed
  useEffect(() => {
    console.log(
      'generating payment intent',
      cart.items,
      generatePaymentIntent.status,
    )
    if (generatePaymentIntent.status === 'idle') {
      generatePaymentIntent.mutate()
    }
  }, [cart.items, generatePaymentIntent.status])
  // [GENERATE_PAYMENT_INTENT] ends

  // [PAYMENT_INTENT_PROCESSING] starts
  const processPaymentIntent = useMutation(
    ({ email }: { email: string }) => {
      if (status !== CHECKOUT_STATUSES.READY) {
        throw new Error('PAYMENT_INTENT_NOT_READY')
      }

      return _processPaymentIntent({
        email,
        paymentIntentId: generatePaymentIntent.data.id,
        assets: cart.items,
      })
    },
    {
      onMutate: (data) => {
        setStatus(CHECKOUT_STATUSES.PROCESSING_ORDER)
      },
      onSuccess: ({ email }) => {
        confirmPaymentIntent.mutate({ email })
        if (!user.isLoggedIn) {
          login.mutate({ email })
        }
      },
    },
  )

  // [PAYMENT_INTENT_CONFIRMATION] starts
  const confirmPaymentIntent = useMutation(async ({ email }) => {
    const result = await _confirmPaymentIntent({ stripe, email })
  })

  // [PAYMENT_INTENT_CONFIRMATION] ends
  // when the payment intent is processed in our backend (creating transactions&order&user)
  // prompt for login if the user is not logged in
  // capture the payment on stripe
  // [PAYMENT_INTENT_PROCESSING] ends

  async function onSubmit({ email }) {
    if (!stripe || !elements || status !== CHECKOUT_STATUSES.READY) {
      return
    }
    // @TODO - validate email
    processPaymentIntent.mutate({ email })
  }

  return {
    status,
    handleSubmit: formMethods.handleSubmit(onSubmit),
    errorMessage,
    formMethods,
  }
}
function mutate(
  generatePaymentIntent: UseMutationResult<any, unknown, void, void>,
) {
  throw new Error('Function not implemented.')
}
