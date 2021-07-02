import { useMutation, useQuery } from 'react-query'
import { getSaltanaInstance } from '../modules/client/api'

export function useApi(resourceType, method, data, opts = {}) {
  return useQuery([resourceType, method, data], {
    ...opts,
  })
}

export function useApiMutation(resourceType, method, opts) {
  return useMutation(async (data) => {
    const saltanaInstance = await getSaltanaInstance()
    return saltanaInstance[resourceType][method](data)
  }, opts)
}
