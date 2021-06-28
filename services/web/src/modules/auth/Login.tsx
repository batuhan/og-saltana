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
