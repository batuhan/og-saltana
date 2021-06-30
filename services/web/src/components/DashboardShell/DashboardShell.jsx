import { useEffect } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import tw, { styled } from 'twin.macro'
import Footer from './Footer'
import Header from './Header'
import { useCurrentUser } from '../../modules/api'
import { useRouter } from 'next/router'

export default function DashboardShell({ children }) {
  const user = useCurrentUser()

  const router = useRouter()

  useEffect(() => {

    console.log(user)

    const { data: {platformData, roles}}  = user
    console.log([user.data.platformData, user.data.roles])

    if (roles.includes('provider') && platformData?._private?.finishedOnboarding !== true) {
      router.push("/welcome/creator")
    }

  }, [])
  return (
    <div tw="min-h-screen flex flex-col h-screen justify-between">
      <div tw="bg-black text-white">
        <Header />
      </div>

      <main tw="pt-5 mb-auto bg-white text-black">
        <div tw="max-w-3xl mx-auto lg:max-w-5xl  bg-white text-black">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  )
}
