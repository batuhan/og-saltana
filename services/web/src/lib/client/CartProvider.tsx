import { useEffect } from 'react'
import { CartProvider, useCart } from 'react-use-cart'

// creates a hash for the cart contents
// we don't expect too many items on the cart
// so this works (for now)
function hashifyCart(items = []) {
  return items.map(({ id, quantity }) => `${id}:${quantity}`).join('|')
}

function Cart({ children }) {
  const { isEmpty, totalUniqueItems, items, updateItemQuantity, removeItem } =
    useCart()

  useEffect(() => {}, [items])

  return []
}

function CustomCartProvider({ children, pageProps }) {
  return (
    <CartProvider>
      <Cart>{children}</Cart>
    </CartProvider>
  )
}

export default CustomCartProvider
