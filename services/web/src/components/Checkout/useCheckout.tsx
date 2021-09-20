import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'

import React, { useEffect, useMemo, useState } from 'react'
import { formatAmountForDisplay } from '@/client/stripe'
import { useMutation, useQuery } from 'react-query'
import axios from 'axios'

import * as localForage from 'localforage'
import { useController, useForm } from 'react-hook-form'
import useLogin from 'hooks/useLogin'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import _ from 'lodash'
import { useCart } from 'react-use-cart'
import useCurrentUser from '../../hooks/useCurrentUser'
import Logger from '@/common/logger'
import { useRouter } from 'next/router'
import { generateOrderLink } from '@/common/utils'

const cartCache = localForage.createInstance({
  name: 'cart',
})

const log = Logger('useCheckout')
// creates a hash for the cart contents
// we don't expect too many items on the cart
// so this works (for now)
function hashifyCart(items = []) {
  return items.map(({ id, quantity }) => `${id}:${quantity}`).join('|')
}

const checkoutApi = axios.create({
  baseURL: '/api/methods/checkout',
})

const schema = yup.object().shape({
  email: yup.string().email().required(),
  paymentIntent: yup.object().shape({
    id: yup.string().required().min(5),
    clientSecret: yup.string().required().min(5),
  }),
  validPaymentMethod: yup.mixed().oneOf([true]).required(),
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
  log.debug('calling payment intent with', assets)

  //  const hash = hashifyCart(assets)
  const paymentIntentResponse = await checkoutApi.post('/intent', {
    assets,
  })

  log.debug('got payment intent response', paymentIntentResponse)
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

  return { ...processResult.data, email }
}

async function _confirmPaymentIntent({ stripe, paymentIntent, card, email }) {
  const paymentConfirmation = await stripe.confirmCardPayment(
    paymentIntent.paymentIntentClientSecret,
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
export default function useCheckout({ assetIds }) {
  const formMethods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      paymentIntent: {
        id: '',
        clientSecret: '',
      },
      assetIds,
      validPaymentMethod: false,
    },
  }) // basically for validating the email field

  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()

  const [status, setStatus] = useState(CHECKOUT_STATUSES.EMPTY_CART)
  const [errorMessage, setErrorMessage] = useState(null)

  // [GENERATE_PAYMENT_INTENT] starts
  const generatePaymentIntent = useMutation(
    async () =>
      _generatePaymentIntent(assetIds.map((id) => ({ id, quantity: 1 }))),
    {
      onMutate: (variables) => {
        setStatus(CHECKOUT_STATUSES.LOADING)
      },
      onSuccess: (data) => {
        if (data?.paymentIntentId) {
          // when we have a new intent, checkout form is ready
          // @TODO: update the cart with the transaction preview
          setStatus(CHECKOUT_STATUSES.READY)

          formMethods.setValue('paymentIntent.id', data.paymentIntentId, {
            shouldValidate: true,
          })
          formMethods.setValue(
            'paymentIntent.clientSecret',
            data.paymentIntentClientSecret,
            { shouldValidate: true },
          )

          return
        }

        // if we don't have a payment intent, throw an error
        throw new Error('ERROR_NO_PAYMENT_INTENT')
      },
      onError: (error) => {
        log.warn('we have an error generating payment intent', error)
      },
    },
  )

  // get a new payment intent every time items in the cart are changed
  useEffect(() => {
    log.debug(
      'generating payment intent',
      assetIds,
      generatePaymentIntent.status,
    )
    if (generatePaymentIntent.status === 'idle') {
      generatePaymentIntent.mutate()
    }
  }, [assetIds, generatePaymentIntent.status])
  // [GENERATE_PAYMENT_INTENT] ends

  // [PAYMENT_INTENT_PROCESSING] starts
  const processPaymentIntent = useMutation(
    ({ email }: { email: string }) => {
      if (status !== CHECKOUT_STATUSES.READY) {
        throw new Error('PAYMENT_INTENT_NOT_READY')
      }

      return _processPaymentIntent({
        email,
        paymentIntentId: generatePaymentIntent.data.paymentIntentId,
        assets: assetIds.map((id) => ({ id, quantity: 1 })),
      })
    },
    {
      onMutate: (data) => {
        setStatus(CHECKOUT_STATUSES.PROCESSING_ORDER)
      },
      onError: (error) => {
        log.warn('we have an error processing payment intent', error)
      },
      onSuccess: ({ email, orderId, stripeCustomerId }) => {
        log.debug('successfully processed payment intent', email, orderId)
        confirmPaymentIntent.mutate({ email, orderId, stripeCustomerId })
      },
    },
  )

  // [PAYMENT_INTENT_CONFIRMATION] starts
  const confirmPaymentIntent = useMutation(
    async ({
      email,
      orderId,
      stripeCustomerId,
    }: {
      email: string
      orderId: string
      stripeCustomerId: string
    }) => {
      const result = await _confirmPaymentIntent({
        stripe,
        card: elements.getElement(CardElement),
        paymentIntent: generatePaymentIntent.data,
        email,
      })

      return { stripeResult: result, email, orderId, stripeCustomerId }
    },
    {
      onSuccess: ({ email, orderId }) => {
        router.push(generateOrderLink({ email, orderId }))
      },
    },
  )

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
    await processPaymentIntent.mutateAsync({ email })
  }

  function onPaymentMethodChange({
    elementType,
    error,
    value,
    empty,
    complete,
  }) {
    log.debug('onPaymentMethodChange', {
      elementType,
      error,
      value,
      empty,
      complete,
    })

    if (error && error.message) {
      formMethods.setError('validPaymentMethod', error)
    } else {
      formMethods.clearErrors('validPaymentMethod')
    }

    formMethods.setValue('validPaymentMethod', complete, {
      shouldValidate: true,
    })
  }

  useEffect(() => {
    formMethods.register('validPaymentMethod')
    formMethods.register('paymentIntent')
  }, [])

  const { transactions, totalAmount, currency } =
    generatePaymentIntent.data || {
      transactions: [],
      totalAmount: 0,
      currency: 'USD',
    }

  return {
    status,
    handleSubmit: formMethods.handleSubmit(onSubmit),
    errorMessage,
    formMethods,
    transactions,
    totalAmount,
    currency,
    onPaymentMethodChange,
  }
}
