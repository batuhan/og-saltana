const _ = require('lodash')
const createLinkService = require('../services/link')
const createLink = require('../models/Link')

let link
let deps = {}

function init (server, { middlewares, helpers } = {}) {
  const {
    checkPermissions,
   // testMiddleware, // middleware created by this plugin
  } = middlewares
  const {
    wrapAction,
    getRequestContext
  } = helpers

  server.get({
    name: 'link.list',
    path: '/links'
  }, checkPermissions([
    'link:list',
    'link:list:all'
  ]), wrapAction(async (req, res) => {
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
      'label'
    ]

    const payload = _.pick(req.query, fields)

    ctx = Object.assign({}, ctx, payload)
    return link.list(ctx)
  }))

  server.get({
    name: 'link.read',
    path: '/links/:id'
  }, checkPermissions([
    'link:read',
    'link:read:all'
  ]), wrapAction(async (req, res) => {
    let ctx = getRequestContext(req)

    const { id } = req.params

    ctx = Object.assign({}, ctx, {
      linkId: id
    })

    return link.read(ctx)
  }))

  server.post({
    name: 'link.create',
    path: '/links'
  }, checkPermissions([
    'link:create',
    'link:create:all'
  ]), wrapAction(async (req, res) => {
    let ctx = getRequestContext(req)

    const fields = [
      'slug',
      'linkType',
      'destination',
      'content',
      'ownerId',
      'targetId',
      'assetId',
      'transactionId',
      'label',
      'metadata',
      'platformData'
    ]

    const payload = _.pick(req.body, fields)

    ctx = Object.assign({}, ctx, payload)

    return link.create(ctx)
  }))

  server.patch({
    name: 'link.update',
    path: '/links/:id'
  }, checkPermissions([
    'link:edit',
    'link:edit:all'
  ]), wrapAction(async (req, res) => {
    let ctx = getRequestContext(req)

    const { id } = req.params

    const fields = [
      'slug',
      'linkType',
      'destination',
      'content',
      'metadata',
      'platformData'
    ]

    const payload = _.pick(req.body, fields)

    ctx = Object.assign({}, ctx, payload, {
      linkId: id
    })

    return link.update(ctx)
  }))

  server.del({
    name: 'link.remove',
    path: '/links/:id'
  }, checkPermissions([
    'link:remove',
    'link:remove:all'
  ]), wrapAction(async (req, res) => {
    let ctx = getRequestContext(req)

    const { id } = req.params

    ctx = Object.assign({}, ctx, {
      linkId: id
    })

    return link.remove(ctx)
  }))
}

function start (startParams) {
  deps = Object.assign({}, startParams)

  const {
    communication: { getRequester },
    BaseModel
  } = deps

  const documentRequester = getRequester({
    name: 'Link service > Document Requester',
    key: 'document'
  })

  const assetRequester = getRequester({
    name: 'Link service > Asset Requester',
    key: 'asset'
  })

  const transactionRequester = getRequester({
    name: 'Link service > Transaction Requester',
    key: 'transaction'
  })

  const Link = createLink(BaseModel)

  Object.assign(deps, {
    documentRequester,
    assetRequester,
    transactionRequester,

    Link
  })

  link = createLinkService(deps)
}

function stop () {
  const {
    documentRequester,
    assetRequester,
    transactionRequester
  } = deps

  documentRequester.close()
  assetRequester.close()
  transactionRequester.close()

  deps = null
}

module.exports = {
  init,
  start,
  stop
}
