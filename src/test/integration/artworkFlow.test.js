import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { server, mockArtworks } from './server'
import { initializeArtworks } from '../../reducers/actionCreators/artworkActions'
import artworkReducer from '../../reducers/artworkReducer'

const createTestStore = () =>
  createStore(
    combineReducers({ artworks: artworkReducer }),
    applyMiddleware(thunk),
  )

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Artwork-flow', () => {
  test('initializeArtworks loads artworks into store', async () => {
    const store = createTestStore()

    await store.dispatch(initializeArtworks())

    const { artworks } = store.getState().artworks
    expect(artworks).toHaveLength(mockArtworks.length)
  })

  test('loaded artworks contain correct names', async () => {
    const store = createTestStore()

    await store.dispatch(initializeArtworks())

    const { artworks } = store.getState().artworks
    expect(artworks[0].name).toBe('Maisema')
    expect(artworks[1].name).toBe('Muotokuva')
  })

  test('store is empty before loading', () => {
    const store = createTestStore()
    expect(store.getState().artworks.artworks).toHaveLength(0)
  })
})
