import { useSession } from "@clerk/nextjs";

import React, {
  useMemo,
  createContext,
  useRef,
  useEffect,
  useState,
} from 'react'
import { useCallback } from 'react'
import { QueryClientProvider, useQuery } from 'react-query'
import {
  createQueryClient,
  getSaltanaInstance,
  getSaltanaInstanceSync,
  setUserData,
  sharedQueryClient,
  sharedSaltanaInstance,
} from './api'
export const CurrentUserContext = createContext({})

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
  const [currentUser, setCurrentUser] = useState({ ...EMPTY_USER_OBJECT })
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    setIsLoading(true)

    console.log('new session', session)
    if (!session?.user) {

      setQueryClient(sharedQueryClient)
      setCurrentUser({ ...EMPTY_USER_OBJECT })
      setIsLoading(false)

      return
    }

    const { user } = session
    async function loadUser() {
      const saltanaInstance = await getSaltanaInstance(session)
      const queryClient = createQueryClient(saltanaInstance)
      const saltanaUser = await saltanaInstance.users.read('me')
      const isCreator = saltanaUser.roles.includes('creator')
      const isAdmin = saltanaUser.roles.includes('admin')

      const userData = {
        id: user.id,
        primaryEmailAddress: user.primaryEmailAddress,
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

        isCreator: saltanaUser.roles.includes('creator'),
        isAdmin: saltanaUser.roles.includes('admin'),
      }

      setCurrentUser(userData)
      setUserData(queryClient, userData)
      setQueryClient(queryClient)
      setIsLoading(false)
    }

    loadUser()

  }, [session])

  return (
    <CurrentUserContext.Provider value={{ ...currentUser, isLoading }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </CurrentUserContext.Provider>
  )
}

export { SaltanaCoreProvider }
