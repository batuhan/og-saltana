import { getSaltanaInstanceFor } from "@/common/api";
import { useSession } from "@clerk/nextjs";
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
} from './api'
export const CurrentUserContext = createContext({ user: null, isLoading: true })

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

const EMPTY_USER_OBJECT = {
  id: null,
  primaryEmailAddress: null,
  primaryPhoneNumber: null,
  username: null,
  fullName: null,
  firstName: null,
  lastName: null,
  profileImageUrl: null,

  displayName: null,
  description: null,

  passwordEnabled: false,
  clerkMetadata: {},

  platformData: {},
  roles: [],
  metadata: {},

  createdAt: null,

  isCreator: false,
  isAdmin: false,
}

function SaltanaCoreProvider(props) {

  console.log('core provider', props)
  const { children, state } = props
  const { session } = useSession({ withAssertions: true })

  const hasUserAndToken = session && state && _.isEmpty(state.token) === false
  const defaultQueryClient = hasUserAndToken ? createQueryClient(getSaltanaInstanceFor('clerk', state.token)) : sharedQueryClient

  const queryClient = useRef(defaultQueryClient)
  const [currentUser, setCurrentUser] = useState(state.currentUser || null)
  const [isLoading, setIsLoading] = useState(state.currentUser === null)

  useEffect(() => {
    setIsLoading(true)

    if (!session?.user) {
      queryClient.current = sharedQueryClient
      setCurrentUser(null)
      setIsLoading(false)
      return
    }

    async function loadUser() {
      const saltanaInstance = await getSaltanaInstance(session)
      const queryClientForInstance = createQueryClient(saltanaInstance)

      const saltanaUser = await saltanaInstance.users.read('me')

      const isCreator = saltanaUser.roles.includes('provider')
      const isAdmin = saltanaUser.roles.includes('admin')

      const { user } = session
      const userData = {
        id: saltanaUser.id,
        clerkId: user.id,
        email: user.primaryEmailAddress.emailAddress,
        primaryPhoneNumber: user.primaryPhoneNumber,
        username: user.username,
        fullName: user.fullName,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImageUrl: saltanaUser.profileImageUrl,

        displayName: saltanaUser.displayName,
        description: saltanaUser.description,

        passwordEnabled: user.passwordEnabled,
        clerkMetadata: user.publicMetadata,

        platformData: saltanaUser.platformData,
        roles: saltanaUser.roles,
        metadata: saltanaUser.metadata,

        createdAt: saltanaUser.createdAt,

        isCreator,
        isAdmin,
      }
      setUserData(queryClientForInstance, userData)

      return { userData, queryClientForInstance }
    }

    loadUser().then(({ userData, queryClientForInstance }) => {
      queryClient.current = queryClientForInstance
      setCurrentUser({ ...userData })
      setIsLoading(false)
    })

  }, [session])

  return (
    <CurrentUserContext.Provider value={{ user: currentUser, isLoading }}>
      <QueryClientProvider client={queryClient.current}>{children}</QueryClientProvider>
    </CurrentUserContext.Provider>
  )
}

export { SaltanaCoreProvider }
