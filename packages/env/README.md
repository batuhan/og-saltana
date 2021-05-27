# Environment Variables

This package contains environment variables that can be shared across multiple
projects in the monorepo (`core`, `app`, `edge` etc.).

**IMPORTANT**: Database passwords, API keys etc. need to be encrypted.

## Pre-configured Environments

- `local`
- `development` (default)
- `test`
- `production`

## References

- [The twelve-factor app](https://12factor.net/config) methodology
- [Dotenv](https://github.com/motdotla/dotenv) `.env` files loader
- [GraphQL API Starter Kit](https://github.com/kriasoft/graphql-starter)
