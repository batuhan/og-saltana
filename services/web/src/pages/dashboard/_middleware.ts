import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, withSession } from '@clerk/nextjs/edge'
import _ from 'lodash'
import { adminApi } from '@/server/apis'
import buildLoginLink from '@/server/buildLoginLink'
import COMMON_LINKS from '@/common/common-links'
import { getSaltanaInstanceFor } from '@/common/api'

async function middleware(req: NextRequest) {
  const clerkUserId = _.get(req, 'session.userId', null)
  const token = _.get(req, 'cookies.__session')
  const resolvedUrl = req.nextUrl.href
  const loginLink = buildLoginLink({ resolvedUrl })

  console.log(req.nextUrl, { clerkUserId, resolvedUrl, loginLink })
  if (clerkUserId === null) {
    return NextResponse.redirect(loginLink, 302)
  }

  // check if we are on the main domain for the env

  try {
    await verifyToken(token)
  } catch (err) {
    console.log('Error when verifying token from Clerk', err)
    return NextResponse.redirect(loginLink, 302)
  }

  const instance = getSaltanaInstanceFor('clerk', token)
  try {
    await instance.auth.loginWithClerk() //@TODO: should not be here EVER
  } catch (err) {
    console.log('Error when SSO with Clerk', err)
    return NextResponse.redirect(loginLink, 302)
  }

  const user = await instance.users.read('me')
  const isCreator = _.get(user, 'roles', []).includes('provider')

  if (isCreator === false) {
    return NextResponse.redirect(COMMON_LINKS.REQUEST_INVITE)
  }

  if (req.nextUrl.pathname.startsWith('/dashboard/welcome')) {
    // Rest of this middleware is not relavant to onboarding
    return
  }

  const spaceKey = user.username || user.id

  if (req.nextUrl.pathname.startsWith('/dashboard/_/')) {
    return NextResponse.redirect(
      req.nextUrl.pathname.replace('/dashboard/_/', `/dashboard/${spaceKey}/`),
    )
  }

  req.headers.set('X-CurrentUser-ID', user.id) // @IMPORTANT: use for convenience, always validate the current user
  req.headers.set('X-CurrentUser-SpaceKey', spaceKey) // @IMPORTANT: use for convenience, always validate the current user

  const finishedOnboarding = _.get(
    user,
    'metadata._private.finishedOnboarding',
    false,
  )

  if (finishedOnboarding === false) {
    const isAnOnboardingPath =
      req.nextUrl.pathname.startsWith('/dashboard/welcome')

    if (isAnOnboardingPath === true) {
      // Rest of this middleware is not relavant to onboarding
      return
    }

    return NextResponse.redirect('/dashboard/welcome')
  }

  const creatorSlug = _.get(user, 'metadata._private.creatorSlug', null)
  const creatorSlugInLink = _.get(user, 'metadata._private.creatorSlug', null)

  if (req.nextUrl.pathname === '/dashboard' && creatorSlug !== null) {
    return NextResponse.redirect(`/dashboard/${creatorSlug}/links`)
  }
  if (creatorSlug !== creatorSlugInLink) {
    return NextResponse.redirect(
      resolvedUrl.replace(creatorSlugInLink, creatorSlug),
    )
  }
}

export default withSession(middleware)
