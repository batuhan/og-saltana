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

import { useController, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.umd'
import * as yup from 'yup'

import _ from 'lodash'
import Logger from '@/common/logger'
import { useRouter } from 'next/router'
import { generateOrderLink } from '@/common/utils'
import useCurrentUser from '@/hooks/useCurrentUser'
import getStripe from '@/client/stripe'

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
  LOADING: 'loading',
  READY: 'ready',
  PROCESSING_ORDER: 'processing_order',
  CAPTURING_PAYMENT: 'capturing_payment',
  LOGIN_REQUIRED: 'login_required',
  SUCCESS: 'success',
  ERROR: 'error',
}

// Helpers
export async function _generatePaymentIntent(assets) {
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
export default function useCheckout({ assetIds, paymentIntent }) {
  const { user } = useCurrentUser()
  const formMethods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: user?.email || '',
      assetIds,
      validPaymentMethod: false,
    },
  }) // basically for validating the email field

  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()

  const [status, setStatus] = useState(CHECKOUT_STATUSES.LOADING)
  const [errorMessage, setErrorMessage] = useState(null)
  const [requiredFields, setRequiredFields] = useState([])

  useEffect(() => {
    if (user?.id) {
      setRequiredFields(['whoami', 'saved-payment-methods'])
    } else {
      setRequiredFields(['email', 'payment-methods', 'saved-payment-methods'])
    }
  }, [user])


  // [PAYMENT_INTENT_PROCESSING] starts
  const processPaymentIntent = useMutation(
    ({ email }: { email: string }) => {
      if (status !== CHECKOUT_STATUSES.READY) {
        throw new Error('PAYMENT_INTENT_NOT_READY')
      }

      return _processPaymentIntent({
        email,
        paymentIntentId: paymentIntent.data.paymentIntentId,
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
        paymentIntent: paymentIntent.data,
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

    error,
    value,
    empty,
    complete,
  }) {
    log.debug('onPaymentMethodChange', {

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
  }, [])

  const { transactions, totalAmount, currency } =
    paymentIntent.data || {
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
    requiredFields,
    onPaymentMethodChange,
  }
}
