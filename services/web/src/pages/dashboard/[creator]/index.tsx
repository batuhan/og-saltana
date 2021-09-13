import { getSession } from 'next-auth/client'
import { GetServerSideProps } from 'next'
import { getSaltanaInstance } from '@/client/api'
import buildLoginLink from '@/server/buildLoginLink'

export default function DashboardRedirectThingy() {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  resolvedUrl,
  res,
}) => {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: buildLoginLink({ resolvedUrl }),
        permanent: false,
      },
    }
  }

  const instance = await getSaltanaInstance(session)

  const user = await instance.users.read(session.user.id)

  const destination = `/dashboard/${user.username}/links`

  return {
    redirect: {
      destination,
      permanent: false,
    },
  }
}
