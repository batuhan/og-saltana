import sortBy from 'lodash.sortby'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { createInstance } from '@saltana/sdk'

const api = () =>
  createInstance({
    apiKey: process.env.NEXT_PUBLIC_SALTANA_CORE_PUBLISHABLE_KEY,
    apiHost: process.env.NEXT_PUBLIC_CORE_API_HOST,
  })

/*
async function getUserById(userId) {
  const naturalUser = await api.users.read(userId, {
    saltanaOrganizationId: null,
  })

  const organizationsIds = Object.keys(naturalUser.organizations)

  const promises = organizationsIds.map((organizationId) => {
    return api.users.read(organizationId, {
      saltanaOrganizationId: organizationId,
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

      newSession.coreAccessToken = token.coreAccessToken
      newSession.refreshToken = token.refreshToken
      newSession.user.id = token.sub
      newSession.user.role = token?.role

      return newSession
    },
    async jwt(token, user, account, profile) {
      token.coreAccessToken = token.coreAccessToken || profile.accessToken
      token.refreshToken = token.refreshToken || profile.refreshToken
      token.sub = token.sub || profile.userId
      token.role = token?.role || profile?.role
      return token
    },
  },
  pages: {
    signIn: '/login',
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
          const user = await api().auth.loginMagic({
            token,
          })
          return user
        } catch (err) {
          console.warn('Unable to get or create user via Magic.link', err)
          throw Error('Unknown failure')
        }
      },
    }),
  ],
})
