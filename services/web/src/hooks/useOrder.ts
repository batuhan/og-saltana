import _ from 'lodash'
import useApi from './useApi'

// Order
export default function useOrder(orderId: string) {
  return useApi('orders', 'read', orderId, {
    enabled: _.isEmpty(orderId) === false,
  })
}
