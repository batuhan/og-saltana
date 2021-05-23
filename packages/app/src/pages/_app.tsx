import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import customTheme from '../chakra-ui/customTheme'
import { CartProvider } from "react-use-cart";

function App({ Component, pageProps }: AppProps) {
  const queryClientRef = React.useRef()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }

  return (
    <>
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider theme={customTheme}>
          <CartProvider>
            <Component {...pageProps} />
            </CartProvider>
          </ChakraProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}

export default App
