import {
  getSaltanaInstance,
  createQueryClient,
  setUserData,
  setCreatorLinkData,
} from '@/client/api'

import { dehydrate } from 'react-query/hydration'
import _ from 'lodash'
import {
  getSaltanaInstanceFor,
  getSaltanaInstanceFromContext,
  parseTokenFromReq,
} from '@/common/api'
import COMMON_LINKS from '@/common/common-links'

// Login status and token validity check is done in the middleware
const getServerSidePropsForUserDashboardPages =
  (
    extendPropsFn = ({ coreState, instance, queryClient, context }) =>
      Promise.resolve({}),
  ) =>
  async (context) => {
    const token = parseTokenFromReq(context.req)
    const instance = getSaltanaInstanceFor('clerk', token)

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
  }

export default getServerSidePropsForUserDashboardPages
