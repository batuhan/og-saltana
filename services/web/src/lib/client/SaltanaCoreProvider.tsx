import { getSaltanaInstanceFor, sharedSaltanaInstance } from "@/common/api";
import { useSession } from "@clerk/nextjs";
import ErrorPage from "components/ErrorPage";
import _ from "lodash";

import React, {
  useMemo,
  createContext,
  useRef,
  useEffect,
  useState,
} from 'react'
import { QueryClientProvider, useQuery } from 'react-query'
import {
  createQueryClient,
  getSaltanaInstance,
  setUserData,
  sharedQueryClient,
} from '@/common/api'
import { useInterval, useTimeoutFn } from "react-use";
export const SaltanaCoreContext = createContext({ instance: sharedSaltanaInstance, })

const is =
  ({ userId, username }) =>
    (usernameOrUserId) => {
      if (!userId) {
        return false
      }

      if (usernameOrUserId === userId) {
        return true
      }

      if (usernameOrUserId === username) {
        return true
      }

      return false
    }

function _hasUserAndToken(coreState, session): boolean {
  const checks = [
    _.get(session, 'user.id', null),
    _.get(coreState, 'token', null),
  ]

  return checks.every(check => _.isEmpty(check) === false)
}

function SaltanaCoreProvider(props) {
  const { children, state = {} } = props
  const { session } = useSession({ withAssertions: true })
  const [token, setToken] = useState(session?.lastActiveToken?.getRawString())
  // const saltanaInstance = useRef(initialInstance)

  // session.expireAt
  const getToken = React.useCallback(async () => {
    try {
      if (!session) {
        return null
      }
      const newToken = await session.getToken();
      setToken(newToken)
      return newToken
    } catch (e) {
      console.log('SaltanaCoreProvider::getToken error', e);
    }
  }, [session]);

  React.useEffect(() => {
    getToken()
  }, [getToken]);

  const getInstances = React.useCallback(() => {
    const _instance = getSaltanaInstanceFor('clerk', token)
    const _queryClient = createQueryClient(_instance)

    return { instance: _instance, queryClient: _queryClient }
  }, [token]);


  const { instance, queryClient } = getInstances()
  return (
    <SaltanaCoreContext.Provider value={{ instance }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SaltanaCoreContext.Provider>
  )
  // React.useEffect(() => {
  //   getInstances()
  // }, [getInstances]);

  // useEffect(() => {
  //   instance.current = getSaltanaInstanceFor('clerk', token)
  //   queryClient.current = createQueryClient(instance.current)
  // }, [token])


  // useInterval(
  //   () => {
  //     getToken()
  //   },
  //   token ? 30 * 1000 : null,
  // );

  // const hasUserAndToken = _hasUserAndToken(state, session)
  // const initialInstance = hasUserAndToken ? getSaltanaInstanceFor('clerk', state.token) : sharedSaltanaInstance
  // const initialQueryClient = hasUserAndToken ? createQueryClient(initialInstance) : sharedQueryClient

  // const saltanaInstance = useRef(initialInstance)
  // const currentUser = useRef(state.currentUser || null)

  // console.log('SaltanaCoreProvider', typeof state?.currentUser, state.currentUser)
  // const [isLoading, setIsLoading] = useState(typeof state?.currentUser !== 'object')
  // const [errorWhenLoadingUser, setErrorWhenLoadingUser] = useState(null)

  // useEffect(() => {
  //   setIsLoading(true)
  //   const hasUser = _.get(session, 'user.id', null)

  //   if (hasUser === false) {
  //     queryClient.current = sharedQueryClient
  //     saltanaInstance.current = sharedSaltanaInstance
  //     currentUser.current = null
  //     setIsLoading(false)
  //     return
  //   }

  //   async function loadUser() {
  //     const instance = await getSaltanaInstance(session)
  //     const queryClientForInstance = createQueryClient(instance)

  //     try {
  //       const saltanaUser = await instance.users.read('me')
  //       const isCreator = saltanaUser.roles.includes('provider')
  //       const isAdmin = saltanaUser.roles.includes('admin')

  //       const { user } = session
  //       const userData = {
  //         id: saltanaUser.id,
  //         clerkId: user.id,
  //         email: user.primaryEmailAddress.emailAddress,
  //         primaryPhoneNumber: user.primaryPhoneNumber,
  //         username: user.username,
  //         fullName: user.fullName,
  //         firstName: user.firstName,
  //         lastName: user.lastName,
  //         profileImageUrl: saltanaUser.profileImageUrl,

  //         displayName: saltanaUser.displayName,
  //         description: saltanaUser.description,

  //         passwordEnabled: user.passwordEnabled,
  //         clerkMetadata: user.publicMetadata,

  //         platformData: saltanaUser.platformData,
  //         roles: saltanaUser.roles,
  //         metadata: saltanaUser.metadata,

  //         createdAt: saltanaUser.createdAt,

  //         isCreator,
  //         isAdmin,
  //       }

  //       setUserData(queryClientForInstance, userData)

  //       return { userData, queryClientForInstance, instance }
  //     } catch (error) {
  //       queryClient.current = sharedQueryClient
  //       saltanaInstance.current = sharedSaltanaInstance
  //       currentUser.current = null
  //       setIsLoading(false)
  //       setErrorWhenLoadingUser(error)
  //       return {}
  //     }

  //   }

  //   loadUser().then(({ userData, queryClientForInstance, instance }) => {
  //     queryClient.current = queryClientForInstance
  //     saltanaInstance.current = instance
  //     currentUser.current = userData

  //     setIsLoading(false)
  //   })

  // }, [session, isLoading])


  // if (errorWhenLoadingUser !== null) {
  //   console.error(errorWhenLoadingUser)
  //   return <ErrorPage statusCode={500} />
  // }

}

export { SaltanaCoreProvider }
