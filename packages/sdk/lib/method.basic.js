export default function getBasicMethods (path, saltanaSdkMethod) {
  return {
    list: saltanaSdkMethod({
      path,
      method: 'GET',
      isList: true
    }),

    read: saltanaSdkMethod({
      path: `${path}/:id`,
      method: 'GET',
      urlParams: ['id']
    }),

    create: saltanaSdkMethod({
      path,
      method: 'POST'
    }),

    update: saltanaSdkMethod({
      path: `${path}/:id`,
      method: 'PATCH',
      urlParams: ['id']
    }),

    remove: saltanaSdkMethod({
      path: `${path}/:id`,
      method: 'DELETE',
      urlParams: ['id']
    })
  }
}
