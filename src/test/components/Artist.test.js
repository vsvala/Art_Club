import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Artist from '../../components/artist/Artist'

const mockUser = { id: '1', name: 'Maija Maalari', artworks: [{}, {}] }

const renderArtist = (user = mockUser) =>
  render(
    <MemoryRouter>
      <table>
        <tbody>
          <Artist user={user} />
        </tbody>
      </table>
    </MemoryRouter>,
  )

describe('Artist', () => {
  test('renders artist name', () => {
    renderArtist()
    expect(screen.getByText('Maija Maalari')).toBeInTheDocument()
  })

  test('renders artwork count', () => {
    renderArtist()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  test('links to artist profile page', () => {
    renderArtist()
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/artists/1')
  })

  test('shows 0 when artist has no artworks', () => {
    renderArtist({ id: '2', name: 'Pekka', artworks: [] })
    expect(screen.getByText('0')).toBeInTheDocument()
  })
})