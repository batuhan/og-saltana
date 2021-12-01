
import { GetServerSideProps } from 'next'

export default function DashboardRedirectThingy() {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  resolvedUrl,
  params,
  res,
}) => {
  const destination = `/dashboard/${params.creator}/links`

  return {
    redirect: {
      destination,
      permanent: false,
    },
  }
}
