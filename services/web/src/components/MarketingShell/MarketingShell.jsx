import React from 'react'
import tw, { styled } from 'twin.macro'
import Header from './Header'
import Footer from './Footer'
function MarketingShell({ children }) {
  return (
    <div tw="min-h-screen bg-white">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default MarketingShell
