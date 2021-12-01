import { CurrentUserContext } from '@/client/SaltanaCoreProvider'
import { useContext } from 'react'

export default function useCurrentUser() {
  return useContext(CurrentUserContext)
}
