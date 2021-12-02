import { Hydrate } from 'react-query/hydration'
import { ClerkProvider } from '@clerk/nextjs';
import { ReactQueryDevtools } from 'react-query/devtools'
import { SaltanaCoreProvider } from './SaltanaCoreProvider'

import { ThemeProvider } from 'styled-components'
import { QueryClientProvider, useQuery } from 'react-query'
import {
  sharedQueryClient,
} from '@/common/api'

import { MantineProvider, NormalizeCSS, GlobalStyles } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'

function Providers({ children, pageProps }) {

  return (
    <>
      <ClerkProvider>
        <SaltanaCoreProvider state={pageProps.coreState}>
          <Hydrate state={pageProps.dehydratedState}>

            <MantineProvider
              theme={{
                /** Put your mantine theme override here */
                colorScheme: 'light',
              }}
            >
              <NormalizeCSS />
              <GlobalStyles />
              <NotificationsProvider>
                {children}
              </NotificationsProvider>
            </MantineProvider>
            {process.env.NODE_ENV === 'development' && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
          </Hydrate>
        </SaltanaCoreProvider>
      </ClerkProvider>
    </>
  )
}

export function ProvidersWithoutExternal({ children, pageProps }) {

  return (
    <>
      <QueryClientProvider client={sharedQueryClient}>{children}

        <Hydrate state={pageProps.dehydratedState}>

          <MantineProvider
            theme={{
              /** Put your mantine theme override here */
              colorScheme: 'light',
            }}
          >
            <NormalizeCSS />
            <GlobalStyles />
            <NotificationsProvider>
              {children}
            </NotificationsProvider>
          </MantineProvider>
          {process.env.NODE_ENV === 'development' && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}
export default Providers
