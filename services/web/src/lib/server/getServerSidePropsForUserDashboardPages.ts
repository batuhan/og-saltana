import {
  getSaltanaInstance,
  createQueryClient,
  setUserData,
  setCreatorLinkData,
} from '@/common/api'

import { dehydrate } from 'react-query/hydration'
import _ from 'lodash'
import {
  getSaltanaInstanceFor,
  getSaltanaInstanceFromContext,
  parseTokenFromReq,
} from '@/common/api'
import COMMON_LINKS from '@/common/common-links'
import { errorMonitor } from 'events'

// Login status and token validity check is done in the middleware
const getServerSidePropsForUserDashboardPages =
  (
    extendPropsFn = ({ coreState, instance, queryClient, context }) =>
      Promise.resolve({}),
  ) =>
  async (context) => {
    const token = parseTokenFromReq(context.req)

    if (!token) {
      return {
        props: {
          ...(await extendPropsFn({
            coreState: {},
            instance: null,
            queryClient: null,
            context,
          })),
        },
      }
    }
    const instance = getSaltanaInstanceFor('clerk', token)

    try {
      const currentUser = await instance.users.read('me')

      const queryClient = createQueryClient(instance)

      setUserData(queryClient, currentUser)

      const coreState = {
        currentUserId: currentUser?.id,
        currentUser: currentUser,
        token,
        provider: 'clerk',
      }

      const props = await extendPropsFn({
        coreState,
        instance,
        queryClient,
        context,
      })

      return {
        props: {
          ...props,
          coreState,
          dehydratedState: dehydrate(queryClient),
        },
      }
    } catch (error) {
      console.log('Error when getting props for user dashboard pages', error)

      return {
        props: {
          error: typeof error === 'string' ? error : 'API_CONN_ERROR',
          coreState: {},
          dehydratedState: {},
        },
      }
    }
  }

export default getServerSidePropsForUserDashboardPages
