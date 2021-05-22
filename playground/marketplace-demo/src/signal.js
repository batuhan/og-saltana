import io from 'socket.io-client'

const signalWebsocketEndpoint = 'https://api.stelace.com/signal'

const connection = process.env.SALTANA_CORE_API_URL ? `${process.env.SALTANA_CORE_API_URL}/signal`
  : signalWebsocketEndpoint

const socket = io(connection, {
  path: '/signal',
  autoConnect: false, // waiting for Vue app to authenticate properly
  transports: ['websocket']
})

export default socket
