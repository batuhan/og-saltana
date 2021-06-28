import React from 'react'
import { useCurrentUser } from '../api'
import { useRouter } from 'next/router'

export default function Authenticated({ children }) {
  const router = useRouter()

  const { data, isLoading, session } = useCurrentUser()

  console.log(data, isLoading, session)
  const isUser = !!session?.user

  if (!isLoading && data?.id) {
    return children
  }

  if (session && !isUser) {
    return <LoginPage />
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loadingtest...</div>
}
