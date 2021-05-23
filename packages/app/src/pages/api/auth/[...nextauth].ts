import sortBy from 'lodash.sortby'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import api from '../../../modules/api/instance-admin'

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

export default NextAuth({
  callbacks: {
    async signIn() {
      return true
    },
    async session(session, token) {
      console.log('session', { session, token })
      session.profile = token.profile
      return session
    },
    async jwt(token, user, account, profile) {
      console.log({ token, user, account, profile })
      token.profile = profile || token.profile
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
          const { userId } = await api.auth.loginMagic({
            token,
          })
          return await getUserById(userId)
        } catch (err) {
          console.warn('Unable to get or create user via Magic.link', err)
          throw Error('Unknown failure')
        }
      },
    }),
  ],
})
