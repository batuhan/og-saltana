module.exports = {
  presets: [['next/babel', { 'preset-react': { runtime: 'automatic' } }]],
  plugins: [
    'babel-plugin-macros',
    [
      'babel-plugin-styled-components',
      {
        ssr: true,
        displayName: true,
      },
    ],
    '@kiwicom/babel-plugin-orbit-components',
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./src/'],
        alias: {
          '@/client': './src/lib/client',
          '@/common': './src/lib/common',
          '@/server': './src/lib/server',
        },
      },
    ],
  ],
}
