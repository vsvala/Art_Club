import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import ArtworkDelete from '../../components/artwork/ArtworkDelete'
import artworkReducer from '../../reducers/artworkReducer'
import notificationReducer from '../../reducers/notificationReducer'

const mockArtwork = {
  id: '1',
  name: 'Maisema',
  artist: 'Maija Maalari',
  year: '2020',
  size: '50x60 cm',
  medium: 'Oil',
  galleryImage: null,
}

const server = setupServer(
  rest.delete('/api/artworks/:id', (req, res, ctx) => res(ctx.json({ id: req.params.id }))),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const createTestStore = () =>
  createStore(
    combineReducers({ artworks: artworkReducer, notification: notificationReducer }),
    applyMiddleware(thunk),
  )

const renderArtworkDelete = (artwork = mockArtwork) =>
  render(
    <Provider store={createTestStore()}>
      <MemoryRouter>
        <ArtworkDelete artwork={artwork} />
      </MemoryRouter>
    </Provider>,
  )

describe('ArtworkDelete', () => {
  test('renders artwork name and artist', () => {
    renderArtworkDelete()
    expect(screen.getByText('Maisema')).toBeInTheDocument()
    expect(screen.getByText(/Maija Maalari/)).toBeInTheDocument()
  })

  test('renders artwork metadata', () => {
    renderArtworkDelete()
    expect(screen.getByText(/2020/)).toBeInTheDocument()
    expect(screen.getByText(/Oil/)).toBeInTheDocument()
  })

  test('shows delete button', () => {
    renderArtworkDelete()
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
  })

  test('asks for confirmation before deleting', () => {
    window.confirm = jest.fn(() => false)
    renderArtworkDelete()
    fireEvent.click(screen.getByRole('button', { name: /delete/i }))
    expect(window.confirm).toHaveBeenCalledWith('Do you want to delete this artwork?')
  })

  test('does not delete when user cancels confirmation', () => {
    window.confirm = jest.fn(() => false)
    const store = createTestStore()
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ArtworkDelete artwork={mockArtwork} />
        </MemoryRouter>
      </Provider>,
    )
    fireEvent.click(screen.getByRole('button', { name: /delete/i }))
    expect(store.getState().artworks.artworks).toHaveLength(0)
  })
})