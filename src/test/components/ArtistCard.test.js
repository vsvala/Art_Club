import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ArtistCard from '../../components/artists/ArtistCard'

const mockUser = { id: '1', name: 'Maija Maalari', artworks: [{}, {}] }

const renderArtistCard = (user = mockUser) =>
  render(
    <MemoryRouter>
      <table>
        <tbody>
          <ArtistCard user={user} />
        </tbody>
      </table>
    </MemoryRouter>,
  )

describe('ArtistCard', () => {
  test('renders artist name', () => {
    renderArtistCard()
    expect(screen.getByText('Maija Maalari')).toBeInTheDocument()
  })

  test('renders artwork count', () => {
    renderArtistCard()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  test('links to artist profile page', () => {
    renderArtistCard()
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/artists/1')
  })

  test('shows 0 when artist has no artworks', () => {
    renderArtistCard({ id: '2', name: 'Pekka', artworks: [] })
    expect(screen.getByText('0')).toBeInTheDocument()
  })
})