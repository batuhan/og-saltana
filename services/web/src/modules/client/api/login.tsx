import { getSession, signIn, signOut, useSession } from 'next-auth/client'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { magic } from './magic'

export async function login(email, { redirect = false }) {
  const token = await magic.auth.loginWithMagicLink({
    email,
  })
  const res = await signIn('credentials', { redirect, token })

  console.log('debug response from login', res)
}
