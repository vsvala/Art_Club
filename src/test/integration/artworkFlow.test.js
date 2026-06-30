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
  test('initializeArtworks lataa teokset storeen', async () => {
    const store = createTestStore()

    await store.dispatch(initializeArtworks())

    const { artworks } = store.getState().artworks
    expect(artworks).toHaveLength(mockArtworks.length)
  })

  test('ladatut teokset sisältävät oikeat nimet', async () => {
    const store = createTestStore()

    await store.dispatch(initializeArtworks())

    const { artworks } = store.getState().artworks
    expect(artworks[0].name).toBe('Maisema')
    expect(artworks[1].name).toBe('Muotokuva')
  })

  test('ennen latausta store on tyhjä', () => {
    const store = createTestStore()
    expect(store.getState().artworks.artworks).toHaveLength(0)
  })
})
