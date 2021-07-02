export function useLogin({ redirect = false }) {
  const [session] = useSession()
  const loginMutation = useMutation(({ email }) => login(email, { redirect }), {
    onError: (err) => {
      //signOut()
    },
  })

  async function onSubmit({ email }) {
    await loginMutation.mutate({ email })
  }

  return { ...loginMutation, onSubmit, session }
}
