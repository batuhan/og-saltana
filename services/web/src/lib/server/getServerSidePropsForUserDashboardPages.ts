import { dehydrate } from 'react-query/hydration'
import _ from 'lodash'
import {
  getSaltanaInstance,
  createQueryClient,
  setUserData,
} from '../client/api'
import buildLoginLink from './buildLoginLink'
import { withSession } from '@clerk/nextjs/api'

const getServerSidePropsForUserDashboardPages =
  (
    extendPropsFn = ({
      commonProps,
      session,
      instance,
      queryClient,
      context,
    }) => Promise.resolve({}),
  ) =>
  async (context) => {
    const { params } = context
    return {
      props: {},
    }
  }

export default getServerSidePropsForUserDashboardPages
