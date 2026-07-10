import userReducer from '../../reducers/userReducer'

const user1 = { id: '1', username: 'maija', role: 'member' }
const user2 = { id: '2', username: 'pekka', role: 'member' }

describe('userReducer — DELETE_USER', () => {
  test('removes the correct user from the list', () => {
    const state = userReducer(
      { users: [user1, user2], singleUser: {}, loggedUser: {} },
      { type: 'DELETE_USER', data: { id: '1' } },
    )
    expect(state.users).toHaveLength(1)
    expect(state.users.find((u) => u.id === '1')).toBeUndefined()
  })

  test('leaves other users untouched', () => {
    const state = userReducer(
      { users: [user1, user2], singleUser: {}, loggedUser: {} },
      { type: 'DELETE_USER', data: { id: '1' } },
    )
    expect(state.users[0]).toEqual(user2)
  })

  test('does not remove anything if id does not match', () => {
    const state = userReducer(
      { users: [user1, user2], singleUser: {}, loggedUser: {} },
      { type: 'DELETE_USER', data: { id: '999' } },
    )
    expect(state.users).toHaveLength(2)
  })
})

describe('userReducer — UPDATE_ROLE', () => {
  test('updates the correct user role', () => {
    const state = userReducer(
      { users: [user1, user2], singleUser: {}, loggedUser: {} },
      { type: 'UPDATE_ROLE', data: { id: '2', role: 'admin' } },
    )
    expect(state.users.find((u) => u.id === '2').role).toBe('admin')
  })

  test('does not change other users roles', () => {
    const state = userReducer(
      { users: [user1, user2], singleUser: {}, loggedUser: {} },
      { type: 'UPDATE_ROLE', data: { id: '2', role: 'admin' } },
    )
    expect(state.users.find((u) => u.id === '1').role).toBe('member')
  })

  test('returns a new array and does not mutate the original', () => {
    const initial = { users: [user1, user2], singleUser: {}, loggedUser: {} }
    const state = userReducer(initial, {
      type: 'UPDATE_ROLE',
      data: { id: '1', role: 'admin' },
    })
    expect(state.users).not.toBe(initial.users)
  })
})
