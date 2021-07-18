const BASE_DOMAIN = 'saltana.com'

const EXTERNAL_DOMAIN = ''
const DOMAINS = {
  BASE: 'saltana.com',
}
const customDomainRewrite = (source = '') => ({
  has: [
    {
      type: 'domain',
      value: '(?<domain>.*)',
    },
  ],
  source: source === '' ? '/' : source,
  destination: `/domains/:domain${source}`,
})

const customDomainRewrite = (source = '', destination) => ({
  has: [],
  source: source === '' ? '/' : source,
  destination: `/domains/:domain${destination || source}`,
})

const BASE_DOMAIN = 'saltana.com'

const CREATOR_SPACE_HAS = [
  {
    type: 'header',
    key: 'x-saltana-domain',
    value: '(?<domain>.*)',
  },
]

module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return {
      beforeFiles: [
        {
          source: '/dashboard*',
          has: [...CREATOR_SPACE_HAS],
          destination: `${BASE_DOMAIN}/dashboard`,
        },
        {
          source: '/spaces',
          has: [...CREATOR_SPACE_HAS],
          destination: BASE_DOMAIN,
        },
      ],
    }
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/uploads/:path*',
          has: [...CREATOR_SPACE_HAS],
          destination: '/api/methods/get-uploaded-object/:path*',
        },
        {
          source: '/sitemap.xml',
          has: [...CREATOR_SPACE_HAS],
          destination: '/api/methods/get-sitemap/:domain',
        },
        {
          source: '/robots.txt',
          has: [...CREATOR_SPACE_HAS],
          destination: '/api/methods/get-robots/:domain',
        },
      ],
      afterFiles: [
        // These rewrites are checked after pages/public files
        // are checked but before dynamic routes
        {
          has: [...CREATOR_SPACE_HAS],
          source: '/:slug*',
          destination: '/domains/:domain/:slug*',
        },
        {
          source: '/',
          has: [...CREATOR_SPACE_HAS],
          destination: '/api/methods/get-uploaded-object/:path*',
        },
      ],
      fallback: [
        // These rewrites are checked after both pages/public files
        // and dynamic routes are checked
        {
          source: '/:path*',
          destination: `https://my-old-site.com/:path*`,
        },
      ],
      afterFiles: [
        {
          destination: 'https://saltana-landing.vercel.app',
        },
        ...customDomainRewrite(),
        ...customDomainRewrite('/links/:link*', '/:link*'),
        ...customDomainRewrite('/sitemap.xml'),
        ...customDomainRewrite('/robots.txt'),
        {
          has: [
            {
              type: 'domain',
              value: BASE_DOMAIN,
            },
          ],
          source: '/',
          destination: '/dashboard',
        },
        {
          has: [
            {
              type: 'host',
              value: '(?<host>.*)',
            },
            {
              type: 'header',
              key: 'accept-encoding',
              value: '(?<encoding>.*)',
            },
            {
              type: 'query',
              key: 'x',
              value: '(?<x>.*)',
            },
          ],
          source: '/headers/:slug*',
          destination: '/headers/:slug*/host/:host/encoding/:encoding/x/:x',
        },
        {
          has: [
            {
              type: 'host',
              value: '(?<host>.*)',
            },
            {
              type: 'header',
              key: 'accept-encoding',
              value: '(?<encoding>.*)',
            },
          ],
          source: '/headers/:slug*',
          destination: '/headers/:slug*/host/:host/encoding/:encoding/x/null',
        },
        {
          has: [
            {
              type: 'host',
              value: '(?<host>.*)',
            },
          ],
          source: '/headers/:slug*',
          destination: '/headers/:slug*/host/:host/encoding/null/x/null',
        },
        {
          has: [
            {
              type: 'host',
              value: '(?<host>.*)',
            },
          ],
          source: '/posts/:id',
          destination: '/hosts/:host/posts/:id',
        },
      ],
    }
  },
  webpack: (config) => {
    // Let Babel compile outside of src/.
    const tsRule = config.module.rules.find(
      (rule) => rule.test && rule.test.toString().includes('tsx|ts')
    )
    tsRule.include = undefined
    tsRule.exclude = /node_modules/
    // Unset client-side javascript that only works server-side
    config.resolve.fallback = { fs: false, module: false }

    return config
  },
  images: {
    domains: [
      'images.unsplash.com',
      'api2-nak.transloadit.com',
      'pbs.twimg.com',
      'transloadit.com',
    ],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}
