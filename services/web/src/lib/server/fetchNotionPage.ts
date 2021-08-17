import { NextApiRequest, NextApiResponse } from 'next'
import { NotionAPI } from 'notion-client'
import { ExtendedRecordMap } from 'notion-types'

const notion = new NotionAPI()
// @todo: cache required

export default async (pageId): Promise<ExtendedRecordMap> => {
  const recordMap = await notion.getPage(pageId)

  return recordMap
}
