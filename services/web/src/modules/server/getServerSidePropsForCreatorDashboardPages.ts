import { getSaltanaInstance, createQueryClient } from '../api'
import { getSession } from 'next-auth/client'

import { dehydrate } from 'react-query/hydration'
import _ from 'lodash'

const getServerSideProps =
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
        redirect: {
          destination: `/login`,
          permanent: false,
        },
      }
    }

    const instance = await getSaltanaInstance(session)

    const userData = await instance.users.read(session.user.id)

    if (!userData.roles.includes('provider')) {
      return {
        redirect: {
          destination: `/request-invite`,
          permanent: false,
        },
      }
    }

    if (
      _.get(userData.platformData, '_private.finishedOnboarding', false) !==
      true
    ) {
      return {
        redirect: {
          destination: `/welcome/creator`,
          permanent: false,
        },
      }
    }

    const queryClient = createQueryClient()
    queryClient.setQueryData(['users', 'read', userData.id], userData)
    queryClient.setQueryData(['users', 'read', userData.username], userData)

    const commonProps = {
      currentUserId: session.user.id,
      creator: { ...userData },
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

export default getServerSideProps
