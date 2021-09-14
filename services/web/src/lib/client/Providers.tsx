import { CartProvider } from 'react-use-cart'

import { Hydrate } from 'react-query/hydration'
import { Provider } from 'next-auth/client'
import { ReactQueryDevtools } from 'react-query/devtools'
import { SaltanaCoreProvider } from './SaltanaCoreProvider'

import { getTokens } from '@kiwicom/orbit-components'
import { ThemeProvider } from 'styled-components'

function Providers({ children, pageProps }) {
  const tokens = getTokens()

  return (
    <ThemeProvider theme={{ orbit: tokens }}>
      <Provider session={pageProps.session}>
        <SaltanaCoreProvider>
          <Hydrate state={pageProps.dehydratedState}>
            <CartProvider>{children}</CartProvider>
            {process.env.NODE_ENV === 'development' && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
          </Hydrate>
        </SaltanaCoreProvider>
      </Provider>
    </ThemeProvider>
  )
}

export default Providers
