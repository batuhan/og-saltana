import React from 'react'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/client'

export default function Authenticated({ children }) {
  const [session, loading] = useSession()
  const router = useRouter()
  const isUser = !!session?.user
  React.useEffect(() => {
    if (loading) return // Do nothing while loading
    if (!isUser) signIn()
  }, [isUser, loading])

  if (isUser) {
    return children
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>
}
