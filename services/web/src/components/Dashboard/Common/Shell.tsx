import tw from 'twin.macro'
import { useEffect } from 'react'
import useCurrentUser from 'hooks/useCurrentUser'
import { useRouter } from 'next/router'
import Footer from './Footer'
import Header from './Header'

export default function DashboardShell({
  children,
  container = true,
  subHeader = null,
}) {
  const router = useRouter()
  const { isLoading, isLoggedIn } = useCurrentUser()

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push(`/login?redirectTo=REPLACE`)
    }
  }, [isLoading, isLoggedIn, router])

  return (
    <div className="min-h-screen flex flex-col h-screen justify-between">
      <div className="bg-black text-white">
        <Header />
      </div>

      {container === true ? (
        <>
          {subHeader}
          <main className="mb-auto bg-white text-black h-full">
            <div className="max-w-3xl mx-auto lg:max-w-5xl  bg-white text-black">
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
