import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import axios from "axios"

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.Credentials({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'magic',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                token: { label: "token", type: "text" },
            },
            async authorize(credentials, req) {
                const user = (credentials, req) => {

                    axios.post(`${process.env.SALTANA_CORE_API_BASE}`)
                    // You need to provide your own logic here that takes the credentials
                    // submitted and returns either a object representing a user or value
                    // that is false/null if the credentials are invalid.
                    // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                    // You can also use the request object to obtain additional parameters
                    // (i.e., the request IP address)
                    return null
                }
                if (user) {
                    // Any user object returned here will be saved in the JSON Web Token
                    return user
                } else {
                    return null
                }
            }
        })
    ],

})
