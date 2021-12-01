import { useSession } from '@clerk/nextjs'

import { createContext, useEffect } from 'react'
import useApi from './useApi'

const SignalContext = createContext(null)

export default function useSignal() {
  const [session] = useSession()

  useEffect(() => {}, [session])
}
