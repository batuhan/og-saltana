import type { AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
import { CartProvider, useCart } from 'react-use-cart'

import { Hydrate } from 'react-query/hydration'
import { Provider } from 'next-auth/client'
import { ReactQueryDevtools } from 'react-query/devtools'
import { DefaultSeo } from 'next-seo'
import GlobalStyles from 'components/GlobalStyles'
import { SaltanaCoreProvider } from '@/client/SaltanaCoreProvider'
import SEO from '../../next-seo.config'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>

      <DefaultSeo {...SEO} />

      <Provider session={pageProps.session}>
        <SaltanaCoreProvider>
          <Hydrate state={pageProps.dehydratedState}>
            <CartProvider>
              <Component {...pageProps} />
            </CartProvider>
            {process.env.NODE_ENV === 'development' && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
          </Hydrate>
        </SaltanaCoreProvider>
      </Provider>
    </>
  )
}

export default App
