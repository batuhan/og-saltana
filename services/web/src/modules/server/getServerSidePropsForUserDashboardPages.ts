import { getSaltanaInstance, createQueryClient } from '../client/api'
import { getSession } from 'next-auth/client'

import { dehydrate } from 'react-query/hydration'
import _ from 'lodash'

const getServerSidePropsForUserDashboardPages =
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
    const { params } = context
    const session = await getSession(context)
    const instance = await getSaltanaInstance(session)

    const creator = await instance.users.read(params.creator)
    if (!creator) {
      return {
        notFound: true,
      }
    }

    const queryClient = createQueryClient()
    queryClient.setQueryData(['users', 'read', creator.id], creator)
    queryClient.setQueryData(['users', 'read', creator.username], creator)

    const commonProps = {
      creator,
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

export default getServerSidePropsForUserDashboardPages
