import { getSaltanaInstance, createQueryClient } from '../client/api'
import { getSession } from 'next-auth/client'

import { dehydrate } from 'react-query/hydration'
import _ from 'lodash'

const getServerSidePropsForNotionPoweredMarketingPages =
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
    const commonProps = { type, pageId }
    switch (type) {
      case 'notion-collection':
        break
      case 'notion-page':
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

export default getServerSidePropsForNotionPoweredMarketingPages
