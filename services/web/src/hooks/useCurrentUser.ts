import { useSession } from 'next-auth/client'
import { useApi } from './useApi'

export default function useCurrentUser() {
  const [session, loading] = useSession()
  const _api = useApi('users', 'read', session ? session.user.id : null, {
    enabled: !!session,
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
    const data = _api.data || {}

    if (usernameOrUserId === data.username) {
      return true
    }

    return false
  }
  return { ..._api, is, session }
}
