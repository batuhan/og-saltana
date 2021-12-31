FROM node:14-alpine

RUN apk --no-cache add git

WORKDIR /usr/src/app

COPY package.json package.json
COPY lerna.json lerna.json
COPY yarn.lock yarn.lock

COPY services/core/package.json services/core/package.json

COPY packages/common/package.json packages/common/package.json

COPY packages/sdk/package.json packages/sdk/package.json

COPY packages/vendor-objection/package.json packages/vendor-objection/package.json

COPY packages/util-keys/package.json packages/util-keys/package.json

RUN yarn && yarn bootstrap

COPY services/core/ services/core/
COPY packages/common/ packages/common/
COPY packages/vendor-objection/ packages/vendor-objection/
COPY packages/util-keys/ packages/util-keys/

WORKDIR /usr/src/app/services/core
RUN yarn plugins:prepare

CMD [ "node", "server/start.js" ]
