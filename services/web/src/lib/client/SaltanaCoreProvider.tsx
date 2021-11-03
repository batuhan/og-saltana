import { useSession } from 'next-auth/client'
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
  username: null,
  roles: [],
  email: null,
  isLoaded: false,
  isLoading: false,
}

function SaltanaCoreProvider({ children }) {
  const [session, loading] = useSession()
  const userId = session ? session.user.id : null

  const gotSession = loading === false && userId !== null

  const apiInstance = useCallback(() => {}, [])
  //  const apiInstance = useRef(sharedSaltanaInstance)

  const [currentUser, setCurrentUser] = useState({
    ...EMPTY_USER_OBJECT,
    id: userId,
    isLoading: gotSession,
  })

  const [queryClient, setQueryClient] = useState(sharedQueryClient)

  // when session changes, update the api instance & query client
  useEffect(() => {
    if (session) {
      const _apiInstance = getSaltanaInstanceSync(session)
      const _queryClient = createQueryClient({
        saltanaInstance: apiInstance.current,
      })

      _apiInstance.users.read(userId).then((user) => {
        setUserData(_queryClient, user)
        setCurrentUser({
          ...EMPTY_USER_OBJECT,
          ...user,
          isLoading: false,
          isLoaded: true,
        })
      })

      setQueryClient(_queryClient)
      apiInstance.current = _apiInstance
      queryClient.current = _queryClient
    } else {
      apiInstance.current = sharedSaltanaInstance
      queryClient.current = sharedQueryClient
    }

    return () => {
      // jjs
    }
  }, [session])

  const _is = useMemo(
    () =>
      is({
        userId,
        username: currentUser.username,
        //email: currentUser.email,
      }),
    [userId, currentUser],
  )

  const context = {
    isLoading: currentUser.isLoading,
    is: _is,
    isLoggedIn: !!(!currentUser.isLoading && currentUser.id),
    data: currentUser,
    session,
    //queryClient: queryClient.current,
    //apiInstance: apiInstance.current,
  }

  return (
    <CurrentUserContext.Provider value={context}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </CurrentUserContext.Provider>
  )
}

export { SaltanaCoreProvider }
