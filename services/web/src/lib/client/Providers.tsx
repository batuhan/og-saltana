import { Hydrate } from 'react-query/hydration'
import { ClerkProvider } from '@clerk/nextjs';
import { ReactQueryDevtools } from 'react-query/devtools'
import { SaltanaCoreProvider } from './SaltanaCoreProvider'

import { getTokens } from '@kiwicom/orbit-components'
import { ThemeProvider } from 'styled-components'

function Providers({ children, pageProps }) {
  const tokens = getTokens()

  return (
    <ThemeProvider theme={{ orbit: tokens }}>
      <ClerkProvider>
        <SaltanaCoreProvider>
          <Hydrate state={pageProps.dehydratedState}>
            {children}
            {process.env.NODE_ENV === 'development' && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
          </Hydrate>
        </SaltanaCoreProvider>
      </ClerkProvider>
    </ThemeProvider>
  )
}

export default Providers
