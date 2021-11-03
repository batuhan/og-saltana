import { CurrentUserContext } from '@/client/SaltanaCoreProvider'
import { useContext } from 'react'

export default function useCurrentUser() {
  const values = useContext(CurrentUserContext)
  return {
    ...values,
  }
}
