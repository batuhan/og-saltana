import { useSession } from 'next-auth/client'
import React from 'react'
import { useCurrentUser } from '../api'
import { LoginPage } from './Login'

export default function Authenticated({ children }) {
  const { data, isLoading, session } = useCurrentUser()

  const isUser = !!session?.user

  if (!isLoading && data?.id) {
    return children
  }

  if (session && !isUser) {
    return <LoginPage />
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>
}
