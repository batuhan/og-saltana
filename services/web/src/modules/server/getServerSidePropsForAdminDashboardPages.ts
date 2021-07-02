import { getSaltanaInstance, createQueryClient } from '../client/api'
import { getSession } from 'next-auth/client'

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
    }) => Promise.resolve({})
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

    const queryClient = createQueryClient()
    queryClient.setQueryData(['users', 'read', user.id], user)
    queryClient.setQueryData(['users', 'read', user.username], user)

    const commonProps = {
      currentUserId: session.user.id,
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
