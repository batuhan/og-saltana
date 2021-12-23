module.exports = {
  apps: [
    {
      name: 'miniflare',
      script: 'miniflare --build-command "npm run dev:worker" --watch',
      ignore_watch: ['.'],
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'postcss',
      script: 'postcss styles --base styles --dir app/styles -w',
      ignore_watch: ['.'],
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'remix',
      script: 'remix watch',
      ignore_watch: ['.'],
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
}
