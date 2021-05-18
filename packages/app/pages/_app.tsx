import { ChakraProvider } from '@chakra-ui/react'
import { CartProvider } from 'react-use-cart'
import { Provider } from 'next-auth/client'

import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { ReactQueryDevtools } from 'react-query/devtools'

import theme from '../modules/theme'
import { AppProps } from 'next/app'
import Shell from '../components/shell/Shell'
import React from 'react'

function SaltanaApp({ Component, pageProps }: AppProps) {
  const queryClientRef = React.useRef()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }

  return (
    <Provider session={pageProps.session}>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider resetCSS theme={theme}>
            <CartProvider>
              <Shell>
                <Component {...pageProps} />
              </Shell>
            </CartProvider>
          </ChakraProvider>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  )
}

export default SaltanaApp
