import {
  json,
  missing,
  error,
  status,
  withContent,
  withParams,
  ThrowableRouter,
} from 'itty-router-extras'

export async function handleRequest(request: Request): Promise<Response> {
	return new Response(`request method: ${ request.method }`)
}

const todos = [
  { id: '13', value: 'foo' },
  { id: '14', value: 'bar' },
  { id: '15', value: 'baz' },
]

// create an error-safe itty router
const router = ThrowableRouter({ base: '/checkout' })

// GET collection index
router.put('/intent', async (request) => {


})

// GET item
router.get('/:id', withParams, ({ id }) => {
  const todo = todos.find(t => t.id === Number(id))

  return todo
  ? json(todo)
  : missing('That todo was not found.')
})

// POST to the collection
router.post('/', withContent, ({ content }) =>
  content
  ? status(204) // send a 204 no-content response
  : error(400, 'You probably need some content for that...')
)

// 404 for everything else
router.all('*', () => missing('Are you sure about that?'))

// attach the router "handle" to the event handler
addEventListener('fetch', event =>
  event.respondWith(router.handle(event.request))
)
