import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import ArtistList from '../../components/artist/ArtistList'

const mockArtists = [
  { id: '1', name: 'Maija Maalari', artworks: [{}, {}] },
  { id: '2', name: 'Pekka Piirtäjä', artworks: [{}] },
]

const server = setupServer(
  rest.get('*/api/users/artists', (req, res, ctx) => res(ctx.json(mockArtists))),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const renderArtistList = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <ArtistList />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('ArtistList', () => {
  test('shows loading state initially', () => {
    renderArtistList()
    expect(screen.getByText('Ladataan...')).toBeInTheDocument()
  })

  test('renders list of artists after loading', async () => {
    renderArtistList()
    await waitFor(() => screen.getByText('Maija Maalari'))
    expect(screen.getByText('Maija Maalari')).toBeInTheDocument()
    expect(screen.getByText('Pekka Piirtäjä')).toBeInTheDocument()
  })

  test('shows Artists heading', async () => {
    renderArtistList()
    await waitFor(() => screen.getByText('Artists'))
    expect(screen.getByText('Artists')).toBeInTheDocument()
  })

  test('shows empty table when no artists', async () => {
    server.use(
      rest.get('*/api/users/artists', (req, res, ctx) => res(ctx.json([]))),
    )
    renderArtistList()
    await waitFor(() => screen.getByText('Artists'))
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  test('shows error message when API returns a non-array error response', async () => {
    server.use(
      rest.get('*/api/users/artists', (req, res, ctx) =>
        res(ctx.json({ error: 'Unable to connect to server.' })),
      ),
    )
    renderArtistList()
    await waitFor(() =>
      screen.getByText('Unable to connect to server.'),
    )
    expect(screen.getByText('Unable to connect to server.')).toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  test('shows fallback error message when error response has no message', async () => {
    server.use(
      rest.get('*/api/users/artists', (req, res, ctx) => res(ctx.json({}))),
    )
    renderArtistList()
    await waitFor(() => screen.getByText('Could not load artists'))
    expect(screen.getByText('Could not load artists')).toBeInTheDocument()
  })
})
