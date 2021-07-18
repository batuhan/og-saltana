- on every domain
  - /assets
  - /\_next
  - /
  - /api
- saltana.com|{buildId}.\_preview.saltana.com
  - /dashboard
  - /spaces
  - /my
  - /login
  - ... -> webflow
- {username}.com|{username}.saltana.com|{username}.{buildId}.\_preview.saltana.com
  - change hostname to {creatorId}.\_saltana

username.saltana.com|username.com -> proxy to web, add x-creator-id & x-link-id to requests
username.saltana.com|username.com -> redirect to saltana.com/

- Public API soon
- Secured by Saltana
- [creator] uses Saltana for this payment.
  - Saltana offers refunds if asset descriptions don't reflect the asset you bought in an honest light??????
  -

Login dance

- Hey!

- Enter your e-mail to contiune

- [Creator Dashboard]
- [Access Assets You Bought From Creators]

servic
Domains:
substitute `saltana.com` for env-specific domain

    - saltana.com
    - glue.saltana.com
        - / -> redirect to saltana.com
        - /_/
        - /robots.tsx

    - dashboard.saltana.com -> load dashboard
    - $custom._.saltana.com
        - /uploads/** -> $uploads-bucket.s3.aws.com/creators/usr_... (sign)

    - * (every domain)
        - /api/core ->
        - /api/**
        - /.next/
        - /static
        - /robots.txt (fallback)

/

/api/
/spaces/[domain]/robots.txt
/spaces/[domain]/sitemap.js
/spaces/[domain]/robots.txt
/spaces/[domain]/sitemap.js
/spaces/[domain]/robots.txt

/dashboard/
/blocks/[type]/[id]
/

@saltana-private/core
@saltana-private/dashboard
@saltana-private/edge
@saltana-private/glue

@saltana-private/client

- components
  @saltana/api-client
  @saltana/sdk
  @saltana/base

saltana.com -> webflow
batuhan.saltana.com|batuhan.co -> edge - /\_/saltana.js - /my/\*\* - /[:link] - /[:link]/checkout - /

glue.saltana.com -> - / -> redirect to saltana.com - /api/auth/ - /api/auth/

dashboard.saltana.com -> dashboard - /[creator]/... - /my/...
