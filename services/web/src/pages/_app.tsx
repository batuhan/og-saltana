import type { AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { Provider } from 'next-auth/client'
import { queryClientSettings } from '../lib/client/api'
import { ReactQueryDevtools } from 'react-query/devtools'
import { DefaultSeo } from 'next-seo'
import SEO from '../../next-seo.config'
import GlobalStyles from '../components/GlobalStyles'

function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () => new QueryClient(queryClientSettings)
  )

  return (
    <>
      <GlobalStyles />
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>

      <Provider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </Hydrate>
        </QueryClientProvider>
      </Provider>
    </>
  )
}

export default App
