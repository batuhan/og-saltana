const _ = require('lodash')
module.exports = (Base) =>
  class Link extends Base {
    static get idPrefix() {
      return 'lnk'
    }

    static getAccessFields(access) {
      const accessFields = {
        api: [
          'id',
          'ownerId', // resolves to authorId on the docs
          'slug',
          'linkType', // resolves to type
          'name',
          'destination', // resolves to data.destination
          'content', // resolves to data.pageContent
          'assetIds',

          // common elements
          'createdDate',
          'updatedDate',
          'metadata',
          'platformData',

          'livemode', // added in the expose function
        ],
      }

      return accessFields[access]
    }

    static generatePublicUrls(creator, link) {
      const publicUrl = `${link.destination}?lnk=${link.id}`
      const publicUrlWithSlug = `${link.destination}?lnk=${link.slug}`

      return {
        publicUrl,
        publicUrlWithSlug,
      }
    }

    static isSelf(link, userId) {
      const selfUsersIds = []

      if (link.ownerId) {
        selfUsersIds.push(link.ownerId)
      }

      if (link.authorId) {
        selfUsersIds.push(link.authorId)
      }

      return selfUsersIds.includes(userId)
    }

    static convertLinkToDoc(link, { withModelMeta = false } = {}) {
      const doc = {
        authorId: link.ownerId,
        // targetId: link.targetId,
        type: 'link',
        name: link.label,
        data: {
          ..._.pick(link, [
            'linkType',
            'destination',
            'content',
            'slug',
            'assetIds',
          ]),
        },
        metadata: link.metadata,
        platformData: link.platformData,
      }

      if (withModelMeta) {
        doc.id = link.id
        doc.createdDate = link.createdDate
        doc.updatedDate = link.updatedDate
      }

      return doc
    }

    static convertDocToLink(doc) {
      return {
        id: doc.id,
        createdDate: doc.createdDate,
        updatedDate: doc.updatedDate,
        slug: doc.data.slug,
        ownerId: setNullIfUndefined(doc.authorId),
        name: setNullIfUndefined(doc.label),
        linkType: setNullIfUndefined(doc.data.linkType),
        destination: setNullIfUndefined(doc.data.destination),
        content: setNullIfUndefined(doc.data.content),
        accessType: setNullIfUndefined(doc.data.accessType),
        assetIds: setNullIfUndefined(doc.data.assetIds),
        metadata: doc.metadata,
        platformData: doc.platformData,
      }
    }
  }

function setNullIfUndefined(value) {
  return typeof value === 'undefined' ? null : value
}
