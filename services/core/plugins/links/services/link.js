const _ = require('lodash')
const { getObjectId } = require('stelace-util-keys')

module.exports = function createService (deps) {
  const {
    assetRequester,
    documentRequester,
    transactionRequester,

    Link,

    getCurrentUserId,
    createError,
    handleRemoteNotFoundError
  } = deps

  return {
    list,
    read,
    create,
    update,
    remove
  }

  async function list (req) {
    const {
      id,
      orderBy,
      order,
      nbResultsPerPage,

      // offset pagination
      page,

      // cursor pagination
      startingAfter,
      endingBefore,

      authorId,
      targetId,
      assetId,
      transactionId,

      label
    } = req

    const documentParams = {
      type: 'list',
      documentType: 'link',
      id,
      orderBy,
      order,
      nbResultsPerPage,

      // offset pagination

      // cursor pagination
      startingAfter,
      endingBefore,

      page,
      authorId,
      targetId,
      label,

      _useOffsetPagination: req._useOffsetPagination,
    }

    const data = {}

    if (assetId) {
      data.assetId = assetId
    }
    if (transactionId) {
      data.transactionId = transactionId
    }

    if (!_.isEmpty(data)) {
      documentParams.data = data
    }

    const paginationResult = await documentRequester.communicate(req)(documentParams)

    const currentUserId = getCurrentUserId(req)

    paginationResult.results = paginationResult.results.map(doc => {
      const link = Link.convertDocToLink(doc)

      if (!req._matchedPermissions['link:list:all']) {
        const isSelf = Link.isSelf(link, currentUserId)
        if (!isSelf) {
          throw createError(403)
        }
      }

      return Link.expose(link, { req })
    })

    return paginationResult
  }

  async function read (req) {
    const linkId = req.linkId

    const doc = await documentRequester.communicate(req)({
      type: 'read',
      documentId: linkId
    }).catch(handleRemoteNotFoundError)
    if (!doc || doc.type !== 'link') {
      throw createError(404)
    }

    const link = Link.convertDocToLink(doc)

    const currentUserId = getCurrentUserId(req)

    const isSelf = Link.isSelf(link, currentUserId)
    if (!req._matchedPermissions['link:read:all'] && !isSelf) {
      throw createError(403)
    }

    return Link.expose(link, { req })
  }

  async function create (req) {
    const platformId = req.platformId
    const env = req.env

    const fields = [
      'linkType',
      'slug',
      'pageContent',
      'redirectTo',
      'authorId',
      'targetId',
      'assetId',
      'transactionId',
      'label',
      'metadata',
      'platformData'
    ]

    const payload = _.pick(req, fields)

    const createAttrs = Object.assign({}, payload)

    const currentUserId = getCurrentUserId(req)

    // cannot create as another user
    if (!req._matchedPermissions['link:create:all'] && createAttrs.authorId && createAttrs.authorId !== currentUserId) {
      throw createError(403)
    }

    // automatically set the current user as author if there is no specified author
    if (!createAttrs.authorId && currentUserId) {
      createAttrs.authorId = currentUserId
    }

    const isSelf = currentUserId && currentUserId === createAttrs.authorId
    if (!req._matchedPermissions['link:create:all'] && !isSelf) {
      throw createError(403)
    }

    const getAsset = async () => {
      if (!createAttrs.assetId) return

      const asset = await assetRequester.communicate(req)({
        type: 'read',
        assetId: createAttrs.assetId,
        _matchedPermissions: {
          'asset:read:all': true
        }
      }).catch(handleRemoteNotFoundError)

      if (!asset) {
        throw createError(422, `Asset ID ${createAttrs.assetId} doesn't exist`)
      }

      return asset
    }

    const getTransaction = async () => {
      if (!createAttrs.transactionId) return

      const transaction = await transactionRequester.communicate(req)({
        type: 'read',
        transactionId: createAttrs.transactionId,
        _matchedPermissions: {
          'transaction:read:all': true
        }
      }).catch(handleRemoteNotFoundError)

      if (!transaction) {
        throw createError(422, `Transaction ID ${createAttrs.transactionId} doesn't exist`)
      }

      return transaction
    }

    const [
      asset,
      transaction
    ] = await Promise.all([
      getAsset(),
      getTransaction()
    ])

    // automatically set the assetId if the information is available in transaction
    if (!createAttrs.assetId && transaction.assetId) {
      createAttrs.assetId = transaction.assetId
    }

    if (asset && transaction && asset.id !== transaction.assetId) {
      throw createError(422, `The transaction ${transaction.id} isn't associated with the asset ${asset.id}`)
    }

    const docCreateAttrs = Link.convertLinkToDoc(createAttrs)

    docCreateAttrs.documentId = await getObjectId({ prefix: Link.idPrefix, platformId, env })
    docCreateAttrs.documentType = 'link'

    const docCreateParams = Object.assign({}, docCreateAttrs, {
      type: 'create'
    })

    const document = await documentRequester.communicate(req)(docCreateParams)
    const link = Link.convertDocToLink(document)

    return Link.expose(link, { req })
  }

  async function update (req) {
    const linkId = req.linkId

    const fields = [
      'score',
      'comment',
      'metadata',
      'platformData'
    ]

    const payload = _.pick(req, fields)

    const doc = await documentRequester.communicate(req)({
      type: 'read',
      documentId: linkId
    }).catch(handleRemoteNotFoundError)
    if (!doc || doc.type !== 'link') {
      throw createError(404)
    }

    const link = Link.convertDocToLink(doc)

    const currentUserId = getCurrentUserId(req)

    const isSelf = link.authorId && link.authorId !== currentUserId
    if (!req._matchedPermissions['link:edit:all'] && !isSelf) {
      throw createError(403)
    }

    const updateAttrs = payload

    const docUpdateAttrs = Link.convertLinkToDoc(updateAttrs)

    const docUpdateParams = Object.assign({}, docUpdateAttrs, {
      type: 'update',
      documentId: linkId
    })

    const document = await documentRequester.communicate(req)(docUpdateParams)
    const newLink = Link.convertDocToLink(document)

    return Link.expose(newLink, { req })
  }

  async function remove (req) {
    const linkId = req.linkId

    const doc = await documentRequester.communicate(req)({
      type: 'read',
      documentId: linkId
    }).catch(handleRemoteNotFoundError)
    if (!doc || doc.type !== 'link') {
      return { id: linkId }
    }

    const link = Link.convertDocToLink(doc)

    const currentUserId = getCurrentUserId(req)

    const isSelf = currentUserId === link.authorId

    if (!req._matchedPermissions['link:remove:all'] && !isSelf) {
      throw createError(403)
    }

    await documentRequester.communicate(req)({
      type: 'remove',
      documentId: linkId
    })

    return { id: linkId }
  }
}
