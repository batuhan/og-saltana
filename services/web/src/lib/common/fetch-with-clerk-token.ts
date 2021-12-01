import { NextRequest, NextResponse } from 'next/server'

const CORE_API_URL = process.env.CORE_API_URL || 'http://localhost:4100'
const publicApiKey = process.env.NEXT_PUBLIC_SALTANA_CORE_PUBLISHABLE_KEY

async function middleware(path, { token, method }) {
  // Run cors
  // await cors(req, res)

  const path = req.nextUrl.pathname.replace(/^\/api\/v1/, '')
  const search = req.nextUrl.search
  const method = req.method || 'GET'

  const authHeaderInRequest = req.headers.get('Authorization')
  const headers = {
    'Content-Type': 'application/json',
    'x-saltana-version': '2020-08-10',
    authorization: authHeaderInRequest,
  }
  const organizationId = req.headers.get('x-saltana-organization-id')

  if (organizationId) {
    headers['x-saltana-organization-id'] = organizationId
  }
  // Transforming to custom Authorization scheme
  // https://tools.ietf.org/html/draft-ietf-httpbis-p7-auth-19#appendix-B
  // Note that Saltana API header content parsing is case-insensitive
  // But we use casing for clarity here, as in 'apiKey'

  // console.log({ authHeaderInRequest, cookies: req.cookies })
  if (req.cookies?.__session) {
    const token = req.cookies.__session
    headers.authorization = `SaltanaCore-V2 apiKey=${publicApiKey}, tokenType=clerk, token=${token}`
  } else if (publicApiKey) {
    headers.authorization = `Basic ${btoa(publicApiKey + ':')}`
  }

  // debugger
  const response = await fetch(`${CORE_API_URL}${path}${search}`, {
    method,
    headers: { ...headers },
  })

  return new Response(JSON.stringify(await response.json()), {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  })
}

export default middleware
