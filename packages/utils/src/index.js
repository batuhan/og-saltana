const authentication = require('./authentication')
const availability = require('./availability')
const currency = require('./currency')
const encoding = require('./encoding')
const list = require('./list')
const listQueryBuilder = require('./listQueryBuilder')
const locale = require('./locale')
const pagination = require('./pagination')
const pricing = require('./pricing')
const time = require('./time')
const transaction = require('./transaction')
const transition = require('./transition')
const user = require('./user')
const validation = require('./validation')
const merging = require('./merging')

const systemNamespaces = ['system', 'saltana']
const protectedNamespaces = ['private', 'protected']

module.exports = {
  authentication,
  availability,
  currency,
  encoding,
  list,
  listQueryBuilder,
  locale,
  pagination,
  pricing,
  time,
  transaction,
  transition,
  user,
  validation,
  merging,

  systemNamespaces,
  protectedNamespaces,
}
