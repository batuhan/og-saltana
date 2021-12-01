
import { LockClosedIcon } from '@heroicons/react/solid'
import { Logo } from 'components/Logo'
import React, { useEffect } from 'react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

import Link from 'next/link'
import classnames from '@/common/classnames'

import { SignUp, SignedIn, RedirectToSignIn, RedirectToUserProfile, SignedOut } from "@clerk/nextjs";

export default function Register() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <NextSeo title="Register" />
      <div className="max-w-md w-full space-y-8">
        <SignedIn>
          <RedirectToUserProfile />
        </SignedIn>

        <SignedOut>
          <SignUp signInUrl="/login" routing="path" path="/register" />
        </SignedOut>
      </div>
    </div>
  )
}