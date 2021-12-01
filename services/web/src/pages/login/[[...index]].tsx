
import React, { useEffect } from 'react'
import { NextSeo } from 'next-seo'

import { SignIn, SignedOut, RedirectToUserProfile, SignedIn } from "@clerk/nextjs";
import { useRouter } from 'next/router';

export default function Login() {

  const router = useRouter();
  // get redirectTo from query
  const { redirectTo = 'http://dev.saltana.com/dashboard' } = router.query;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <NextSeo title="Login" />
      <div className="max-w-md w-full space-y-8">

        <SignedIn>
          <RedirectToUserProfile />
        </SignedIn>
        <SignedOut>

          <SignIn signUpURL="/register" path="/login" routing="path" redirectUrl={redirectTo as string} />
        </SignedOut>

      </div>
    </div>
  )
}
