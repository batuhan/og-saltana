import type { AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
import { DefaultSeo } from 'next-seo'

import SEO from '../../next-seo.config'
import Providers from '@/client/Providers'
import '../styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <Providers pageProps={pageProps}>
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>

      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </Providers>
  )
}

export default App
