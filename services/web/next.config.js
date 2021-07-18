const CREATOR_SPACE_HAS = [
  {
    type: 'header',
    key: 'x-saltana-domain',
    value: '(?<domain>.*)',
  },
]

const BASE_DOMAIN = 'https://www.saltana.com'

module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/dashboard',
        has: [...CREATOR_SPACE_HAS],
        destination: `${BASE_DOMAIN}/dashboard`,
        permanent: true,
      },
      {
        source: '/spaces',
        has: [...CREATOR_SPACE_HAS],
        destination: BASE_DOMAIN,
        permanent: false,
      },
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/uploads/:path*',
          has: [...CREATOR_SPACE_HAS],
          destination: '/api/methods/get-uploaded-object/:domain/:path*',
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
      ],
      fallback: [
        // These rewrites are checked after both pages/public files
        // and dynamic routes are checked
        {
          source: '/:path*',
          destination: `https://landing-g6g19yr3n-saltana.vercel.app/:path*`,
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
