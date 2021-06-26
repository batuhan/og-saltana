import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react'
import { getSession, signIn, signOut, useSession } from 'next-auth/client'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Card } from '../../components/Card'
import { magic } from './magic'
import { useEffect } from 'react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

export async function login(email, { redirect = false }) {
  const token = await magic.auth.loginWithMagicLink({
    email,
  })
  const res = await signIn('credentials', { redirect, token })

  if (!res.ok) {
    console.error(
      `Failed to login to Saltana Core API :( [Step 1] Here's the response:`,
      res
    )
    throw new Error('Failed')
  }
}

export function useLogin({ redirect = false }) {
  const [session] = useSession()
  const loginMutation = useMutation(({ email }) => login(email, { redirect }), {
    onError: (err) => {
      //signOut()
    },
  })

  function onSubmit({ email }) {
    loginMutation.mutate({ email })
  }


  return { ...loginMutation, onSubmit, session }
}

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const router = useRouter()
  const loginMutation = useLogin({ redirect: true })

  useEffect(() => {
    if (loginMutation.session) {
      router.push('/')
    }
    return () => {}
  }, [loginMutation.session])

  return (
    <form onSubmit={handleSubmit(loginMutation.onSubmit)}>
      <Stack spacing="6">


        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            autoComplete="email"
            {...register('email', {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
            isReadOnly={loginMutation.isLoading}
          />
        </FormControl>
        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          fontSize="md"
          isLoading={loginMutation.isLoading}
        >
          Sign in
        </Button>
      </Stack>
    </form>
  )
}
