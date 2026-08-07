import React from 'react'
import { render, screen } from '@testing-library/react'
import EventCard from '../../components/events/EventCard'

const mockEventCard = {
  id: '1',
  title: 'Kesänäyttely',
  start: '2026-08-01',
  end: '2026-08-15',
  place: 'Helsinki',
  description: 'Vuosittainen kesänäyttely',
  eventImage: 'img.jpg',
}

const renderEventCard = (loggedUser = null) =>
  render(
    <table>
      <tbody>
        <tr>
          <EventCard e={mockEventCard} loggedUser={loggedUser} removeEvent={() => () => {}} />
        </tr>
      </tbody>
    </table>,
  )

describe('EventCard', () => {
  test('renders event title', () => {
    renderEventCard()
    expect(screen.getByText('Kesänäyttely')).toBeInTheDocument()
  })

  test('renders event place and dates', () => {
    renderEventCard()
    expect(screen.getByText(/Helsinki/)).toBeInTheDocument()
    expect(screen.getByText(/2026-08-01/)).toBeInTheDocument()
  })

  test('admin sees delete button', () => {
    renderEventCard({ role: 'admin' })
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
  })

  test('member does not see delete button', () => {
    renderEventCard({ role: 'member' })
    expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument()
  })

  test('logged-out user does not see delete button', () => {
    renderEventCard(null)
    expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument()
  })
})