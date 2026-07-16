import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NotFound from '../../components/common/NotFound'

const renderNotFound = () =>
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  )

describe('NotFound', () => {
  test('shows 404 heading', () => {
    renderNotFound()
    expect(screen.getByText('404')).toBeInTheDocument()
  })

  test('shows page not found message', () => {
    renderNotFound()
    expect(screen.getByText('Page not found')).toBeInTheDocument()
  })

  test('renders link back to home', () => {
    renderNotFound()
    const link = screen.getByRole('link', { name: /back to home/i })
    expect(link).toHaveAttribute('href', '/')
  })
})
