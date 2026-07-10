import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from '../../components/common/PrivateRoute'

// Helper: renders PrivateRoute in a testable Router structure
const renderPrivateRoute = (condition) =>
  render(
    <MemoryRouter initialEntries={['/suojattu']}>
      <Routes>
        <Route element={<PrivateRoute condition={condition} redirectPath='/login' />}>
          <Route path='/suojattu' element={<div>Suojattu sivu</div>} />
        </Route>
        <Route path='/login' element={<div>Login-sivu</div>} />
      </Routes>
    </MemoryRouter>,
  )

describe('PrivateRoute', () => {
  test('shows protected page when condition is true', () => {
    renderPrivateRoute(true)
    expect(screen.getByText('Suojattu sivu')).toBeInTheDocument()
  })

  test('does not show protected page when condition is false', () => {
    renderPrivateRoute(false)
    expect(screen.queryByText('Suojattu sivu')).not.toBeInTheDocument()
  })

  test('redirects to login page when condition is false', () => {
    renderPrivateRoute(false)
    expect(screen.getByText('Login-sivu')).toBeInTheDocument()
  })
})
