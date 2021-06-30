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

      authorId,
      targetId,
      assetId,
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

    const paginationResult = await documentRequester.communicate(req)(
      documentParams
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
    const linkId = req.linkId

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
      'label',
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

    switch (createAttrs.linkType) {
      case 'asset':
        const createAsset = async ({
          name,
          description,
          categoryId,
          active,
          assetTypeId,
          quantity,
          price,
        }) => {
          if (!createAttrs.assetId) return

          const asset = await assetRequester
            .communicate(req)({
              type: 'read',
              assetId: createAttrs.assetId,
              _matchedPermissions: {
                'asset:read:all': true,
              },
            })
            .catch(handleRemoteNotFoundError)

          if (!asset) {
            throw createError(
              422,
              `Asset ID ${createAttrs.assetId} doesn't exist`
            )
          }

          return asset
        }

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

    return Link.expose(link, { req })
  }

  async function update(req) {
    const linkId = req.linkId

    const fields = ['score', 'comment', 'metadata', 'platformData']

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

    const isSelf = link.authorId && link.authorId !== currentUserId
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
