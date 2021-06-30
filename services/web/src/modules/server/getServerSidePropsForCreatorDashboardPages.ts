import { getSaltanaInstance, createQueryClient } from '../api'
import { getSession } from 'next-auth/client'

import { dehydrate } from 'react-query/hydration'
import _ from 'lodash'

const getServerSideProps =
  (extendPropsFn = ({ session, instance }) => Promise.resolve({})) =>
  async ({ req, res }) => {
    const session = await getSession({ req })
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
    queryClient.setQueryData(['users', 'read', session.user.id], userData)

    const props = await extendPropsFn({ session, instance, queryClient })

    return {
      props: {
        ...props,
        currentUserId: session.user.id,
        dehydratedState: dehydrate(queryClient),
      },
    }
  }

export default getServerSideProps
