import { useSession } from 'next-auth/client'
import React, { useMemo } from 'react'
import { QueryClientProvider } from 'react-query'
import { createQueryClient } from './api'

function SaltanaCoreProvider({ children }) {
  const [session, loading] = useSession()
  const queryClient = useMemo(() => createQueryClient(session), [session])
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export { SaltanaCoreProvider }
