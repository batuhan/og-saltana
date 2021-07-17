import useProxy from 'rocket-booster'

const marketingConfig = {
  upstream: {
    domain: 'saltana-43df66.webflow.io',
    protocol: 'https',
  },

  firewall: [],

  cors: {
    origin: true,
    methods: ['GET', 'POST'],
    allowedHeaders: '*',
  },

  security: {
    forwarded: true,
    hidePoweredBy: true,
    ieNoOpen: true,
    xssFilter: true,
    noSniff: true,
    setCookie: true,
  },

  optimization: {
    mirage: true,
    minify: {
      javascript: true,
      css: true,
      html: true,
    },
  },
}

const config = {
  upstream: {
    domain: 'httpbin.org',
    protocol: 'https',
  },

  firewall: [
    {
      field: 'country',
      operator: 'in',
      value: ['CN', 'KP', 'SY', 'PK', 'CU'],
    },
  ],

  cors: {
    origin: true,
    methods: ['GET', 'POST'],
    allowedHeaders: '*',
  },

  security: {
    forwarded: true,
    hidePoweredBy: true,
    ieNoOpen: true,
    xssFilter: true,
    noSniff: true,
    setCookie: true,
  },

  optimization: {
    mirage: true,
    minify: {
      javascript: true,
      css: true,
      html: true,
    },
  },
}

addEventListener('fetch', (event) => {
  const proxy = useProxy(config)
  const response = proxy.apply(event.request)
  event.respondWith(response)
})
