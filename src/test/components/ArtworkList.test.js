import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import ArtworkList from '../../components/artwork/ArtworkList'
import loginReducer from '../../reducers/loginReducer'
import filterReducer from '../../reducers/filterReducer'
import artworkReducer from '../../reducers/artworkReducer'
import notificationReducer from '../../reducers/notificationReducer'

// jsdom does not implement IntersectionObserver
global.IntersectionObserver = class {
  observe() {}
  disconnect() {}
}

const mockArtworks = [
  { id: '1', name: 'Maisema', artist: 'Maija', likes: 5, year: '2020', size: '50x60', medium: 'Oil', galleryImage: null },
  { id: '2', name: 'Muotokuva', artist: 'Pekka', likes: 2, year: '2021', size: '40x50', medium: 'Acrylic', galleryImage: null },
]

const server = setupServer(
  rest.get('/api/artworks', (req, res, ctx) =>
    res(ctx.json({ artworks: mockArtworks, hasMore: false })),
  ),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const createTestStore = (role = null) =>
  createStore(
    combineReducers({
      loggedUser: loginReducer,
      filter: filterReducer,
      artworks: artworkReducer,
      notification: notificationReducer,
    }),
    { loggedUser: { loggedUser: role ? { id: '1', role } : null } },
    applyMiddleware(thunk),
  )

const renderArtworkList = (role = null) =>
  render(
    <Provider store={createTestStore(role)}>
      <MemoryRouter>
        <ArtworkList />
      </MemoryRouter>
    </Provider>,
  )

describe('ArtworkList — loading and render', () => {
  test('shows loading state initially', () => {
    renderArtworkList()
    expect(screen.getByText('Ladataan...')).toBeInTheDocument()
  })

  test('renders artworks after fetching', async () => {
    renderArtworkList()
    await waitFor(() => screen.getByText('Maisema'))
    expect(screen.getByText('Maisema')).toBeInTheDocument()
    expect(screen.getByText('Muotokuva')).toBeInTheDocument()
  })

  test('shows Gallery heading', async () => {
    renderArtworkList()
    await waitFor(() => screen.getByText('Gallery'))
    expect(screen.getByText('Gallery')).toBeInTheDocument()
  })

  test('shows error message when API fails', async () => {
    server.use(
      rest.get('/api/artworks', (req, res, ctx) => res(ctx.status(500))),
    )
    renderArtworkList()
    await waitFor(() =>
      expect(screen.queryByText('Ladataan...')).not.toBeInTheDocument(),
    )
    expect(screen.getByText('Unable to connect to server.')).toBeInTheDocument()
  })
})

describe('ArtworkList — search filter', () => {
  test('filter input is rendered', async () => {
    renderArtworkList()
    await waitFor(() => screen.getByPlaceholderText('Search artwork or artist'))
    expect(screen.getByPlaceholderText('Search artwork or artist')).toBeInTheDocument()
  })

  test('typing in filter hides non-matching artworks', async () => {
    renderArtworkList()
    await waitFor(() => screen.getByText('Maisema'))
    fireEvent.change(screen.getByPlaceholderText('Search artwork or artist'), {
      target: { value: 'Maisema' },
    })
    expect(screen.getByText('Maisema')).toBeInTheDocument()
    expect(screen.queryByText('Muotokuva')).not.toBeInTheDocument()
  })

  test('filter also matches by artist name', async () => {
    renderArtworkList()
    await waitFor(() => screen.getByText('Maisema'))
    fireEvent.change(screen.getByPlaceholderText('Search artwork or artist'), {
      target: { value: 'Pekka' },
    })
    expect(screen.getByText('Muotokuva')).toBeInTheDocument()
    expect(screen.queryByText('Maisema')).not.toBeInTheDocument()
  })
})

describe('ArtworkList — like button', () => {
  test('logged-in user sees like button', async () => {
    renderArtworkList('member')
    await waitFor(() => screen.getByText('Maisema'))
    expect(screen.getAllByRole('button', { name: /like/i }).length).toBeGreaterThan(0)
  })

  test('logged-out user does not see like button', async () => {
    renderArtworkList(null)
    await waitFor(() => screen.getByText('Maisema'))
    expect(screen.queryByRole('button', { name: /like/i })).not.toBeInTheDocument()
  })
})

describe('ArtworkList — admin delete', () => {
  test('admin sees delete button for each artwork', async () => {
    renderArtworkList('admin')
    await waitFor(() => screen.getByText('Maisema'))
    expect(screen.getAllByRole('button', { name: /delete/i })).toHaveLength(2)
  })

  test('member does not see delete buttons', async () => {
    renderArtworkList('member')
    await waitFor(() => screen.getByText('Maisema'))
    expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument()
  })
})