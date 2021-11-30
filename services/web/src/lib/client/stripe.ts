/**
 * This is a singleton to ensure we only instantiate Stripe once.
 */
import { loadStripe } from '@stripe/stripe-js'

export const loadStripeWithTokens = () =>
  loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
export const stripePromise = loadStripeWithTokens()

export function formatAmountForDisplay(
  amount: number,
  currency: string,
): string {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  })
  return numberFormat.format(amount)
}

export function formatAmountForStripe(
  amount: number,
  currency: string,
): number {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  })
  const parts = numberFormat.formatToParts(amount)
  let zeroDecimalCurrency = true
  for (const part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100)
}
