import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import customTheme from '../chakra-ui/customTheme'
import { CartProvider } from 'react-use-cart'
import { Provider } from 'next-auth/client'
import Authenticated from '../modules/auth/Authenticated'
import ApiProvider from '../modules/api/useApi'
import { ReactQueryDevtools } from 'react-query/devtools'
import GlobalHeader from '../components/GlobalHeader'
import { DefaultSeo } from 'next-seo'

// import your default seo configuration
import SEO from '../../next-seo.config'

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
      <Provider session={pageProps.session}>
        <ApiProvider>
          <QueryClientProvider client={queryClientRef.current}>
            <Hydrate state={pageProps.dehydratedState}>
              <ChakraProvider theme={customTheme}>
                <CartProvider>
                  <DefaultSeo {...SEO} />
                  {Component.useGlobalHeader && <GlobalHeader />}
                  {Component.auth ? (
                    <Authenticated>
                      <Component {...pageProps} />
                    </Authenticated>
                  ) : (
                    <Component {...pageProps} />
                  )}
                </CartProvider>
              </ChakraProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </Hydrate>
          </QueryClientProvider>
        </ApiProvider>
      </Provider>
    </>
  )
}

export default App
