import { CartProvider } from 'react-use-cart'

import { Hydrate } from 'react-query/hydration'
import { Provider } from 'next-auth/client'
import { ReactQueryDevtools } from 'react-query/devtools'
import { getTokens } from '@kiwicom/orbit-components'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from '../../components/GlobalStyles'
import { SaltanaCoreProvider } from './SaltanaCoreProvider'

const tokens = getTokens()

function Providers({ children, pageProps }) {
  return (
    <ThemeProvider theme={{ orbit: tokens }}>
      <GlobalStyles />

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
