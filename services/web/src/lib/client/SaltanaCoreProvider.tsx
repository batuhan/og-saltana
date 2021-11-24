import { useSession } from "@clerk/nextjs";

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

function SaltanaCoreProvider({ children }) {
  const { session } = useSession({ withAssertions: true })

  const [queryClient, setQueryClient] = useState(sharedQueryClient)
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    setIsLoading(true)

    if (!session?.user) {

      setQueryClient(sharedQueryClient)
      setCurrentUser(null)
      setIsLoading(false)

      return
    }

    async function loadUser() {
      const saltanaInstance = await getSaltanaInstance(session)
      const queryClient = createQueryClient(saltanaInstance)

      const response = await saltanaInstance.auth.loginWithClerk()
      if (response.success !== true) {
        throw new Error('failed to login with clerkr')
      }
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

      return { userData, queryClient }

    }

    loadUser().then(({ userData, queryClient }) => {
      setCurrentUser({ ...userData })
      setUserData(queryClient, userData)
      setQueryClient(queryClient)
      setIsLoading(false)
    })

  }, [session])

  return (
    <CurrentUserContext.Provider value={{ user: currentUser, isLoading }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </CurrentUserContext.Provider>
  )
}

export { SaltanaCoreProvider }
