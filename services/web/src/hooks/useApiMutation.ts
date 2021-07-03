import { useMutation } from 'react-query'
import { getSaltanaInstance } from '@/client/api'

export default function useApiMutation(resourceType, method, opts) {
  return useMutation(async (data) => {
    const saltanaInstance = await getSaltanaInstance()
    return saltanaInstance[resourceType][method](data)
  }, opts)
}
