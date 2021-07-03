import { getSaltanaInstance, createQueryClient, setUserData } from '../client/api'
import { getSession } from 'next-auth/client'

import { dehydrate } from 'react-query/hydration'
import _ from 'lodash'
import buildLoginLink from './buildLoginLink'

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

      if (!session) {
        return {
          redirect: {
            destination: buildLoginLink(context),
            permanent: false,
          },
        }
      }

      const instance = await getSaltanaInstance(session)
      const currentUser = await instance.users.read(session.user.id)

      if (!currentUser) { // @TODO: why?
        return {
          notFound: true,
        }
      }

      const queryClient = createQueryClient(session)
      setUserData(queryClient, currentUser)

      const commonProps = {
        currentUser,
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
