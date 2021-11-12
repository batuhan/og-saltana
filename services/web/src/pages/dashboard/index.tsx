import { GetServerSideProps } from 'next'
import { getSaltanaInstance } from '@/client/api'
import buildLoginLink from '@/server/buildLoginLink'
import useCurrentUser from '@/hooks/useCurrentUser'
import React, { useEffect } from 'react'
import { SignUp, SignedIn, RedirectToSignIn, RedirectToUserProfile, SignedOut } from "@clerk/nextjs";

function RedirectToPrimaryCreatorSpace() {
  const currentUser = useCurrentUser()

  useEffect(() => {
    console.log('changed currentUser', currentUser)
    console.log('loaded ', currentUser)



  }, [currentUser])

  return null
}
export default function DashboardRedirectThingy() {

  return (<>
    <SignedIn>
      <RedirectToPrimaryCreatorSpace />
    </SignedIn>

    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
  </>)
}
