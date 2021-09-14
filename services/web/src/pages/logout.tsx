import { getSession, signOut } from 'next-auth/client'
import { useEffect } from 'react'

import { Logo } from 'components/Logo'

import { NextSeo } from 'next-seo'

export default function Logout() {
  useEffect(() => {
    signOut({ callbackUrl: 'https://www.saltana.com' })
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <NextSeo title="Logout" />
      <div className="max-w-md w-full space-y-8">
        <div>
          <Logo className="mx-auto h-5 w-auto" h={9} />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Logging you out...
          </h2>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: context.req.query?.redirectTo || '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
