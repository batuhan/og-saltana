import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import { formatAmountForDisplay } from '..'
import * as config from '../config'
import { useMutation } from 'react-query'
import axios from 'axios'

import { useForm } from 'react-hook-form'
import { useLogin, login } from '../../../services/web/src/modules/client/auth'
const CARD_OPTIONS = {
  iconStyle: 'solid' as const,
  style: {
    base: {
      iconColor: '#6772e5',
      color: '#6772e5',
      fontWeight: '500',
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#6772e5',
      },
    },
    invalid: {
      iconColor: '#ef2961',
      color: '#ef2961',
    },
  },
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

const ElementsForm = ({ cartTotal, items }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [paymentStatus, setPaymentStatus] = useState('initial')
  const [errorMessage, setErrorMessage] = useState('')
  const stripe = useStripe()
  const elements = useElements()
  const assets = items.map(({ id, quantity }) => ({ id, quantity }))
  const loginMutation = useLogin({ redirect: true })

  const onSubmit = async ({ email, cardholderName }) => {
    setPaymentStatus('processing')

    const paymentIntentResponse = await axios.post(
      '/api/methods/checkout-intent',
      {
        assets,
        email,
        cardholderName,
      }
    )

    console.log({ paymentIntentResponse })

    if (paymentIntentResponse.status === 500) {
      setPaymentStatus('error')
      setErrorMessage(JSON.stringify(paymentIntentResponse.data))
      return
    }

    const cardElement = elements.getElement(CardElement)

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      paymentIntentResponse.data.paymentIntent.client_secret,
      {
        payment_method: {
          card: cardElement,
          billing_details: { name: cardholderName, email },
        },
      }
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
    <chakra.form width="full" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <Input
          type="email"
          autoComplete="email"
          {...register('email', {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
          placeholder="E-mail address"
          _placeholder={{
            color: 'gray.500',
          }}
        />
        <Input
          type="text"
          {...register('name', {
            required: true,
          })}
          placeholder="Cardholder Name"
          re
          _placeholder={{
            color: 'gray.500',
          }}
        />
        <CardElement
          options={CARD_OPTIONS}
          onChange={(e) => {
            if (e.error) {
              setPaymentStatus('error')
              setErrorMessage(e.error.message ?? 'An unknown error occurred')
            }
          }}
        />
      </Stack>

      <Button
        type="submit"
        mt="3"
        isFullWidth
        fontSize="sm"
        fontWeight="bold"
        colorScheme="gray"
        disabled={
          !['initial', 'succeeded', 'error'].includes(paymentStatus) || !stripe
        }
      >
        Pay {formatAmountForDisplay(cartTotal, config.CURRENCY)}
      </Button>

      <PaymentStatus status={paymentStatus} errorMessage={errorMessage} />
    </chakra.form>
  )
}

export default ElementsForm
