import {
  getSaltanaInstance,
  createQueryClient,
  setUserData,
  setCreatorLinkData,
} from '@/common/api'

import { dehydrate } from 'react-query/hydration'
import _ from 'lodash'
import { getSaltanaInstanceFor, parseTokenFromReq } from '@/common/api'
import COMMON_LINKS from '@/common/common-links'
import CreatorDashboardAssetScreen from 'components/Dashboard/Creator/Assets/AssetScreen'

// Login status and token validity check is done in the middleware
const getServerSidePropsForCreatorDashboardPages =
  (extendPropsFn = undefined) =>
  async (context) => {
    const token = parseTokenFromReq(context.req)
    const instance = getSaltanaInstanceFor('clerk', token)

    try {
      const currentUser = await instance.users.read('me')

      // @TODO: we should check if the user is in organization but we don't currently expose the organization logic to the web app
      if (!currentUser.roles.includes('provider')) {
        return {
          redirect: {
            destination: `/request-invite`,
            permanent: false,
          },
        }
      }

      const queryClient = createQueryClient(instance)

      setUserData(queryClient, currentUser)

      if (context?.params?.link) {
        const link = await instance.links.read(context.params.link) // in the dashboard, the link param is always an id
        // @TODO: if no valid item is found, we should show 404
        setCreatorLinkData(queryClient, link)
      }

      if (context?.params?.asset) {
        const asset = await instance.assets.read(context.params.asset) // in the dashboard, the asset param is always an id
        // @TODO: if no valid item is found, we should show 404
        if (asset.id) {
          queryClient.setQueryData(['assets', 'read', asset.id], asset)
        }
      }

      if (context?.params?.order) {
        const order = await instance.orders.read(context.params.order) // in the dashboard, the order param is always an id
        // @TODO: if no valid item is found, we should show 404
        queryClient.setQueryData(['orders', 'read', order.id], order)
      }

      const coreState = {
        currentUserId: currentUser?.id,
        currentUser: currentUser,
        token,
        provider: 'clerk',
      }

      const currentUrl = context.resolvedUrl

      const finishedOnboarding = _.get(
        currentUser,
        'metadata._private.finishedOnboarding',
        false,
      )
      const isOnboardingPage = currentUrl.startsWith('/dashboard/welcome')

      if (finishedOnboarding === false && isOnboardingPage === false) {
        return {
          redirect: {
            destination: `/dashboard/welcome`,
            permanent: false,
          },
        }
      }

      if (currentUrl === '/dashboard') {
        return {
          redirect: {
            destination: `/dashboard/${currentUser.username}/`,
            permanent: false,
          },
        }
      }
      // Does break support for multiple organizations
      // Also handles "/dashboard/_/" links for the help pages
      if (
        isOnboardingPage === false &&
        context?.params?.creator !== currentUser.username
      ) {
        return {
          redirect: {
            destination: currentUrl.replace(
              context?.params?.creator,
              currentUser.username,
            ),
            permanent: false,
          },
        }
      }

      const props = {
        coreState,
        queryClient,
      }

      if (extendPropsFn && typeof extendPropsFn === 'function') {
        const extended = await extendPropsFn({
          coreState,
          currentUser,
          instance,
          queryClient,
          context,
        })

        if (extended.coreState) {
          props.coreState = {
            ...coreState,
            ...(extended.coreState || {}),
          }
        }

        if (extended.queryClient) {
          props.queryClient = extended.queryClient
        }
      }

      return {
        props: {
          coreState: props.coreState,
          dehydratedState: dehydrate(props.queryClient),
        },
      }
    } catch (error) {
      console.log('Error when getting props for creator dashboard pages', error)

      return {
        props: {
          coreState: {},
          dehydratedState: {},
        },
      }
    }
  }

export default getServerSidePropsForCreatorDashboardPages
