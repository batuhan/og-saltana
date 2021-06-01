import { useState, useEffect, useMemo, createContext, useContext } from 'react'
import { createInstance } from '@saltana/sdk'
import { useSession, signOut } from 'next-auth/client'

export const ApiInstanceContext = createContext(null)
const apiKey = process.env.NEXT_PUBLIC_SALTANA_CORE_PUBLISHABLE_KEY

export const sharedInstance = createInstance({
  apiKey,
})

export default function ApiInstanceContextComp({ children }) {
  const [session, loading] = useSession()

  const instance = useMemo(() => createInstance({
    apiKey,
  }), [session]);

  useEffect(() => {
    if (session) {
      const info = instance.auth.setTokens({
        accessToken: session.coreAccessToken,
        refreshToken: session.refreshToken,
        tokenType: 'Bearer',
        userId: session.user.id,
      })
      console.log({info})
    }

    const unsubscribe =
      instance &&
      instance.onError('userSessionExpired', function () {
        signOut()
      })

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [session, instance])

  return (
    <ApiInstanceContext.Provider
      value={{
        session,
        loading,
        ready: !loading,
        instance,
      }}
    >
      {children}
    </ApiInstanceContext.Provider>
  )
}

export const useApiInstance = () => useContext(ApiInstanceContext)
