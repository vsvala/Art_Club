import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import SingleArtwork from '../../components/artwork/SingleArtwork'

const mockArtwork = {
  id: '1',
  name: 'Maisema',
  artist: 'Maija Maalari',
  year: '2020',
  size: '50x60 cm',
  medium: 'Oil on canvas',
  galleryImage: null,
}

const server = setupServer(
  rest.get('/api/artworks/:id', (req, res, ctx) => res(ctx.json(mockArtwork))),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const renderSingleArtwork = (id = '1') => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[`/artworks/${id}`]}>
        <Routes>
          <Route path="/artworks/:id" element={<SingleArtwork />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('SingleArtwork', () => {
  test('shows loading state initially', () => {
    renderSingleArtwork()
    expect(screen.getByText('Ladataan...')).toBeInTheDocument()
  })

  test('renders artwork name and artist after loading', async () => {
    renderSingleArtwork()
    await waitFor(() => screen.getByText(/Maisema/))
    expect(screen.getByText(/Maisema/)).toBeInTheDocument()
    expect(screen.getByText(/Maija Maalari/)).toBeInTheDocument()
  })

  test('renders artwork metadata', async () => {
    renderSingleArtwork()
    await waitFor(() => screen.getByText(/Oil on canvas/))
    expect(screen.getByText(/2020/)).toBeInTheDocument()
    expect(screen.getByText(/50x60 cm/)).toBeInTheDocument()
  })

  test('does not show artwork name when not found', async () => {
    server.use(
      rest.get('/api/artworks/:id', (req, res, ctx) => res(ctx.status(404))),
    )
    renderSingleArtwork('999')
    await waitFor(() => expect(screen.queryByText('Ladataan...')).not.toBeInTheDocument())
    expect(screen.queryByText('Maisema')).not.toBeInTheDocument()
  })
})
