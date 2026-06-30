import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from '../../components/common/PrivateRoute'

// Apufunktio: renderöi PrivateRoute testattavassa Router-rakenteessa
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
  test('näyttää suojatun sivun kun condition on true', () => {
    renderPrivateRoute(true)
    expect(screen.getByText('Suojattu sivu')).toBeInTheDocument()
  })

  test('ei näytä suojattua sivua kun condition on false', () => {
    renderPrivateRoute(false)
    expect(screen.queryByText('Suojattu sivu')).not.toBeInTheDocument()
  })

  test('ohjaa login-sivulle kun condition on false', () => {
    renderPrivateRoute(false)
    expect(screen.getByText('Login-sivu')).toBeInTheDocument()
  })
})
