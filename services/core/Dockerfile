# syntax = docker/dockerfile:1.0.2-experimental
# Using BuildKit for SSH, please refer to
# https://docs.docker.com/develop/develop-images/build_enhancements/#using-ssh-to-access-private-data-in-builds

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
  chromium \
  ca-certificates

RUN update-ca-certificates

# Preparing to install private plugins from Github with SSH
RUN mkdir -p -m 0600 ~/.ssh && \
  ssh-keyscan github.com >> ~/.ssh/known_hosts

COPY package.json yarn.lock /tmp/
# Install app dependencies in dedicated steps to leverage layer caching
# SSH potentially needed for private plugins
RUN cd /tmp && yarn
RUN mkdir -p /usr/src/app && cd /usr/src/app && ln -s /tmp/node_modules

# Copy app directory
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN yarn plugins:install --save
RUN yarn plugins:prepare

CMD [ "node", "server/start.js" ]
