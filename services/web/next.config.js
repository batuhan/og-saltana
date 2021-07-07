module.exports = {
  typescript: {
    ignoreBuildErrors: true,
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
    domains: ['images.unsplash.com', 'pbs.twimg.com'],
  },
  poweredByHeader: false,
  reactStrictMode: true,
}
