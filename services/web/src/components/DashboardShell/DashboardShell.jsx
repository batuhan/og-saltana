import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import tw, { styled } from 'twin.macro'
import Footer from './Footer'
import Header from './Header'

export default function DashboardShell({ children }) {
  return (
    <div tw="min-h-screen ">
      <div tw="bg-black text-white">
      <Header />
      </div>

      <main tw="pt-5 bg-white text-black">
        <div tw="max-w-3xl mx-auto lg:max-w-5xl  bg-white text-black">
        {children}
        </div>
      </main>

      <Footer />
    </div>
  )
}
