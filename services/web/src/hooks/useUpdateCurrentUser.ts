import { useQueryClient, useMutation } from 'react-query'
import useCurrentUser from './useCurrentUser'

// Update current user
export default function useUpdateCurrentUser(opts = {}) {
  const { user, instance } = useCurrentUser()
  const queryClient = useQueryClient()
  const updateUserSettings = useMutation(
    async (data) => instance.users.update(user.id, data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries('users')
        if (typeof opts.onSuccess !== undefined) {
          await opts.onSuccess()
        }
      },
    },
  )

  return updateUserSettings
}
