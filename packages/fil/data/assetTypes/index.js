const defaults = {
  timeBased: false,
  infiniteStock: true,

  pricing: {
    ownerFeesPercent: 10,
    takerFeesPercent: 0,
  },
  active: true,
}

const assetTypes = [
  {
    ...defaults,
    name: 'Single Payment - Assets with Deliverables',
  },
  {
    ...defaults,
    name: 'Single Payment - Assets with Deliverables (Limited Availability)',
    timeBased: false,
    infiniteStock: true,
  },
  {
    ...defaults,
    name: 'Subscription - Generic',
    timeBased: true,
  },
  {
    ...defaults,
    name: 'Single Payment - Time-based Services',
    timeBased: true,
    timing: {
      timeUnit: 'm',
      maxDuration: { m: 360 },
      minDuration: { m: 15 },
    },
  },
  {
    ...defaults,
    name: 'Single Payment - Assets with Deliverables',
  },
]


module.exports = assetTypes
