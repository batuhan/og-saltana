import { useQueryClient, useMutation } from 'react-query'
import { getSaltanaInstance } from '@/client/api'
import useCurrentUser from './useCurrentUser'

// Update current user
export default function useUpdateCurrentUser(opts = {}) {
  const user = useCurrentUser()
  const queryClient = useQueryClient()
  const updateUserSettings = useMutation(
    async (data) =>
      (await getSaltanaInstance()).users.update(user.data.id, data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries('users')
        if (typeof opts.onSuccess !== undefined) {
          await opts.onSuccess()
        }
      },
    }
  )

  return updateUserSettings
}
