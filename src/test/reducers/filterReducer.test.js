import filterReducer from '../../reducers/filterReducer'

describe('filterReducer — initial state', () => {
  test('returns initial state when called with undefined', () => {
    const state = filterReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual({ artworkName: '' })
  })
})

describe('filterReducer — SET_ARTWORK_NAME', () => {
  test('sets artwork name filter', () => {
    const state = filterReducer(
      { artworkName: '' },
      { type: 'SET_ARTWORK_NAME', data: 'Mona Lisa' },
    )
    expect(state.artworkName).toBe('Mona Lisa')
  })

  test('overwrites existing filter value', () => {
    const state = filterReducer(
      { artworkName: 'Starry Night' },
      { type: 'SET_ARTWORK_NAME', data: 'Mona Lisa' },
    )
    expect(state.artworkName).toBe('Mona Lisa')
  })
})

describe('filterReducer — INIT_FILTER', () => {
  test('resets filter to initial state', () => {
    const state = filterReducer(
      { artworkName: 'Mona Lisa' },
      { type: 'INIT_FILTER' },
    )
    expect(state).toEqual({ artworkName: '' })
  })
})