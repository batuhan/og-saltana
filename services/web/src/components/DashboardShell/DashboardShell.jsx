import { useEffect } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import tw, { styled } from 'twin.macro'
import Footer from './Footer'
import Header from './Header'
import { useCurrentUser } from '../../modules/api'
import { useRouter } from 'next/router'

export default function DashboardShell({
  children,
  container = true,
  subHeader = null,
}) {
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
