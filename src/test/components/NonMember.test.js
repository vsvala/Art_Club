import React from 'react'
import { render, screen } from '@testing-library/react'
import NonMember from '../../components/NonMember'

describe('NonMember', () => {
  test('shows Art club heading', () => {
    render(<NonMember />)
    expect(screen.getByText('Art club')).toBeInTheDocument()
  })

  test('shows membership pending message', () => {
    render(<NonMember />)
    expect(screen.getByText(/processed soon/i)).toBeInTheDocument()
  })

  test('mentions email notification', () => {
    render(<NonMember />)
    expect(screen.getByText(/notification by email/i)).toBeInTheDocument()
  })
})