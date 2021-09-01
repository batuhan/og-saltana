import CreatorSpaceShell from 'components/CreatorSpace/Shell'
import getStaticPropsForCreatorSpacePages from '@/server/getStaticPropsForCreatorSpacePages'
import useCreatorSpace from 'hooks/useCreatorSpace'
import { useCart } from 'react-use-cart'
import React, { useEffect } from 'react'
import CheckoutForm from 'components/Checkout/CheckoutForm'
import tw from 'twin.macro'
import { useRouter } from 'next/router'
interface ProductLineProps {
  name?: string
  price: number
  children?: React.ReactNode
  id: string
}

const CreatorSpaceCheckout2 = () => {
  const router = useRouter()
  const { assets } = router.query
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
  }, [asset])

  return (
    <CreatorSpaceShell mode="embed">
      {isEmpty ? 'Loading...' : <CheckoutForm />}
    </CreatorSpaceShell>
  )
}
const CreatorSpaceCheckout = () => {
  const router = useRouter()
  const { assets } = router.query
  useEffect(() => {
    if (assets) {
      const parsedAssets = JSON.parse(assets)
      console.log(parsedAssets)
    }
  }, [assets])
  return null
}

export default CreatorSpaceCheckout
