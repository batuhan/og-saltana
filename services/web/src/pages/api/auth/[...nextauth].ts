import sortBy from 'lodash.sortby'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { createInstance } from '@saltana/sdk'

const api = () => createInstance({
  apiKey: process.env.NEXT_PUBLIC_SALTANA_CORE_PUBLISHABLE_KEY,
})

/*
async function getUserById(userId) {
  const naturalUser = await api.users.read(userId, {
    stelaceOrganizationId: null,
  })

  const organizationsIds = Object.keys(naturalUser.organizations)

  const promises = organizationsIds.map((organizationId) => {
    return api.users.read(organizationId, {
      stelaceOrganizationId: organizationId,
    })
  })

  const organizations = await Promise.all(promises)

  const userData = {
    ...naturalUser,
    organizations: sortBy(organizations, (org) => org.createdDate),
  }

  return userData
}
*/

export default NextAuth({
  callbacks: {
    async signIn() {
      return true
    },
    async session(session, token) {
      const newSession = { ...session }

      newSession.accessToken = token.accessToken
      newSession.refreshToken = token.refreshToken
      newSession.user.id = token.sub

      return newSession
    },
    async jwt(token, user, account, profile) {
      token.accessToken = token.accessToken || profile.accessToken
      token.refreshToken = token.refreshToken || profile.refreshToken
      token.sub = token.sub || profile.userId
      return token
    },
  },
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        token: { label: 'token', type: 'text' },
      },
      async authorize({ token }) {
        try {
          return await api().auth.loginMagic({
            token,
          })
        } catch (err) {
          console.warn('Unable to get or create user via Magic.link', err)
          throw Error('Unknown failure')
        }
      },
    }),
  ],
})
