import {Box, Button, chakra, FormControl, FormLabel, Heading, Input, Stack, useColorModeValue,} from '@chakra-ui/react'
import {Card} from '../components/Card'

import {useForm} from 'react-hook-form';
import Router from 'next/router'
import {useUser} from '../modules/auth/hooks'
import {Magic} from 'magic-sdk'


function LoginForm() {
    const {register, handleSubmit, formState: {errors}} = useForm();

    useUser({redirectTo: '/', redirectIfFound: true})

    async function onSubmit({email}) {
        console.log(email)
        try {
            const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY)
            const didToken = await magic.auth.loginWithMagicLink({
                email,
            })
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + didToken,
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

    console.log(errors);

    return (
        <chakra.form
            onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="6">
                <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" autoComplete="email"  {...register("email", {
                        required: true,
                        pattern: /^\S+@\S+$/i
                    })}  />
                </FormControl>
                <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
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
