import { ChakraProvider } from '@chakra-ui/react'
import { CartProvider } from "react-use-cart";

import theme from '../modules/theme'
import { AppProps } from 'next/app'
import Shell from "../components/Shell"

function SaltanaApp({ Component, pageProps }: AppProps) {
  return (
      <ChakraProvider resetCSS theme={theme}>
          <CartProvider>
        <Shell>
          <Component {...pageProps} />
        </Shell>
          </CartProvider>
      </ChakraProvider>
  )
}

export default SaltanaApp
