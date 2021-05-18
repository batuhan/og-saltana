import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import sortBy from 'lodash.sortby'
import api from '../../../modules/api/instance-admin'

async function getUserById(userId) {
  const naturalUser = await api.users.read(userId, {
    stelaceOrganizationId: null,
  })

  const organizationsIds = Object.keys(naturalUser.organizations)

  const promises = organizationsIds.map(organizationId => {
    return api.users.read(organizationId, {
      stelaceOrganizationId: organizationId,
    })
  })

  const organizations = await Promise.all(promises)

  const userData = {
    ...naturalUser,
    organizations: sortBy(organizations, org => org.createdDate),
  }

  return userData
}

export default NextAuth({
  // Configure one or more authentication providers
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
      async authorize({ token }, req) {
        try {
          const user = await api.auth.loginMagic({
            token,
          })
          return getUserById(user.userId)
        } catch (err) {}
      },
    }),
  ],
})
