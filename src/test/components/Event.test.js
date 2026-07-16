import React from 'react'
import { render, screen } from '@testing-library/react'
import Event from '../../components/event/Event'

const mockEvent = {
  id: '1',
  title: 'Kesänäyttely',
  start: '2026-08-01',
  end: '2026-08-15',
  place: 'Helsinki',
  description: 'Vuosittainen kesänäyttely',
  eventImage: 'img.jpg',
}

const renderEvent = (loggedUser = null) =>
  render(
    <table>
      <tbody>
        <tr>
          <Event e={mockEvent} loggedUser={loggedUser} removeEvent={() => () => {}} />
        </tr>
      </tbody>
    </table>,
  )

describe('Event', () => {
  test('renders event title', () => {
    renderEvent()
    expect(screen.getByText('Kesänäyttely')).toBeInTheDocument()
  })

  test('renders event place and dates', () => {
    renderEvent()
    expect(screen.getByText(/Helsinki/)).toBeInTheDocument()
    expect(screen.getByText(/2026-08-01/)).toBeInTheDocument()
  })

  test('admin sees delete button', () => {
    renderEvent({ role: 'admin' })
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
  })

  test('member does not see delete button', () => {
    renderEvent({ role: 'member' })
    expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument()
  })

  test('logged-out user does not see delete button', () => {
    renderEvent(null)
    expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument()
  })
})