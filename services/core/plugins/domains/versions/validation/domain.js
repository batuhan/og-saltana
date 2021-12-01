const { utils } = require('../../../serverTooling')
const {
  validation: { Joi, slugSchema },
} = utils

const groupSchema = Joi.string().valid(
  'authorId',
  'targetId',
  'assetId',
  'transactionId',
)

const labelSchema = Joi.string().regex(/^\w+(:\w+)*$/)
const labelWithWildcardSchema = Joi.string().regex(/^(\*|(\w+)(:(\w+|\*))*)$/)
const multipleLabelsWithWildcardSchema = Joi.string().regex(
  /^(\*|(\w+)(:(\w+|\*))*)(,(\*|(\w+)(:(\w+|\*))*))*$/,
)

const orderByFields = ['createdDate', 'updatedDate']

const destinationSchema = Joi.string().uri({
  scheme: ['http', 'https'],
  allowQuerySquareBrackets: true,
})

const linkTypeSchema = Joi.valid(
  'asset',
  'embed',
  'link-list',
  'content',
  'redirect',
)

module.exports = function createValidation(deps) {
  const {
    utils: {
      validation: { objectIdParamsSchema, replaceOffsetWithCursorPagination },
      pagination: { DEFAULT_NB_RESULTS_PER_PAGE },
    },
  } = deps

  const schemas = {}

  // ////////// //
  // 2021-07-15 //
  // ////////// //
  schemas['2021-07-15'] = {}
  schemas['2021-07-15'].list = () => ({
    query: replaceOffsetWithCursorPagination(
      Joi.object().keys({
        // order
        orderBy: Joi.string()
          .valid(...orderByFields)
          .default('createdDate'),
        order: Joi.string().valid('asc', 'desc').default('desc'),

        // pagination
        page: Joi.number().integer().min(1).default(1),
        nbResultsPerPage: Joi.number()
          .integer()
          .min(1)
          .max(100)
          .default(DEFAULT_NB_RESULTS_PER_PAGE),

        // filters
        id: [Joi.string(), Joi.array().unique().items(Joi.string())],
        ownerId: [Joi.string(), Joi.array().unique().items(Joi.string())],
        targetId: [Joi.string(), Joi.array().unique().items(Joi.string())],
        assetId: [Joi.string(), Joi.array().unique().items(Joi.string())],
        transactionId: [Joi.string(), Joi.array().unique().items(Joi.string())],
        label: [
          multipleLabelsWithWildcardSchema,
          Joi.array().unique().items(labelWithWildcardSchema),
        ],
      }),
    ),
  })
  schemas['2021-07-15'].triggerValidation = {
    params: objectIdParamsSchema,
  }
  schemas['2021-07-15'].read = {
    params: objectIdParamsSchema,
  }
  schemas['2021-07-15'].create = {
    body: Joi.object()
      .keys({
        name: Joi.string().max(255),
        ownerId: Joi.string(),
        slug: slugSchema,
        linkType: linkTypeSchema,
        destination: destinationSchema,
        assetId: Joi.string(),
        content: Joi.object().unknown(),
        metadata: Joi.object().unknown(),
        platformData: Joi.object().unknown(),
        asset: Joi.object().keys({
          description: Joi.string().max(3000).allow('', null),
          categoryId: Joi.string().allow(null),
          assetTypeId: Joi.string(),
          quantity: Joi.number().integer().min(0),
          price: Joi.number().min(0),
          currency: Joi.string(),
          customAttributes: Joi.object().unknown(),
        }),
      })
      .required(),
  }
  schemas['2021-07-15'].update = {
    params: objectIdParamsSchema,
    body: schemas['2021-07-15'].create.body.fork(
      ['linkType', 'assetId'],
      (schema) => schema.forbidden(),
    ),
    //.fork('score', (schema) => schema.optional()),
  }
  schemas['2021-07-15'].remove = {
    params: objectIdParamsSchema,
  }

  const validationVersions = {
    '2021-07-15': [
      {
        target: 'domain.list',
        schema: schemas['2021-07-15'].list,
      },
      {
        target: 'domain.read',
        schema: schemas['2021-07-15'].read,
      },
      {
        target: 'domain.create',
        schema: schemas['2021-07-15'].create,
      },
      {
        target: 'domain.update',
        schema: schemas['2021-07-15'].update,
      },
      {
        target: 'domain.remove',
        schema: schemas['2021-07-15'].remove,
      },
    ],
  }

  return validationVersions
}
