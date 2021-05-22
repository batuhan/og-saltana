import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Card } from '../components/Card'
import { magic } from '../modules/auth/magic'

async function login(email) {
  const token = await magic.auth.loginWithMagicLink({
    email,
  })
  const res = await signIn('credentials', { redirect: false, token })
  console.log(res)

  return res
}

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const loginMutation = useMutation(({ email }) => login(email))

  function onSubmit({ email }) {
    loginMutation.mutate({ email })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

const LoginPage = () => (
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

export default LoginPage
