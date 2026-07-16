import { setupServer } from 'msw/node'
import { rest } from 'msw'
import artworksService from '../../services/artworks'

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const mockArtworks = [
  { id: '1', name: 'Maisema', likes: 3 },
  { id: '2', name: 'Muotokuva', likes: 7 },
]

// ── getAll ─────────────────────────────────────────────────────────────────

describe('artworksService.getAll', () => {
  test('returns artworks on success', async () => {
    server.use(
      rest.get('/api/artworks', (req, res, ctx) => res(ctx.json(mockArtworks))),
    )
    const result = await artworksService.getAll()
    expect(result).toHaveLength(2)
    expect(result[0].name).toBe('Maisema')
  })

  test('returns connection error on 500', async () => {
    server.use(
      rest.get('/api/artworks', (req, res, ctx) => res(ctx.status(500))),
    )
    const result = await artworksService.getAll()
    expect(result).toEqual({ error: 'Unable to connect to server.' })
  })

  test('returns fallback error on 404', async () => {
    server.use(
      rest.get('/api/artworks', (req, res, ctx) => res(ctx.status(404))),
    )
    const result = await artworksService.getAll()
    expect(result).toEqual({ error: 'Could not get artworks from db' })
  })
})

// ── create — specific error branches ──────────────────────────────────────

describe('artworksService.create — error handling', () => {
  test('returns specific error on 400 (missing artwork data)', async () => {
    server.use(
      rest.post('/api/artworks', (req, res, ctx) => res(ctx.status(400))),
    )
    const result = await artworksService.create({})
    expect(result).toEqual({ error: 'artwork missing.' })
  })

  test('returns specific error on 401 (unauthorized)', async () => {
    server.use(
      rest.post('/api/artworks', (req, res, ctx) => res(ctx.status(401))),
    )
    const result = await artworksService.create({ name: 'Teos' })
    expect(result).toEqual({ error: 'Username or password is incorrect.' })
  })

  test('returns connection error on 500', async () => {
    server.use(
      rest.post('/api/artworks', (req, res, ctx) => res(ctx.status(500))),
    )
    const result = await artworksService.create({ name: 'Teos' })
    expect(result).toEqual({ error: 'Unable to connect to server.' })
  })
})

// ── deleteArtwork ──────────────────────────────────────────────────────────

describe('artworksService.deleteArtwork — error handling', () => {
  test('returns error with artwork id when not found', async () => {
    server.use(
      rest.delete('/api/artworks/:id', (req, res, ctx) => res(ctx.status(404))),
    )
    const result = await artworksService.deleteArtwork('999')
    expect(result).toEqual({ error: 'Artwork with id "999" not found!' })
  })
})
