import CreatorSpaceShell from 'components/CreatorSpace/Shell'
import getStaticPropsForCreatorSpacePages from '@/server/getStaticPropsForCreatorSpacePages'
import useCreatorSpace from 'hooks/useCreatorSpace'
import { useCart } from 'react-use-cart'
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
  const { asset } = useCreatorSpace()
  const { setItems, isEmpty } = useCart()

  useEffect(() => {
    if (asset.data?.id) {
      setItems([
        {
          id: asset.data.id,
          price: asset.data.price,
          currency: asset.data.currency,
          name: asset.data.name,
        },
      ])
    }
  }, [asset.data])

  return (
    <CreatorSpaceShell>
      {isEmpty ? 'Loading...' : <CheckoutForm />}
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
