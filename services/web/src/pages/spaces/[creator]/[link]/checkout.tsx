import CreatorSpaceShell from 'components/CreatorSpace/Shell'
import getStaticPropsForCreatorSpacePages from '@/server/getStaticPropsForCreatorSpacePages'
import useCreatorSpace from 'hooks/useCreatorSpace'
import { useCart } from 'react-use-cart'
import { Elements } from '@stripe/react-stripe-js'
import getStripe from '@/client/stripe'
import React, { useEffect } from 'react'
import CheckoutForm from 'components/CreatorSpace/Asset/CheckoutForm'

interface ProductLineProps {
  name?: string
  price: number
  children?: React.ReactNode
  id: string
}

export const ProductLine = (props: ProductLineProps) => {
  const { name, id, price, quantity } = props
  const { removeItem } = useCart()

  return (
    <div>
      {name} ({quantity}) ${price}
      <span onClick={() => removeItem(id)}>remove</span>
    </div>
  )
}

const CreatorSpaceCheckout = ({ embed }) => {
  const { link, creator, asset } = useCreatorSpace()
  const { addItem, isEmpty, totalUniqueItems, items, cartTotal } = useCart()

  useEffect(() => {
    if (isEmpty && asset.data) {
      addItem({
        id: asset.data.id,
        price: asset.data.amount,
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
      {asset.data && <div>{JSON.stringify(asset.data)}</div>}
      Cart ({totalUniqueItems})
      {items.map((item) => (
        <ProductLine key={item.id} {...item} />
      ))}
      <Elements stripe={getStripe()}>
        <CheckoutForm cartTotal={cartTotal} items={items} />
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
