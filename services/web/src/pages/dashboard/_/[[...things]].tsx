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

  console.log(req)
  const destination = resolvedUrl.replace(
    '/dashboard/_/',
    `/dashboard/${user.username}/`,
  )

  return {
    redirect: {
      destination,
      permanent: false,
    },
  }
}
