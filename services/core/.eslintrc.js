module.exports = {
  env: {
    node: true,
  },
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
  ],
  plugins: ['prettier'],
  rules: {
    'comma-dangle': 'off',
    'multiline-ternary': 'off',
  },
}
