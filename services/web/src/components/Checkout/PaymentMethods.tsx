import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { CARD_OPTIONS } from 'hooks/useCheckout'
import tw from 'twin.macro'

export default function PaymentMethods({ onPaymentMethodChange }) {
  return (
    <div tw="col-span-full">
      <label htmlFor="card-number" tw="block text-sm font-medium text-gray-700">
        Card number
      </label>
      <div tw="mt-1 mb-5">
        <div tw="block w-full">
          <CardElement
            options={CARD_OPTIONS}
            onChange={(e) => {
              console.log('onPaymentMethodChange', e)
            }}
          />
        </div>
      </div>
    </div>
  )
}
