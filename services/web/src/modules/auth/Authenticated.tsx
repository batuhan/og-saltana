import { useSession } from 'next-auth/client'
import React from 'react'
import { LoginPage } from './Login'

export default function Authenticated({ children }) {
  const [session, loading] = useSession()
  const isUser = !!session?.user
  React.useEffect(() => {
    if (loading) return // Do nothing while loading
    //if (!isUser) signIn() // If not authenticated, force log in
  }, [isUser, loading])

  if (isUser) {
    return children
  }

  if (!loading && !isUser) {
    return <LoginPage />
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>
}
