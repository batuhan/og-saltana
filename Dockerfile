FROM node:14-alpine

# Puppeteer installation process inspired by:
# https://github.com/GoogleChrome/puppeteer/issues/1793#issuecomment-442730223

ENV CHROME_BIN="/usr/bin/chromium-browser"

RUN apk --no-cache add \
  python \
  make \
  g++ \
  git \
  # needed for SSH using Docker BuildKit
  openssh-client \
  # Puppeteer/chromium
  udev \
  ttf-freefont \
  chromium

# Preparing to install private plugins from Github with SSH
RUN mkdir -p -m 0600 ~/.ssh && \
  ssh-keyscan github.com >> ~/.ssh/known_hosts

WORKDIR /usr/src/app

COPY package.json package.json
COPY lerna.json lerna.json
COPY yarn.lock yarn.lock

COPY services/core/package.json services/core/package.json

COPY packages/common/package.json packages/common/package.json

COPY packages/sdk/package.json packages/sdk/package.json

COPY packages/vendor-objection/package.json packages/vendor-objection/package.json

COPY packages/util-keys/package.json packages/util-keys/package.json

COPY packages/fil/package.json packages/fil/package.json

RUN yarn && yarn bootstrap

COPY services/core/ services/core/
COPY packages/common/ packages/common/
COPY packages/vendor-objection/ packages/vendor-objection/
COPY packages/util-keys/ packages/util-keys/

WORKDIR /usr/src/app/services/core
RUN yarn plugins:prepare

CMD [ "node", "server/start.js" ]
