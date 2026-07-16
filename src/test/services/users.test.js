import { setupServer } from 'msw/node'
import { rest } from 'msw'
import usersService from '../../services/users'

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// ── updatePassword — client-side validation (no HTTP mock needed) ──────────

describe('usersService.updatePassword — client-side validation', () => {
  test('rejects password shorter than 8 characters', async () => {
    const result = await usersService.updatePassword({
      oldPassword: 'vanha123',
      newPassword: 'lyhyt',
      confirm: 'lyhyt',
    })
    expect(result).toEqual({ error: 'Password needs to be at least 8 characters long' })
  })

  test('rejects when new password and confirmation do not match', async () => {
    const result = await usersService.updatePassword({
      oldPassword: 'vanha123',
      newPassword: 'uusisalasana',
      confirm: 'eriSalasana',
    })
    expect(result).toEqual({ error: 'Make sure the new password and the confirmation match' })
  })

  test('length check runs before match check', async () => {
    const result = await usersService.updatePassword({
      oldPassword: 'vanha123',
      newPassword: 'lyhyt',
      confirm: 'eriSalasana',
    })
    expect(result.error).toMatch(/8 characters/)
  })
})

describe('usersService.updatePassword — server errors', () => {
  test('returns error when old password is wrong (server rejects)', async () => {
    server.use(
      rest.put('*/api/users/password', (req, res, ctx) => res(ctx.status(401))),
    )
    const result = await usersService.updatePassword({
      oldPassword: 'vaara',
      newPassword: 'uusisalasana1',
      confirm: 'uusisalasana1',
    })
    expect(result).toEqual({ error: 'Old password is incorrect!' })
  })
})

// ── create — HTTP error branches ───────────────────────────────────────────

describe('usersService.create — error handling', () => {
  test('returns specific error on 400 (duplicate username)', async () => {
    server.use(
      rest.post('*/api/users', (req, res, ctx) => res(ctx.status(400))),
    )
    const result = await usersService.create({ username: 'maija', password: 'salasana1' })
    expect(result).toEqual({ error: 'Username must be unique!' })
  })

  test('returns connection error on 500', async () => {
    server.use(
      rest.post('*/api/users', (req, res, ctx) => res(ctx.status(500))),
    )
    const result = await usersService.create({ username: 'maija', password: 'salasana1' })
    expect(result).toEqual({ error: 'Unable to connect to server.' })
  })
})
