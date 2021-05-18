import React from 'react'
import {
  Box,
  Button,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  TagCloseButton,
  useColorModeValue,
} from '@chakra-ui/react'

import { signIn, useSession } from 'next-auth/client'

import { useMutation } from 'react-query'
import { magic } from '../modules/auth/magic'

import { Card } from '../components/Card'

function LoginForm() {
  return (
    <chakra.form>
      <Stack spacing="6">
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
        </FormControl>
        <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
          Sign in
        </Button>
      </Stack>
    </chakra.form>
  )
}

const LoginPage = () => (
  <Box
    bg={useColorModeValue('gray.50', 'inherit')}
    minH="100vh"
    py="12"
    px={{ base: '4', lg: '8' }}
  >
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
