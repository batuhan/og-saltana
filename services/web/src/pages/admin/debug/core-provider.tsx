import useCurrentUser from '@/hooks/useCurrentUser'
import { useSession } from '@clerk/nextjs'

const CreatorProfile = () => {
  const { session } = useSession({ withAssertions: true })
  const { user } = useCurrentUser()
  return (
    <>
      <pre>
        {JSON.stringify(session, null, 2)}
      </pre>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
    </>
  )
}

export default CreatorProfile
