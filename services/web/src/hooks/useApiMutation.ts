import { useMutation } from 'react-query'
import useCurrentUser from './useCurrentUser'

export default function useApiMutation(resourceType, method, opts) {
  const { instance } = useCurrentUser()
  return useMutation(async (data) => instance[resourceType][method](data), opts)
}
