import { GetServerSideProps } from 'next'
import { getSaltanaInstance } from '@/common/api'
import buildLoginLink from '@/server/buildLoginLink'
import useCurrentUser from '@/hooks/useCurrentUser'
import React, { useEffect } from 'react'
import { SignUp, SignedIn, RedirectToSignIn, RedirectToUserProfile, SignedOut } from "@clerk/nextjs";
import getServerSidePropsForCreatorDashboardPages from '@/server/getServerSidePropsForCreatorDashboardPages'

export default function Dashboard() {
  return null
}

export const getServerSideProps: GetServerSideProps = getServerSidePropsForCreatorDashboardPages()
