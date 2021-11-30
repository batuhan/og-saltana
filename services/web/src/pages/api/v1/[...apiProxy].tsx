import { IncomingMessage } from 'http'
import _ from 'lodash'
import { NextRequest, NextResponse } from 'next/server'

const CORE_API_URL =
  process.env.SALTANA_CORE_API_BASE_INTERNAL || 'http://localhost:4100'

import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = any

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const path = req.url.replace(/^\/api\/v1/, '')
  const method = req.method || 'GET'

  const headers = {
    'Content-Type': 'application/json',
    'x-saltana-version': '2020-08-10',
  }

  const organizationId = _.get(req.headers, 'x-saltana-organization-id')

  if (organizationId) {
    headers['x-saltana-organization-id'] = organizationId
  }

  const authorization = _.get(req.headers, 'authorization')

  if (authorization) {
    headers['authorization'] = authorization
  }

  const fetchOptions: RequestInit = {
    method,
    headers: { ...headers },
  }

  if (req.body) {
    fetchOptions.body = JSON.stringify(req.body)
  }

  // debugger
  try {
    const url = `${CORE_API_URL}${path}`

    const response = await fetch(url, fetchOptions)

    // response.headers.forEach((value, key) => {
    //   res.setHeader(key, value)
    // })
    return res.status(response.status).json(await response.json())
  } catch (error) {
    return res.status(502).json({
      error: 'Bad Gateway',
    })
  }
}
