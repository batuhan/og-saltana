import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, withSession } from '@clerk/nextjs/edge'
import buildLoginLink from '@/server/buildLoginLink'

export default async function verifySession(req: NextRequest) {
  const token = req.cookies?.__session || null

  const resolvedUrl = req.nextUrl.href
  const loginLink = buildLoginLink({ resolvedUrl })

  if (token === null) {
    return NextResponse.redirect(loginLink, 302)
  }

  try {
    const verifiedToken = await verifyToken(token)

    const isExpiredToken = new Date(verifiedToken.exp * 1000) < new Date()

    if (isExpiredToken) {
      throw new Error('Token is expired')
    }
  } catch (err) {
    console.log('Error when verifying token from Clerk', err)
    return NextResponse.redirect(loginLink, 302)
  }
}
