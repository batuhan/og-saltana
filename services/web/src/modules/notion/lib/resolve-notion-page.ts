import { parsePageId } from 'notion-utils'
import { ExtendedRecordMap } from 'notion-types'

import * as types from './types'
import { getPage } from './notion'

export async function resolveNotionPage(domain: string, rawPageId?: string) {
  let site: types.Site
  let pageId: string
  let recordMap: ExtendedRecordMap

  if (rawPageId && rawPageId !== 'index') {
    pageId = parsePageId(rawPageId)

    if (!pageId) {
      throw new Error('Invalid page id =')
    }

    if (pageId) {
      recordMap = await getPage(pageId)
    }
  }

  const props = { site, recordMap, pageId }
  return { ...props }
}
