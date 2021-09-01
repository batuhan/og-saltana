import { useMutation } from 'react-query'
import { login } from '@/client/api'
import { useForm } from 'react-hook-form'

export default function useLogin() {
  const { mutateAsync, mutate, isLoading, error, isError } = useMutation(
    ({
      email,
      callbackUrl,
      redirect,
    }: {
      email: string
      callbackUrl?: string | undefined
      redirect?: boolean
    }) => login(email, { callbackUrl, redirect }),
  )
  return { mutateAsync, mutate, isLoading, error, isError }
}

export function useLoginForm({ callbackUrl }) {
  const loginMutation = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm()

  const registerEmail = register('email', {
    required: true,
    pattern: /^\S+@\S+$/i,
  })

  async function onSubmit({ email }) {
    try {
      const loginResponse = await loginMutation.mutateAsync({ email })
      console.log('loginResponse ', { loginResponse })
    } catch (error) {
      setError(
        'email',
        { type: 'from-core', message: JSON.stringify(error) },
        { shouldFocus: true },
      )
    }
  }

  return {
    registerEmail,
    onSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  }
}
