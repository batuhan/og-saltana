import { useMutation } from 'react-query'
import { login } from '@/client/api'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function useLogin() {
  const { mutateAsync, mutate, isLoading, error, isError } = useMutation(
    ({
      email,
      redirectTo,
      redirect,
    }: {
      email: string
      redirectTo?: string | undefined
      redirect?: boolean
    }) => login(email, { callbackUrl: redirectTo, redirect }),
  )
  return { mutateAsync, mutate, isLoading, error, isError }
}

export function useLoginForm() {
  const loginMutation = useLogin()

  const router = useRouter()

  const { redirectTo = '/dashboard' } = router.query
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    defaultValues: {
      email: router.query.email || '',
    },
  })

  const registerEmail = register('email', {
    required: true,
    pattern: /^\S+@\S+$/i,
  })

  async function onSubmit({ email }) {
    //debugger
    try {
      const loginResponse = await loginMutation.mutateAsync({
        email,
        redirect: true,
        redirectTo,
      })
      console.log('loginResponse ', { loginResponse })
    } catch (error) {
      setError(
        'email',
        { type: 'from-core', message: JSON.stringify(error) },
        { shouldFocus: true },
      )
    }
  }

  useEffect(() => {
    if (router.query.email) {
      console.log('router.query.email ', { query: router.query })
      handleSubmit(onSubmit)()
    }
  }, [router.query.email])

  return {
    registerEmail,
    onSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  }
}
