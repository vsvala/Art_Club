import loginReducer from '../../reducers/loginReducer'

const testUser = { username: 'testi', role: 'member', id: '1' }

describe('loginReducer', () => {
  test('LOGIN asettaa kirjautuneen käyttäjän', () => {
    const state = loginReducer(undefined, { type: 'LOGIN', data: testUser })
    expect(state.loggedUser).toEqual(testUser)
  })

  test('LOGOUT poistaa kirjautuneen käyttäjän', () => {
    const loggedIn = { loggedUser: testUser, singleUser: {} }
    const state = loginReducer(loggedIn, { type: 'LOGOUT' })
    expect(state.loggedUser).toBeNull()
  })

  test('LOGOUT ei poista muuta statea', () => {
    const loggedIn = { loggedUser: testUser, singleUser: { id: '99' } }
    const state = loginReducer(loggedIn, { type: 'LOGOUT' })
    expect(state.singleUser).toEqual({ id: '99' })
  })
})
