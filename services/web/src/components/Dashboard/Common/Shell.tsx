import tw from 'twin.macro'
import { useEffect } from 'react'
import useCurrentUser from 'hooks/useCurrentUser'
import Footer from './Footer'
import Header from './Header'
import { useRouter } from 'next/router'

export default function DashboardShell({
  children,
  container = true,
  subHeader = null,
}) {
  const router = useRouter()
  const { isLoading, isLoggedIn } = useCurrentUser()

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push(`/login?callbackUrl=fsdfs`)
    }
  }, [isLoading, isLoggedIn, router])

  return (
    <div tw="min-h-screen flex flex-col h-screen justify-between">
      <div tw="bg-black text-white">
        <Header />
      </div>

      {container === true ? (
        <>
          {subHeader}
          <main tw="pt-5 mb-auto bg-white text-black">
            <div tw="max-w-3xl mx-auto lg:max-w-5xl  bg-white text-black">
              {children}
            </div>
          </main>
        </>
      ) : (
        children
      )}

      <Footer />
    </div>
  )
}
