import artworkReducer from '../../reducers/artworkReducer'

const artwork1 = { id: '1', name: 'Teos 1', likes: 0 }
const artwork2 = { id: '2', name: 'Teos 2', likes: 5 }

describe('artworkReducer', () => {
  test('returns initial state', () => {
    const state = artworkReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual({ artworks: [] })
  })

  test('INIT_ARTWORKS loads artworks', () => {
    const state = artworkReducer(undefined, {
      type: 'INIT_ARTWORKS',
      data: [artwork1, artwork2],
    })
    expect(state.artworks).toHaveLength(2)
  })

  test('VOTE increments artwork likes', () => {
    const initial = { artworks: [artwork1, artwork2] }
    const state = artworkReducer(initial, { type: 'VOTE', id: '2' })
    const voted = state.artworks.find((a) => a.id === '2')
    expect(voted.likes).toBe(6)
  })

  test('DELETE_ARTWORK removes artwork', () => {
    const initial = { artworks: [artwork1, artwork2] }
    const state = artworkReducer(initial, {
      type: 'DELETE_ARTWORK',
      data: { id: '1' },
    })
    expect(state.artworks).toHaveLength(1)
    expect(state.artworks.find((a) => a.id === '1')).toBeUndefined()
  })
})
