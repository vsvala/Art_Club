import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { server, mockUser } from './server'
import { login, logout } from '../../reducers/actionCreators/loginActions'
import loginReducer from '../../reducers/loginReducer'
import notificationReducer from '../../reducers/notificationReducer'

// Create minimal test store — only required reducers
const createTestStore = () =>
  createStore(
    combineReducers({
      loggedUser: loginReducer,
      notification: notificationReducer,
    }),
    applyMiddleware(thunk),
  )

// Start mock server before tests, stop after
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Login-flow', () => {
  test('successful login sets user in store', async () => {
    const store = createTestStore()

    await store.dispatch(login('testi', 'salasana'))

    const { loggedUser } = store.getState().loggedUser
    expect(loggedUser.username).toBe(mockUser.username)
    expect(loggedUser.token).toBe(mockUser.token)
    expect(loggedUser.role).toBe('member')
  })

  test('successful login saves user to localStorage', async () => {
    const store = createTestStore()

    await store.dispatch(login('testi', 'salasana'))

    const saved = JSON.parse(window.localStorage.getItem('loggedInUser'))
    expect(saved.username).toBe(mockUser.username)
    expect(saved.token).toBe(mockUser.token)
  })

  test('successful login sets notification', async () => {
    const store = createTestStore()

    await store.dispatch(login('testi', 'salasana'))

    expect(store.getState().notification).toBe('Logged in succesfully!')
  })
})

describe('Logout-flow', () => {
  test('logout removes user from store', async () => {
    const store = createTestStore()
    await store.dispatch(login('testi', 'salasana'))

    await store.dispatch(logout())

    expect(store.getState().loggedUser.loggedUser).toBeNull()
  })

  test('logout removes user from localStorage', async () => {
    const store = createTestStore()
    await store.dispatch(login('testi', 'salasana'))

    await store.dispatch(logout())

    expect(window.localStorage.getItem('loggedInUser')).toBeNull()
  })
})
