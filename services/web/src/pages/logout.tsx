import { getSession, signOut } from 'next-auth/client'
import { useEffect } from 'react'

export default function Logout() {

  useEffect(() => {
    signOut()
  }, [])

  return null
}
