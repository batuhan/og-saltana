import { Checkbox } from '@kiwicom/orbit-components'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { CARD_OPTIONS } from 'components/Checkout/useCheckout'
import React from 'react'
import { useForm, useController, Controller } from 'react-hook-form'

export default function PaymentMethods({ onPaymentMethodChange }) {
  return (
    <div className="col-span-full">
      <label
        htmlFor="card-number"
        className="block text-sm font-medium text-gray-700"
      >
        Card number
      </label>
      <div className="mt-1 mb-5">
        <div className="block w-full">
          <CardElement
            options={CARD_OPTIONS}
            onChange={onPaymentMethodChange}
          />
        </div>
      </div>
    </div>
  )
}
