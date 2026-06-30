import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LoginForm } from '../../components/login/LoginForm'

// Named export — ei tarvita Reduxia, annetaan propsi suoraan
const renderLoginForm = (props = {}) =>
  render(
    <MemoryRouter>
      <LoginForm login={jest.fn()} loggedUser={null} {...props} />
    </MemoryRouter>,
  )

describe('LoginForm', () => {
  test('renderöityy kaatumatta', () => {
    renderLoginForm()
    expect(screen.getByText('Sign In')).toBeInTheDocument()
  })

  test('username-kenttä löytyy', () => {
    renderLoginForm()
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
  })

  test('password-kenttä löytyy', () => {
    renderLoginForm()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
  })

  test('login-nappi löytyy', () => {
    renderLoginForm()
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
  })

  test('kutsuu login-funktiota oikeilla arvoilla kun lomake lähetetään', () => {
    const mockLogin = jest.fn()
    renderLoginForm({ login: mockLogin })

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { name: 'username', value: 'testi' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { name: 'password', value: 'salasana123' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    expect(mockLogin).toHaveBeenCalledWith('testi', 'salasana123')
  })

  test('tyhjentää kentät submitin jälkeen', () => {
    renderLoginForm()
    const usernameField = screen.getByPlaceholderText('Username')

    fireEvent.change(usernameField, {
      target: { name: 'username', value: 'testi' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    expect(usernameField.value).toBe('')
  })
})
