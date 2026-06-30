import userReducer from '../../reducers/userReducer'

const user1 = { id: '1', username: 'maija', role: 'member' }
const user2 = { id: '2', username: 'pekka', role: 'member' }

describe('userReducer — DELETE_USER', () => {
  test('poistaa oikean käyttäjän listalta', () => {
    const state = userReducer(
      { users: [user1, user2], singleUser: {}, loggedUser: {} },
      { type: 'DELETE_USER', data: { id: '1' } },
    )
    expect(state.users).toHaveLength(1)
    expect(state.users.find((u) => u.id === '1')).toBeUndefined()
  })

  test('jättää muut käyttäjät koskemattomiksi', () => {
    const state = userReducer(
      { users: [user1, user2], singleUser: {}, loggedUser: {} },
      { type: 'DELETE_USER', data: { id: '1' } },
    )
    expect(state.users[0]).toEqual(user2)
  })

  test('ei poista mitään jos id ei täsmää', () => {
    const state = userReducer(
      { users: [user1, user2], singleUser: {}, loggedUser: {} },
      { type: 'DELETE_USER', data: { id: '999' } },
    )
    expect(state.users).toHaveLength(2)
  })
})

describe('userReducer — UPDATE_ROLE', () => {
  test('päivittää oikean käyttäjän roolin', () => {
    const state = userReducer(
      { users: [user1, user2], singleUser: {}, loggedUser: {} },
      { type: 'UPDATE_ROLE', data: { id: '2', role: 'admin' } },
    )
    expect(state.users.find((u) => u.id === '2').role).toBe('admin')
  })

  test('ei muuta muiden käyttäjien roolia', () => {
    const state = userReducer(
      { users: [user1, user2], singleUser: {}, loggedUser: {} },
      { type: 'UPDATE_ROLE', data: { id: '2', role: 'admin' } },
    )
    expect(state.users.find((u) => u.id === '1').role).toBe('member')
  })

  test('palauttaa uuden arrayn eikä mutoi alkuperäistä', () => {
    const initial = { users: [user1, user2], singleUser: {}, loggedUser: {} }
    const state = userReducer(initial, {
      type: 'UPDATE_ROLE',
      data: { id: '1', role: 'admin' },
    })
    expect(state.users).not.toBe(initial.users)
  })
})
