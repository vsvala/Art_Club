import loginReducer from '../../reducers/loginReducer'

const testUser = { username: 'testi', role: 'member', id: '1' }

describe('loginReducer', () => {
  test('LOGIN sets the logged in user', () => {
    const state = loginReducer(undefined, { type: 'LOGIN', data: testUser })
    expect(state.loggedUser).toEqual(testUser)
  })

  test('LOGOUT removes the logged in user', () => {
    const loggedIn = { loggedUser: testUser, singleUser: {} }
    const state = loginReducer(loggedIn, { type: 'LOGOUT' })
    expect(state.loggedUser).toBeNull()
  })

  test('LOGOUT does not remove other state', () => {
    const loggedIn = { loggedUser: testUser, singleUser: { id: '99' } }
    const state = loginReducer(loggedIn, { type: 'LOGOUT' })
    expect(state.singleUser).toEqual({ id: '99' })
  })
})
