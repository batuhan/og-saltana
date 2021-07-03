import _ from 'lodash'
import { NotionAPI } from 'notion-client'
const notion = new NotionAPI()

const getStaticPropsForNotionPoweredMarketingPages =
  (
    pageInfo,
    extendPropsFn = ({
      commonProps,
      session,
      instance,
      queryClient,
      context,
    }) => Promise.resolve({})
  ) =>
    async (context) => {
      const { type, pageId } = pageInfo
      const commonProps = { type, pageId, collection: [], contentRecordMap: [], pageTitle: 'Page Title' }
      switch (type) {
        case 'notion-collection':
          break
        case 'notion-page':
          commonProps.contentRecordMap = await notion.getPage(pageId)
          break
      }

      return {
        props: {
          pageTitle: 'Page Title',
          collection: [],
          contentRecordMap: [],
          ...commonProps,
        },
      }
    }

export default getStaticPropsForNotionPoweredMarketingPages
