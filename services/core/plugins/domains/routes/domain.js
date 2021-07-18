const _ = require('lodash')
const createLinkService = require('../services/domain')
const createLink = require('../models/Domain')

let link
let deps = {}

function init(server, { middlewares, helpers } = {}) {
  const {
    checkPermissions,
    // testMiddleware, // middleware created by this plugin
  } = middlewares
  const { wrapAction, getRequestContext } = helpers

  server.get(
    {
      name: 'domain.list',
      path: '/domains',
    },
    checkPermissions(['domain:list', 'domain:list:all']),
    wrapAction(async (req, res) => {
      let ctx = getRequestContext(req)

      const fields = [
        'orderBy',
        'order',
        'nbResultsPerPage',

        // offset pagination
        'page',

        // cursor pagination
        'startingAfter',
        'endingBefore',

        'id',
        'ownerId',
        'linkType',
        'slug',
        'destination',
        'targetId',
        'assetId',
        'transactionId',
        'label',
      ]

      const payload = _.pick(req.query, fields)

      ctx = Object.assign({}, ctx, payload)
      return domain.list(ctx)
    })
  )

  server.get(
    {
      name: 'domain.read',
      path: '/domains/:id',
    },
    checkPermissions(['domain:read', 'domain:read:all']),
    wrapAction(async (req, res) => {
      let ctx = getRequestContext(req)

      const { id } = req.params

      ctx = Object.assign({}, ctx, {
        linkId: id,
      })

      return domain.read(ctx)
    })
  )

  server.post(
    {
      name: 'domain.create',
      path: '/domains',
    },
    checkPermissions(['domain:create', 'domain:create:all']),
    wrapAction(async (req, res) => {
      let ctx = getRequestContext(req)

      const fields = [
        'slug',
        'linkType',
        'destination',
        'content',
        'ownerId',
        'asset',
        'name',
        'metadata',
        'platformData',
      ]

      const payload = _.pick(req.body, fields)

      ctx = Object.assign({}, ctx, payload)

      return domain.create(ctx)
    })
  )

  server.patch(
    {
      name: 'domain.update',
      path: '/domains/:id',
    },
    checkPermissions(['domain:edit', 'domain:edit:all']),
    wrapAction(async (req, res) => {
      let ctx = getRequestContext(req)

      const { id } = req.params

      const fields = [
        'slug',
        'linkType',
        'destination',
        'content',
        'metadata',
        'platformData',
      ]

      const payload = _.pick(req.body, fields)

      ctx = Object.assign({}, ctx, payload, {
        linkId: id,
      })

      return domain.update(ctx)
    })
  )

  server.del(
    {
      name: 'domain.remove',
      path: '/domains/:id',
    },
    checkPermissions(['domain:remove', 'domain:remove:all']),
    wrapAction(async (req, res) => {
      let ctx = getRequestContext(req)

      const { id } = req.params

      ctx = Object.assign({}, ctx, {
        linkId: id,
      })

      return domain.remove(ctx)
    })
  )
}

function start(startParams) {
  deps = Object.assign({}, startParams)

  const {
    communication: { getRequester },
    BaseModel,
  } = deps

  const documentRequester = getRequester({
    name: 'Link service > Document Requester',
    key: 'document',
  })

  const assetRequester = getRequester({
    name: 'Link service > Asset Requester',
    key: 'asset',
  })

  const transactionRequester = getRequester({
    name: 'Link service > Transaction Requester',
    key: 'transaction',
  })

  const Link = createLink(BaseModel)

  Object.assign(deps, {
    documentRequester,
    assetRequester,
    transactionRequester,

    Link,
  })

  link = createLinkService(deps)
}

function stop() {
  const { documentRequester, assetRequester, transactionRequester } = deps

  documentRequester.close()
  assetRequester.close()
  transactionRequester.close()

  deps = null
}

module.exports = {
  init,
  start,
  stop,
}
