import { useSession } from 'next-auth/client'
import useApi from './useApi'

export default function useCurrentUser() {
  const [session, loading] = useSession()
  const gotSession = !loading && !!session

  const api = useApi('users', 'read', session ? session.user.id : null, {
    enabled: gotSession,
    initialData: {
      username: null,
      email: null,
      id: null,
      roles: [],
    },
  })

  const is = (usernameOrUserId) => {
    if (!session) {
      return false
    }

    if (usernameOrUserId === session.user.id) {
      return true
    }
    const data = api.data || {}

    if (usernameOrUserId === data.username) {
      return true
    }

    return false
  }

  return {
    isLoading: api.isLoading,
    is,
    isLoggedIn: !!(!api.isLoading && api.data.id),
    data: api.data,
    session,
  }
}
