import { useMutation } from 'react-query'
import { login } from '@/client/api'
import { useForm } from 'react-hook-form'

export function useLoginForm({ callbackUrl }) {
  const login = useLogin({ callbackUrl })

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
      const loginResponse = await login.mutateAsync({ email })
      console.log('loginResponse ', { loginResponse })
    } catch (error) {
      setError(
        'email',
        { type: 'from-core', message: JSON.stringify(error) },
        { shouldFocus: true }
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

export default function useLogin({ callbackUrl = undefined }) {
  const { mutateAsync, isLoading, error, isError } = useMutation(({ email }) =>
    login(email, { callbackUrl })
  )
  return { mutateAsync, isLoading, error, isError }
}
