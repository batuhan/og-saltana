import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react'
import { getSession, signIn, signOut } from 'next-auth/client'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Card } from '../../components/Card'
import { magic } from './magic'
import api from '../api/instance'

export async function login(email) {
  const token = await magic.auth.loginWithMagicLink({
    email,
  })
  const res = await signIn('credentials', { redirect: false, token })

  if (!res.ok) {
    console.error(
      `Failed to login to Saltana Core API :( [Step 1] Here's the response:`,
      res
    )
    throw new Error('Failed')
  }

  const {
    accessToken,
    refreshToken,
    user: { id },
  } = await getSession()

  const coreSession = api.auth.setTokens({
    accessToken,
    refreshToken,
    tokenType: 'Bearer',
    userId: id,
  })

  if (!coreSession.isAuthenticated) {
    console.error(
      `Failed to login to Saltana Core API :( Here's the info response:`,
      coreSession
    )
    throw new Error('Failed')
  }

  return true
}

function useLogin() {
  const loginMutation = useMutation(({ email }) => login(email), {
    onError: () => signOut(),
  })

  function onSubmit({ email }) {
    loginMutation.mutate({ email })
  }

  return { ...loginMutation, onSubmit }
}
export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const loginMutation = useLogin()
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
)
