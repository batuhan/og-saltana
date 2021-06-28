import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import tw, { styled } from 'twin.macro'
import Footer from './Footer'
import Header from './Header'

export default function DashboardShell({ children }) {
  return (
    <div tw="min-h-screen bg-black text-white">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
