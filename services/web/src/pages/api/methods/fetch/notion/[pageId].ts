import fetchNotionPage from '@/server/fetchNotionPage'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const recordMap = await fetchNotionPage(req.query.pageId)

  return res.status(200).json({ recordMap })
}
