import Resource from '../Resource'

export default class Links extends Resource {}

Resource.addBasicMethods(Links, {
  path: '/links',
  includeBasic: ['list', 'read', 'create', 'update', 'remove']
})
