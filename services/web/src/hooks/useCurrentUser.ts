import { useSession } from 'next-auth/client'
import useApi from './useApi'

const is =
  ({ session, data }) =>
  (usernameOrUserId) => {
    if (!session) {
      return false
    }

    if (usernameOrUserId === session.user.id) {
      return true
    }

    if (usernameOrUserId === data.username) {
      return true
    }

    return false
  }

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

  return {
    isLoading: api.isLoading,
    is: is({ data: api.data, session }),
    isLoggedIn: !!(!api.isLoading && api.data.id),
    data: api.data,
    session,
  }
}
