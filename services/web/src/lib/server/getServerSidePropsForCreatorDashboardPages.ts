import {
  getSaltanaInstance,
  createQueryClient,
  setUserData,
  setCreatorLinkData,
} from '@/client/api'
import { getSession } from 'next-auth/client'

import { dehydrate } from 'react-query/hydration'
import _ from 'lodash'
import buildLoginLink from './buildLoginLink'

const getServerSidePropsForCreatorDashboardPages =
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
          destination: buildLoginLink(context),
          permanent: false,
        },
      }
    }

    const instance = await getSaltanaInstance(session)
    const currentUser = await instance.users.read(session.user.id)

    // @TODO: we should check if the user is in organization but we don't currently expose the organization logic to the web app
    if (!currentUser.roles.includes('provider')) {
      return {
        redirect: {
          destination: `/request-invite`,
          permanent: false,
        },
      }
    }

    if (context.params.creator !== currentUser.username) {
      return {
        redirect: {
          destination: `/dashboard/${currentUser.username}`,
          permanent: false,
        },
      }
    }

    if (
      _.get(currentUser.platformData, '_private.finishedOnboarding', false) !==
      true
    ) {
      return {
        redirect: {
          destination: `/dashboard/welcome/creator`,
          permanent: false,
        },
      }
    }

    const queryClient = createQueryClient(session)
    setUserData(queryClient, currentUser)

    if (context.params.link) {
      const link = await instance.links.read(context.params.link) // in the dashboard, the link param is always an id
      // @TODO: if no valid item is found, we should show 404
      setCreatorLinkData(queryClient, link)
    }

    if (context.params.asset) {
      const asset = await instance.assets.read(context.params.asset) // in the dashboard, the asset param is always an id
      // @TODO: if no valid item is found, we should show 404
      queryClient.setQueryData(['assets', 'read', asset.id], asset)
    }

    if (context.params.order) {
      const order = await instance.orders.read(context.params.order) // in the dashboard, the order param is always an id
      // @TODO: if no valid item is found, we should show 404
      queryClient.setQueryData(['orders', 'read', order.id], order)
    }

    const commonProps = {
      currentUserId: currentUser.id,
      creator: { ...currentUser },
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

export default getServerSidePropsForCreatorDashboardPages
