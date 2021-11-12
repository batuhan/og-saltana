import * as React from 'react'
import CreatorSpaceShell from 'components/CreatorSpace/Shell'
import getStaticPropsForCreatorSpacePages from '@/server/getStaticPropsForCreatorSpacePages'
import { useRouter } from 'next/router'
import useCurrentUser from 'hooks/useCurrentUser'
import { useEffect } from 'react'
import { SignedIn, useSession } from "@clerk/clerk-react";

import { generateOrderLink } from '@/common/utils'

const AuthRequiredShell = ({ children }) => {
  const session = useSession()
  const { isLoading } = session

  const {
    query: { email, orderId },
    push,
  } = useRouter()

  useEffect(() => {
    if (orderId && !session && !loading) {
      push(
        //{ email, orderId },
        `/login?redirectTo=${generateOrderLink({ orderId, email })}`,
      )
    }
  }, [session, loading, push, email, orderId])

  return <div>{children}</div>
}

export default AuthRequiredShell
