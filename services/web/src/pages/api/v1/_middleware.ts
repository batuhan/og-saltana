import { NextRequest, NextResponse } from 'next/server'
import { withSession } from '@clerk/nextjs/edge'

const CORE_API_URL = process.env.CORE_API_URL || 'http://localhost:4100'
const publicApiKey = process.env.NEXT_PUBLIC_SALTANA_CORE_PUBLISHABLE_KEY

async function middleware(req: NextRequest, res: NextResponse) {
  // Run cors
  // await cors(req, res)
  const path = req.nextUrl.pathname.replace(/^\/api\/v1/, '')
  const method = req.method || 'GET'

  const headers = {
    'Content-Type': 'application/json',
    'x-saltana-version': '2020-08-10',
  }

  const organizationId = req.headers.get('x-saltana-organization-id')
  if (organizationId) {
    headers['x-saltana-organization-id'] = organizationId
  }

  const authHeaderInRequest = req.headers.get('Authorization')
  // Transforming to custom Authorization scheme
  // https://tools.ietf.org/html/draft-ietf-httpbis-p7-auth-19#appendix-B
  // Note that Saltana API header content parsing is case-insensitive
  // But we use casing for clarity here, as in 'apiKey'

  if (req.cookies?.__session) {
    const token = req.cookies.__session
    headers.authorization = `SaltanaCore-V2 apiKey=${publicApiKey}, tokenType=clerk, token=${token}`
  } else if (publicApiKey) {
    headers.authorization = `Basic ${btoa(publicApiKey + ':')}`
  } else {
    // @TODO: this should override stuff
    headers.authorization = authHeaderInRequest
  }

  try {
    const response = await fetch(`${CORE_API_URL}${path}`, {
      method,
      headers: { ...headers },
    })

    const parsed = await response.json()

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in the auth middleware', error)
  }
}
export default middleware
