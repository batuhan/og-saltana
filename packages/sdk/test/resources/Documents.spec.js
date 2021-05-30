import test from 'blue-tape'

import { getSpyableSaltana } from '../../testUtils'

const saltana = getSpyableSaltana()

test('getStats: sends the correct request', (t) => {
  return saltana.documents.getStats({ orderBy: 'count', page: 2, nbResultsPerPage: 10, groupBy: 'authorId' })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/documents/stats',
        data: {},
        queryParams: { orderBy: 'count', page: 2, nbResultsPerPage: 10, groupBy: 'authorId' },
        headers: {}
      })
    })
})

test('list: sends the correct request', (t) => {
  return saltana.documents.list({ page: 2, nbResultsPerPage: 10 })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/documents',
        data: {},
        queryParams: { page: 2, nbResultsPerPage: 10 },
        headers: {}
      })
    })
})

test('read: sends the correct request', (t) => {
  return saltana.documents.read('document_1')
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/documents/document_1',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})

test('create: sends the correct request', (t) => {
  const data = {
    score: 80,
    targetId: 'user_2'
  }

  return saltana.documents.create(data)
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'POST',
        path: '/documents',
        data,
        queryParams: {},
        headers: {}
      })
    })
})

test('update: sends the correct request', (t) => {
  return saltana.documents.update('document_1', { score: 70 })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'PATCH',
        path: '/documents/document_1',
        data: { score: 70 },
        queryParams: {},
        headers: {}
      })
    })
})

test('remove: sends the correct request', (t) => {
  return saltana.documents.remove('document_1')
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'DELETE',
        path: '/documents/document_1',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})
