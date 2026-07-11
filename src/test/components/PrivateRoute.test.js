import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import PrivateRoute from '../../components/common/PrivateRoute'

const makeStore = (authLoading = false) =>
  createStore(() => ({ loggedUser: { loggedUser: null, authLoading } }))

// Helper: renders PrivateRoute in a testable Router structure
const renderPrivateRoute = (condition, authLoading = false) =>
  render(
    <Provider store={makeStore(authLoading)}>
      <MemoryRouter initialEntries={['/suojattu']}>
        <Routes>
          <Route element={<PrivateRoute condition={condition} redirectPath='/login' />}>
            <Route path='/suojattu' element={<div>Suojattu sivu</div>} />
          </Route>
          <Route path='/login' element={<div>Login-sivu</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>,
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

  test('renders nothing while auth is loading', () => {
    renderPrivateRoute(false, true)
    expect(screen.queryByText('Suojattu sivu')).not.toBeInTheDocument()
    expect(screen.queryByText('Login-sivu')).not.toBeInTheDocument()
  })
})
