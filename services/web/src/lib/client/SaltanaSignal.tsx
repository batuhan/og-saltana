import { io } from 'socket.io-client'
import { sharedSaltanaConfig } from './api'

export const sharedSignalInstancePromise = getSocketInstance()

export async function getSocketInstance(_session = undefined) {
  const session = _session || (await getSession())

  const opts: { publishableKey: string; authToken?: string } = {
    publishableKey: session.coreAccessToken,
  }

  if (session && session.coreAccessToken) {
    opts.authToken = session.coreAccessToken
  }

  const instance = io(`${sharedSaltanaConfig.apiBase}/signal`, {
    path: '/signal',
    transports: ['websocket'],
  })

  instance.on('authentication', (id, subscribeCb) => {
    if (typeof subscribeCb === 'function') {
      subscribeCb({
        ...opts,
      })
    }
    console.log('unique WebSocket id to target user’s current browser', id)
  })

  return instance
}
