import {
  getSaltanaInstance,
  createQueryClient,
  setUserData,
} from '@/client/api'

import { dehydrate } from 'react-query/hydration'
import _ from 'lodash'

const getServerSidePropsForAdminDashboardPages =
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
    const session = await getSession(context)
    if (!session) {
      return {
        notFound: true,
      }
    }

    const instance = await getSaltanaInstance(session)
    const user = await instance.users.read(session.user.id)

    if (!user.roles.includes('admin')) {
      return {
        notFound: true,
      }
    }

    const queryClient = createQueryClient(session)
    setUserData(queryClient, user)

    const commonProps = {
      currentUserId: session.user.id,
      session,
    }

    const props = await extendPropsFn({
      commonProps,
      session,
      instance,
      queryClient,
      context,
    })

    return {
      props: {
        ...commonProps,
        ...props,
        dehydratedState: dehydrate(queryClient),
      },
    }
  }

export default getServerSidePropsForAdminDashboardPages
