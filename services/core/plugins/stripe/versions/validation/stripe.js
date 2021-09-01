module.exports = function createValidation(deps) {
  const {
    utils: {
      validation: { Joi },
    },
  } = deps

  const schemas = {}

  // ////////// //
  // 2019-05-20 //
  // ////////// //
  schemas['2019-05-20'] = {}

  schemas['2019-05-20'].processPaymentIntent = {
    body: Joi.object().keys({
      paymentIntentId: Joi.string().required(),
      email: Joi.string().optional(),
      assets: Joi.array().items(
        Joi.object().keys({
          id: Joi.string().required(),
          quantity: Joi.number().optional(),
        }),
      ),
    }),
  }
  schemas['2019-05-20'].request = {
    body: Joi.object().keys({
      method: Joi.string().required(),
      args: Joi.array().items().single(),
    }),
  }
  schemas['2019-05-20'].webhook = null

  const validationVersions = {
    '2019-05-20': [
      {
        target: 'stripe.pluginRequest',
        schema: schemas['2019-05-20'].request,
      },
      {
        target: 'stripe.processPaymentIntent',
        schema: schemas['2019-05-20'].processPaymentIntent,
      },
      {
        target: 'stripe.webhooks',
        schema: schemas['2019-05-20'].webhook,
      },
    ],
  }

  return validationVersions
}
