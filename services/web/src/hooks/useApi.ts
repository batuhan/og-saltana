import _ from 'lodash';
import { useQuery } from 'react-query'

export default function useApi(resourceType, method, data, opts = {}) {
  const isEnabled = typeof opts.enabled === 'undefined' || opts.enabled === true
  switch (method) {
    case 'read':
      if (typeof data !== 'string' && (!isEnabled && typeof data === undefined)) {
        throw new Error(":id must be a string")
      }

      if (resourceType === 'links' && isEnabled && (!data.startsWith('usr_') || data.endsWith(':undefined'))) {
        throw new Error(":id must not end or start with undefined and should not use username instead of user id's")
      }

      break;

    default:
      break;
  }

  return useQuery([resourceType, method, data], {
    ...opts,
  })
}
