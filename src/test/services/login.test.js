import { setupServer } from 'msw/node'
import { rest } from 'msw'
import loginService from '../../services/login'

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const mockUser = { token: 'abc', username: 'maija', role: 'member', id: '1' }

describe('loginService.login — success', () => {
  test('returns user data on successful login', async () => {
    server.use(
      rest.post('*/api/login', (req, res, ctx) => res(ctx.json(mockUser))),
    )
    const result = await loginService.login({ username: 'maija', password: 'salasana' })
    expect(result.token).toBe('abc')
    expect(result.username).toBe('maija')
  })
})

describe('loginService.login — error handling', () => {
  test('returns specific error on 400 (missing credentials)', async () => {
    server.use(
      rest.post('*/api/login', (req, res, ctx) => res(ctx.status(400))),
    )
    const result = await loginService.login({ username: '', password: '' })
    expect(result).toEqual({ error: 'Username or password missing.' })
  })

  test('returns specific error on 401 (wrong credentials)', async () => {
    server.use(
      rest.post('*/api/login', (req, res, ctx) => res(ctx.status(401))),
    )
    const result = await loginService.login({ username: 'maija', password: 'wrong' })
    expect(result).toEqual({ error: 'Username or password is incorrect.' })
  })

  test('returns connection error on 500', async () => {
    server.use(
      rest.post('*/api/login', (req, res, ctx) => res(ctx.status(500))),
    )
    const result = await loginService.login({ username: 'maija', password: 'salasana' })
    expect(result).toEqual({ error: 'Unable to connect to server.' })
  })

  test('returns connection error when server is unreachable', async () => {
    server.use(
      rest.post('*/api/login', (req, res) => res.networkError('Failed to connect')),
    )
    const result = await loginService.login({ username: 'maija', password: 'salasana' })
    expect(result).toEqual({ error: 'Unable to connect to server.' })
  })
})
