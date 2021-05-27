import Resource from '../Resource'

const method = Resource.method

export default class Links extends Resource {}

Resource.addBasicMethods(Links, {
  path: '/links',
  includeBasic: ['list', 'read', 'create', 'update', 'remove']
})

Links.prototype.getStats = method({
  path: '/links/stats',
  method: 'GET',
  isList: true
})
