import verifySession from '@/server/verifySession'
import { NextRequest, NextResponse } from 'next/server'

async function middleware(req: NextRequest) {
  return verifySession(req)
}

export default middleware
