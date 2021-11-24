import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, withSession } from '@clerk/nextjs/edge'
import _ from 'lodash'
import { adminApi } from '@/server/apis'
import buildLoginLink from '@/server/buildLoginLink'
import COMMON_LINKS from '@/common/common-links'
import { getSaltanaInstanceFor } from '@/common/api'

async function verifySession(req: NextRequest) {
  const token = _.get(req, 'cookies.__session', null)
  const resolvedUrl = req.nextUrl.href
  const loginLink = buildLoginLink({ resolvedUrl })

  if (token === null) {
    return NextResponse.redirect(loginLink, 302)
  }

  try {
    await verifyToken(token)
  } catch (err) {
    console.log('Error when verifying token from Clerk', err)
    return NextResponse.redirect(loginLink, 302)
  }
}

export default verifySession
