const BASE_DOMAIN =
  process.env.BASE_DOMAIN || process.env.VERCEL_URL || 'dev.saltana.com'
const MARKETING_DOMAIN =
  process.env.MARKETING_DOMAIN || 'landing-g6g19yr3n-saltana.vercel.app'

const CORE_API_URL = process.env.CORE_API_URL || 'http://localhost:4100'
const MAIN_SITE_HAS_RULES = [
  {
    type: 'host',
    value: BASE_DOMAIN,
  },
]

const CREATOR_SPACE_HAS_RULES = [
  // Match only one item
  //  /^(https?:\/\/)?(www\.)?(saltana|vercel)\.com$/,
  [
    {
      type: 'host',
      value: `(?<domain>.*).${BASE_DOMAIN}`,
    },
  ],
  [
    {
      type: 'header',
      key: 'x-saltana-domain',
      value: '(?<domain>.*)',
    },
  ],
]

function addCreatorSpaceMatchers(rule) {
  return CREATOR_SPACE_HAS_RULES.map((has) => ({ ...rule, has }))
}

function addMainSiteMatchers(rule) {
  return MAIN_SITE_HAS_RULES.map((has) => ({ ...rule, has }))
}

const CREATOR_SPACE_REDIRECTS = [
  ...addCreatorSpaceMatchers({
    source: '/dashboard',
    destination: `https://${BASE_DOMAIN}/dashboard`,
    permanent: true,
  }),
]

const CREATOR_SPACE_REWRITES = {
  beforeFiles: [
    ...addCreatorSpaceMatchers({
      source: '/uploads/:path*',
      destination: '/api/methods/get-uploaded-object/:domain/:path*',
    }),
    ...addCreatorSpaceMatchers({
      source: '/sitemap.xml',
      destination: '/api/methods/get-sitemap/:domain',
    }),
    ...addCreatorSpaceMatchers({
      source: '/robots.txt',
      destination: '/api/methods/get-robots/:domain',
    }),
    ...addCreatorSpaceMatchers({
      source: '/',
      destination: '/spaces/:domain/',
    }),
  ],
  afterFiles: [
    // These rewrites are checked after pages/public files
    // are checked but before dynamic routes
    ...addCreatorSpaceMatchers({
      source: '/:link/:orderId',
      destination: '/spaces/:domain/:link/:orderId',
    }),
    ...addCreatorSpaceMatchers({
      source: '/:link/checkout',
      destination: '/spaces/:domain/:link/checkout',
    }),
    ...addCreatorSpaceMatchers({
      source: '/:link/embed',
      destination: '/spaces/:domain/:link/embed',
    }),
    ...addCreatorSpaceMatchers({
      source: '/:link',
      destination: '/spaces/:domain/:link',
    }),
  ],
}

module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [...CREATOR_SPACE_REDIRECTS]
  },
  async rewrites() {
    return {
      beforeFiles: [
        ...CREATOR_SPACE_REWRITES.beforeFiles,
        {
          source: `/api/v1/:path*`,
          destination: `${CORE_API_URL}/:path*`,
        },
        {
          source: '/',
          has: MAIN_SITE_HAS_RULES,
          destination: `https://${MARKETING_DOMAIN}/`,
        },
      ],
      afterFiles: [
        // These rewrites are checked after pages/public files
        // are checked but before dynamic routes
        ...CREATOR_SPACE_REWRITES.afterFiles,
      ],
      fallback: [
        // These rewrites are checked after both pages/public files
        // and dynamic routes are checked

        {
          source: '/:path*',
          destination: `https://${MARKETING_DOMAIN}/:path*`,
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
