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

function useLogin({ redirect = false }) {
  const [session] = useSession()
  const loginMutation = useMutation(({ email }) => login(email, { redirect }), {
    onError: (err) => {
      //signOut()
    },
  })
  const router = useRouter()

  function onSubmit({ email }) {
    loginMutation.mutate({ email })
  }

  useEffect(() => {
    if (session) {
      router.push('/')
    }
    return () => {}
  }, [session])

  return { ...loginMutation, onSubmit }
}

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const loginMutation = useLogin({ redirect: true })
  return (
    <form onSubmit={handleSubmit(loginMutation.onSubmit)}>
      <Stack spacing="6">
        {loginMutation.isError ? (
          <div>An error occurred: {loginMutation.error.message}</div>
        ) : null}

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

export const LoginPage = () => (
  <>
    <NextSeo title="Login" />
    <Box minH="100vh" py="12" px={{ base: '4', lg: '8' }}>
      <Box maxW="md" mx="auto">
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Sign in to your account
        </Heading>
        <Card>
          <LoginForm />
        </Card>
      </Box>
    </Box>
  </>
)
