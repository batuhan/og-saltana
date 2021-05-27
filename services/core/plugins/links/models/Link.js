module.exports = (Base) => class Link extends Base {
  static get idPrefix () {
    return 'lnk'
  }

  static getAccessFields (access) {
    const accessFields = {
      api: [
        'id',
        'createdDate',
        'updatedDate',
        'slug',
        'linkType',
        'redirectTo',
        'pageContent',
        'targetId',
        'assetId',
        'transactionId',
        'label',
        'metadata',
        'platformData',

        'livemode' // added in the expose function
      ]
    }

    return accessFields[access]
  }

  static isSelf (link, userId) {
    const selfUsersIds = []

    if (link.authorId) {
      selfUsersIds.push(link.authorId)
    }
    if (link.targetId) {
      selfUsersIds.push(link.targetId)
    }

    return selfUsersIds.includes(userId)
  }

  static convertLinkToDoc (link, { withModelMeta = false } = {}) {
    const doc = {
      authorId: link.authorId,
      targetId: link.targetId,
      type: 'link',
      label: link.label,
      data: {
        slug: link.slug,
        linkType: link.linkType,
        transactionId: link.transactionId
      },
      metadata: link.metadata,
      platformData: link.platformData
    }

    switch (link.type) {
      case 'redirect-301':
      case 'redirect-302':
        doc.data.redirectTo = link.redirectTo
        break
      case 'page':
        doc.data.pageContent = link.pageContent
        break
      case 'asset':
        doc.data.assetId = link.assetId
        break
      default:
        break
    }

    if (withModelMeta) {
      doc.id = link.id
      doc.createdDate = link.createdDate
      doc.updatedDate = link.updatedDate
    }

    return doc
  }

  static convertDocToLink (doc) {
    return {
      id: doc.id,
      createdDate: doc.createdDate,
      updatedDate: doc.updatedDate,
      slug: doc.slug,
      authorId: setNullIfUndefined(doc.authorId),
      targetId: setNullIfUndefined(doc.targetId),
      label: setNullIfUndefined(doc.label),
      linkType: setNullIfUndefined(doc.data.linkType),
      redirectTo: setNullIfUndefined(doc.data.redirectTo),
      pageContent: setNullIfUndefined(doc.data.pageContent),
      assetId: setNullIfUndefined(doc.data.assetId),
      transactionId: setNullIfUndefined(doc.data.transactionId),
      metadata: doc.metadata,
      platformData: doc.platformData
    }
  }
}

function setNullIfUndefined (value) {
  return typeof value === 'undefined' ? null : value
}
