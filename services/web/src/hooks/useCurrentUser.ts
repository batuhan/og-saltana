import { useSession } from '@clerk/nextjs'
import useApi from './useApi'

export default function useCurrentUser() {
  const { session, isSignedIn } = useSession({ withAssertions: true })

  const IsSignedIn = isSignedIn(session)
  const currentUser = useApi('users', 'read', 'me', {
    enabled: IsSignedIn,
  })

  const user = currentUser.isFetched ? currentUser.data : null
  if (user) {
    user.isCreator = user?.roles?.includes('provider')
  }
  return { user }
}
