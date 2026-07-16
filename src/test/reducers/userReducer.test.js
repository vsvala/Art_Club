import userReducer from '../../reducers/userReducer'

const artwork1 = { id: 'a1', name: 'Teos 1' }
const artwork2 = { id: 'a2', name: 'Teos 2' }
const user1 = { id: '1', username: 'maija', role: 'member', artworks: [artwork1] }
const user2 = { id: '2', username: 'pekka', role: 'member', artworks: [artwork2] }

describe('userReducer — initial state', () => {
  test('returns initial state when called with undefined', () => {
    const state = userReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual({ users: [], singleUser: {}, loggedUser: {} })
  })
})

describe('userReducer — CREATE_USER', () => {
  test('adds a new user to the list', () => {
    const newUser = { id: '3', username: 'liisa', role: 'member' }
    const state = userReducer(
      { users: [user1], singleUser: {}, loggedUser: {} },
      { type: 'CREATE_USER', data: newUser },
    )
    expect(state.users).toHaveLength(2)
    expect(state.users.find((u) => u.id === '3')).toEqual(newUser)
  })
})

describe('userReducer — GET_USERS', () => {
  test('replaces users list with fetched data', () => {
    const state = userReducer(
      { users: [], singleUser: {}, loggedUser: {} },
      { type: 'GET_USERS', data: [user1, user2] },
    )
    expect(state.users).toHaveLength(2)
  })
})

describe('userReducer — GET_ARTISTS', () => {
  test('replaces users list with artist data', () => {
    const state = userReducer(
      { users: [], singleUser: {}, loggedUser: {} },
      { type: 'GET_ARTISTS', data: [user1] },
    )
    expect(state.users).toHaveLength(1)
    expect(state.users[0].username).toBe('maija')
  })
})

describe('userReducer — UPDATE_USER', () => {
  test('updates loggedUser and singleUser', () => {
    const updated = { id: '1', username: 'maija-updated', role: 'admin' }
    const state = userReducer(
      { users: [user1], singleUser: user1, loggedUser: user1 },
      { type: 'UPDATE_USER', data: updated },
    )
    expect(state.loggedUser.username).toBe('maija-updated')
    expect(state.singleUser.username).toBe('maija-updated')
  })
})

describe('userReducer — INIT_SINGLE_USER', () => {
  test('sets singleUser', () => {
    const state = userReducer(
      { users: [], singleUser: {}, loggedUser: {} },
      { type: 'INIT_SINGLE_USER', data: user2 },
    )
    expect(state.singleUser).toEqual(user2)
  })
})

describe('userReducer — DELETE_ARTWORK', () => {
  test('removes artwork from all users artworks array', () => {
    const state = userReducer(
      { users: [user1, user2], singleUser: user1, loggedUser: {} },
      { type: 'DELETE_ARTWORK', data: { id: 'a1' } },
    )
    expect(state.users.find((u) => u.id === '1').artworks).toHaveLength(0)
    expect(state.users.find((u) => u.id === '2').artworks).toHaveLength(1)
  })

  test('removes artwork from singleUser artworks', () => {
    const state = userReducer(
      { users: [user1], singleUser: { ...user1, artworks: [artwork1, artwork2] }, loggedUser: {} },
      { type: 'DELETE_ARTWORK', data: { id: 'a1' } },
    )
    expect(state.singleUser.artworks).toHaveLength(1)
    expect(state.singleUser.artworks[0].id).toBe('a2')
  })

  test('handles user with no artworks array gracefully', () => {
    const userNoArtworks = { id: '3', username: 'testi' }
    const state = userReducer(
      { users: [userNoArtworks], singleUser: {}, loggedUser: {} },
      { type: 'DELETE_ARTWORK', data: { id: 'a1' } },
    )
    expect(state.users[0].artworks).toBeUndefined()
  })
})

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
