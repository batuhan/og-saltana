import { NextRequest, NextResponse } from 'next/server'
import { withSession } from '@clerk/nextjs/edge'

async function middleware(req: NextRequest) {
  console.log('session', req.session)
  // if (req.session) {
  //   const verify = await req.session.verifyWithNetwork()
  //   console.log('verify, ', verify.body)
  //   //debugger
  // }

  //debugger
  // console.log('t', await req.session.verifyWithNetwork())
}

export default withSession(middleware)
