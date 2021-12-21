const config = require('config').get('ExternalServices')

const Stripe = require('stripe')

const stripe = Stripe(config.get('stripe.secretKey'))

// user configuration id bpc_1JubGhCzDOw5R4whIMBj5eYd
// provider configuration id bpc_1JubGhCzDOw5R4wh8PYiArdx
const defaults = {
  features: {
    customer_update: {
      allowed_updates: ['address', 'tax_id'],
      enabled: true,
    },
    invoice_history: { enabled: true },
    payment_method_update: { enabled: true },
  },
  default_return_url: 'https://saltana.com/my/setiings',
  business_profile: {
    privacy_policy_url: 'https://saltana.com/privacy',
    terms_of_service_url: 'https://saltana.com/terms',
  },
}

const userConfiguration = {
  ...defaults,
  features: {
    ...defaults.features,
  },
}

const providerConfiguration = {
  ...defaults,
  features: {
    ...defaults.features,
    subscription_cancel: {
      cancellation_reason: {
        enabled: true,
        options: [
          'too_expensive',
          'missing_features',
          'unused',
          'customer_service',
          'too_complex',
          'low_quality',
          'other',
        ],
      },
      enabled: true,
      mode: 'at_period_end',
      proration_behavior: 'none',
    },
    subscription_pause: {
      enabled: true,
    },
    // @TODO: plans needs to be created
    // subscription_update: {
    //   default_allowed_updates: [],
    //   enabled: false,
    //   proration_behavior: 'none',
    // },
  },
}

async function main() {
  const [_userConfiguration, _providerConfiguration] = await Promise.all([
    stripe.billingPortal.configurations.create(userConfiguration),
    stripe.billingPortal.configurations.create(providerConfiguration),
  ])

  console.log(`user confiigration id ${_userConfiguration.id}`)
  console.log(`provider confiigration id ${_providerConfiguration.id}`)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
