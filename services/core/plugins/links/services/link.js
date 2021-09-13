const _ = require('lodash')
const { getObjectId } = require('@saltana/util-keys')

module.exports = function createService(deps) {
  const {
    assetRequester,
    documentRequester,
    transactionRequester,

    Link,

    getCurrentUserId,
    createError,
    handleRemoteNotFoundError,
  } = deps

  return {
    list,
    read,
    create,
    update,
    remove,
  }

  async function list(req) {
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

      ownerId,
      targetId,
      assetIds,
      transactionId,

      label,
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
      authorId: ownerId,
      targetId,
      label,

      _useOffsetPagination: req._useOffsetPagination,
    }

    const data = {}

    if (assetIds) {
      data.assetIds = assetIds
    }
    if (transactionId) {
      data.transactionId = transactionId
    }

    if (!_.isEmpty(data)) {
      documentParams.data = data
    }

    const paginationResult = await documentRequester.communicate(req)(
      documentParams,
    )

    const currentUserId = getCurrentUserId(req)

    paginationResult.results = paginationResult.results.map((doc) => {
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

  async function read(req) {
    let linkId = req.linkId
    let ownerId
    if (linkId.startsWith('usr_')) {
      const [_ownerId, _linkId] = linkId.split(':')
      linkId = _linkId
      ownerId = _ownerId
    }

    const doc = await documentRequester
      .communicate(req)({
        type: 'read',
        documentId: linkId,
        authorId: ownerId,
      })
      .catch(handleRemoteNotFoundError)
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

  async function create(req) {
    const platformId = req.platformId
    const env = req.env

    const fields = [
      'linkType',
      'slug',
      'content',
      'destination',
      'ownerId',
      'name',
      'metadata',
      'platformData',
    ]

    const payload = _.pick(req, fields)

    const createAttrs = Object.assign({}, payload)

    const currentUserId = getCurrentUserId(req)

    // cannot create as another user
    if (
      !req._matchedPermissions['link:create:all'] &&
      createAttrs.ownerId &&
      createAttrs.ownerId !== currentUserId
    ) {
      throw createError(403)
    }

    // if the link is for an asset, create the asset here

    // automatically set the current user as owner if there is no specified owner
    if (!createAttrs.ownerId && currentUserId) {
      createAttrs.ownerId = currentUserId
    }

    const isSelf = currentUserId && currentUserId === createAttrs.ownerId
    if (!req._matchedPermissions['link:create:all'] && !isSelf) {
      throw createError(403)
    }

    // @todo check slug

    let asset
    switch (createAttrs.linkType) {
      case 'asset':
        asset = await assetRequester.communicate(req)({
          ...req.asset,
          ownerId: createAttrs.ownerId,
          validated: false,
          type: 'create',
          _matchedPermissions: {
            'asset:create:all': true,
          },
        })

        createAttrs.assetIds = [asset.id]

        break
      case 'embed':
        break
      case 'link-list':
        break
      case 'content':
        break

      case 'redirect':
        break
    }

    const docCreateAttrs = Link.convertLinkToDoc(createAttrs)

    docCreateAttrs.documentId = await getObjectId({
      prefix: Link.idPrefix,
      platformId,
      env,
    })
    docCreateAttrs.documentType = 'link'

    const docCreateParams = Object.assign({}, docCreateAttrs, {
      type: 'create',
    })

    const document = await documentRequester.communicate(req)(docCreateParams)
    const link = Link.convertDocToLink(document)

    if (createAttrs.linkType === 'asset' && createAttrs.assetIds) {
      /* await assetRequester.communicate(req)({
        type: 'update',
        platformData: {
          linkId: link.id,
        },
        assetIds: createAttrs.assetIds,
      })*/
    }

    return Link.expose(link, { req })
  }

  async function update(req) {
    const linkId = req.linkId

    const fields = ['content', 'metadata', 'assetIds', 'platformData']

    const payload = _.pick(req, fields)

    const doc = await documentRequester
      .communicate(req)({
        type: 'read',
        documentId: linkId,
      })
      .catch(handleRemoteNotFoundError)
    if (!doc || doc.type !== 'link') {
      throw createError(404)
    }

    const link = Link.convertDocToLink(doc)

    const currentUserId = getCurrentUserId(req)

    const isSelf = link.ownerId && link.authorId !== currentUserId

    console.log({ isSelf, a: req._matchedPermissions['link:edit:all'] })
    if (!req._matchedPermissions['link:edit:all'] && !isSelf) {
      throw createError(403)
    }

    const updateAttrs = payload

    const docUpdateAttrs = Link.convertLinkToDoc(updateAttrs)

    const docUpdateParams = Object.assign({}, docUpdateAttrs, {
      type: 'update',
      documentId: linkId,
    })

    const document = await documentRequester.communicate(req)(docUpdateParams)
    const newLink = Link.convertDocToLink(document)

    return Link.expose(newLink, { req })
  }

  async function remove(req) {
    const linkId = req.linkId

    const doc = await documentRequester
      .communicate(req)({
        type: 'read',
        documentId: linkId,
      })
      .catch(handleRemoteNotFoundError)
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
      documentId: linkId,
    })

    return { id: linkId }
  }
}
