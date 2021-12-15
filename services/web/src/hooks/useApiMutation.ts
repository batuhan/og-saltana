import { SaltanaCoreContext } from '@/client/SaltanaCoreProvider'
import { useContext } from 'react'
import { useMutation } from 'react-query'
import useCurrentUser from './useCurrentUser'

export default function useApiMutation(resourceType, method, opts) {
  const { instance } = useContext(SaltanaCoreContext)
  return useMutation(async (data) => instance[resourceType][method](data), opts)
}
