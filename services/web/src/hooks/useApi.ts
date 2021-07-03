import { useQuery } from 'react-query'

export default function useApi(resourceType, method, data, opts = {}) {
  return useQuery([resourceType, method, data], {
    ...opts,
  })
}
