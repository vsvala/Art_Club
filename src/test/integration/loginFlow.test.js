import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { server, mockUser } from './server'
import { login, logout } from '../../reducers/actionCreators/loginActions'
import loginReducer from '../../reducers/loginReducer'
import notificationReducer from '../../reducers/notificationReducer'

// Luo minimaalinen testi-store — vain tarvittavat reducerit
const createTestStore = () =>
  createStore(
    combineReducers({
      loggedUser: loginReducer,
      notification: notificationReducer,
    }),
    applyMiddleware(thunk),
  )

// Käynnistä mock-server ennen testejä, sammuta jälkeen
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Login-flow', () => {
  test('onnistunut login asettaa käyttäjän storeen', async () => {
    const store = createTestStore()

    await store.dispatch(login('testi', 'salasana'))

    const { loggedUser } = store.getState().loggedUser
    expect(loggedUser.username).toBe(mockUser.username)
    expect(loggedUser.token).toBe(mockUser.token)
    expect(loggedUser.role).toBe('member')
  })

  test('onnistunut login tallentaa käyttäjän localStorageen', async () => {
    const store = createTestStore()

    await store.dispatch(login('testi', 'salasana'))

    const saved = JSON.parse(window.localStorage.getItem('loggedInUser'))
    expect(saved.username).toBe(mockUser.username)
    expect(saved.token).toBe(mockUser.token)
  })

  test('onnistunut login asettaa notifikaation', async () => {
    const store = createTestStore()

    await store.dispatch(login('testi', 'salasana'))

    expect(store.getState().notification).toBe('Logged in succesfully!')
  })
})

describe('Logout-flow', () => {
  test('logout poistaa käyttäjän storesta', async () => {
    const store = createTestStore()
    await store.dispatch(login('testi', 'salasana'))

    await store.dispatch(logout())

    expect(store.getState().loggedUser.loggedUser).toBeNull()
  })

  test('logout poistaa käyttäjän localStoragesta', async () => {
    const store = createTestStore()
    await store.dispatch(login('testi', 'salasana'))

    await store.dispatch(logout())

    expect(window.localStorage.getItem('loggedInUser')).toBeNull()
  })
})
