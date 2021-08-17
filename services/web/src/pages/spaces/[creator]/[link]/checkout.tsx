import CreatorSpaceShell from 'components/CreatorSpace/Shell'
import getStaticPropsForCreatorSpacePages from '@/server/getStaticPropsForCreatorSpacePages'
import useCreatorSpace from 'hooks/useCreatorSpace'
import { useCart } from 'react-use-cart'
import { Elements } from '@stripe/react-stripe-js'
import getStripe from '@/client/stripe'
import React, { useEffect } from 'react'
import CheckoutForm from 'components/Checkout/CheckoutForm'
import tw from 'twin.macro'

interface ProductLineProps {
  name?: string
  price: number
  children?: React.ReactNode
  id: string
}

const CreatorSpaceCheckout = ({ embed }) => {
  const { link, creator, asset } = useCreatorSpace()
  const { addItem, isEmpty, totalUniqueItems, items, cartTotal } = useCart()

  useEffect(() => {
    if (isEmpty && asset.data) {
      addItem({
        id: asset.data.id,
        price: asset.data.price,
        currency: asset.data.currency,
        name: asset.data.name,
      })
    }
  }, [isEmpty, asset])

  if (isEmpty)
    return (
      <CreatorSpaceShell>
        <p>Your cart is empty</p>
      </CreatorSpaceShell>
    )

  return (
    <CreatorSpaceShell>
      <Elements stripe={getStripe()}>
        <CheckoutForm />
      </Elements>
    </CreatorSpaceShell>
  )
}

export const getStaticProps = getStaticPropsForCreatorSpacePages()

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export default CreatorSpaceCheckout
