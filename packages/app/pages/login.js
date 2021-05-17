import {Box, Button, chakra, FormControl, FormLabel, Heading, Input, Stack, useColorModeValue,} from '@chakra-ui/react'

import {useForm} from 'react-hook-form';
import Router from 'next/router'

import {signIn, useSession} from 'next-auth/client'
import {useMutation} from "react-query";
import axios from "axios";
import {magic} from "../modules/auth/magic";
import {Card} from '../components/Card'

async function login(email) {
    try {
        const magicToken = await magic.auth.loginWithMagicLink({
            email,
        })
        const res = await signIn('magic', { redirect: false, magicToken })
    } catch (error) {
        console.error('An unexpected error happened occurred:', error)
    }
}

function useLogin() {
    const mutation = useMutation(newTodo => axios.post('/todos', newTodo))
}

function LoginForm() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [session, loading] = useSession()

    useUser({redirectTo: '/', redirectIfFound: true})

    async function onSubmit({email}) {
        try {
            const didToken = await magic.auth.loginWithMagicLink({
                email,
            })
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${  didToken}`,
                },
                body: JSON.stringify({email}),
            })
            if (res.status === 200) {
                Router.push('/')
            } else {
                throw new Error(await res.text())
            }
        } catch (error) {
            console.error('An unexpected error happened occurred:', error)
        }
    }


    return (
        <chakra.form
            onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="6">
                <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" autoComplete="email"  {...register("email", {
                        required: true,
                        pattern: /^\S+@\S+$/i
                    })} isReadOnly={loading}/>
                </FormControl>
                <Button type="submit" colorScheme="blue" size="lg" fontSize="md" isLoading={loading}>
                    Sign in
                </Button>
            </Stack>
        </chakra.form>
    );
}

const LoginPage = () => (
    <Box
        bg={useColorModeValue('gray.50', 'inherit')}
        minH="100vh"
        py="12"
        px={{base: '4', lg: '8'}}
    >
        <Box maxW="md" mx="auto">
            <Heading textAlign="center" size="xl" fontWeight="extrabold">
                Sign in to your account
            </Heading>
            <Card>
                <LoginForm/>
            </Card>
        </Box>
    </Box>
)

export default LoginPage
