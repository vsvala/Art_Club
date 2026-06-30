import { setupServer } from 'msw/node'
import { rest } from 'msw'

const mockUser = {
  token: 'test-token-abc',
  username: 'testi',
  role: 'member',
  id: '1',
}

const mockArtworks = [
  { id: '1', name: 'Maisema', likes: 3 },
  { id: '2', name: 'Muotokuva', likes: 7 },
]

export const handlers = [
  rest.post('*/api/login', (req, res, ctx) => {
    return res(ctx.json(mockUser))
  }),

  rest.get('*/api/artworks', (req, res, ctx) => {
    return res(ctx.json(mockArtworks))
  }),
]

export const server = setupServer(...handlers)
export { mockUser, mockArtworks }
