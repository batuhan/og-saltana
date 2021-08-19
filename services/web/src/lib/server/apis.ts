import Stripe from 'stripe'
import { createInstance } from '@saltana/sdk'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {})

export const adminApi = createInstance({
  apiKey: process.env.SALTANA_CORE_SECRET_API_KEY,
  apiHost: process.env.NEXT_PUBLIC_CORE_API_HOST,
})

export async function getOrCreateUserFromEmail(
  email: string,
  data: { displayName: string },
): Promise<string> {
  try {
    const user = await adminApi.users.read(email)
    if (user) {
      return user.id
    }
  } catch (error) {
    // TODO: do different things depending on the error
    const newUser = await adminApi.users.create({
      type: 'user',
      username: email,
      email,
      password:
        'F)bqjH<h+deMk>UPr$d%6OPq@+S>(,K_nr+&z8y/3SXrP7-=tk[J2@2YZT^|@>Hb',
      displayName: data.displayName,
    })
    return newUser.id
  }
}
