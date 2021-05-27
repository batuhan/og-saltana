# Saltana

This repository is the monorepo for every internal Saltana project. This includes development environment, docs, build tools, forks and more.

_Services_ are deployed projects (web apps, api, workers) and _Packages_ are shared code to be used in those services (or partner services). Currently no packages are published.

Repository is managed with `yarn workspaces`. Make sure you use [Volta](https://volta.sh) to manage Node versions across projects and yarn v2 (berry) for dependency management. Otherwise, side effects might include heavy crying, loss of sleep and productivity since Saltana relies on code that runs on wildly different platforms.

## Environments

| env           | base                          | 
| ------------- | ----------------------------- |
| `production`  | `https://www.saltana.com`     | 
| `staging`     | `https://staging.saltana.com` |
| `development` | `https://dev.saltana.com`     | 
| `local`       | `http://localhost`            | 

## Projects

| name           | description     |  routes |
| ------------- | ----------------------------- |----- |
| [`core`](./services/core)  | main api | `/api/v1/*` (proxied by *edge*) |
| [`web`](./services/core)     | server rendered web app | `/*` (proxied by *edge*) |
| [`edge`](./services/core) | cloudflare worker for fast cache, proxy, auth and more | `/*`, `/api/v0/*`  |

All services are deployed under a single domain as defined in *Environments* above.

### [core](./services/core) | *service*

Where the magic mostly happens. This is our main API. Internal Workflows, Webhooks, Transactions, Content and most everything is managed from there.

Forked from Stelace. Made for a Marketplace API SaaS (designed for multiple marketplaces with isolated databases), it covers our case perfectly. Stelace is licenses under [GNU GPL 3.0](https://choosealicense.com/licenses/gpl-3.0/)

It uses a micro-service framework called `cote` to separate service calls and HTTP requests, which we'll separate to move the entire API to serverless because it's way easier to manage and scale. It also features a plugin architecture.

#### Dependencies

Note that included `docker-compose` files gets you running with all the dependencies without much work.

- PostgreSQL with TimescaleDB extension among other things for the main database

- Redis for cache, queues and environment data. Must be persistent, sadly. See https://github.com/saltanahq/saltana/issues/4

- ElasticSearch for search and querying. Querying part is important: most of the list APIs rely on ElasticSearch. See https://github.com/saltanahq/saltana/issues/5

- Elastic APM server for performance and logs (local development without is fine)

Deployed on DigitalOcean Apps. With the database at TimescaleDB Cloud for now because of licensing issues.

Served behind `edge`.

### [web](./services/web) | *service*

Next.js, mixed TypeScript and JavaScript, react-query, SSR, next-seo, next-auth

Deployed on Vercel. Served behind `edge`.

### [edge](./services/edge) | *service*

CloudFlare Worker that authorizes, proxied and caches our services.
It runs on *every* CloudFlare location so provides instant responses to our visitors. Payment Intents for Stripe for example are created at the edge so the payments are instant.

Both server side produced HTML from the `web`application and the subsequent API requests to `core` are cached *if they are not authorized (so most requests never hit on our serves)*.

Uses CloudFlare KV to store the cache. 

It'll also allow us to build custom domains on top of it in the future.

SDK for embeds are served from here. The external checkout UI *will* also be rendered here directly for a faster experience.

### [sdk](./packages/sdk) | *package*

A browser and NodeJS library for interacting with `core`. 

### [fil](./packages/fil) | *package*

Internal command line application for a better development experience. It also includes a wrapper for the SDK for internal modules.

### [env](./packages/env) | *package*

Shared configs to be used in every service.


## How to run

