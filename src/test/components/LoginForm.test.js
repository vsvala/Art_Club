import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LoginForm } from '../../components/login/LoginForm'

// Named export — no Redux needed, props passed directly
const renderLoginForm = (props = {}) =>
  render(
    <MemoryRouter>
      <LoginForm login={jest.fn()} loggedUser={null} {...props} />
    </MemoryRouter>,
  )

describe('LoginForm', () => {
  test('renders without crashing', () => {
    renderLoginForm()
    expect(screen.getByText('Sign In')).toBeInTheDocument()
  })

  test('username field is present', () => {
    renderLoginForm()
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
  })

  test('password field is present', () => {
    renderLoginForm()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
  })

  test('login button is present', () => {
    renderLoginForm()
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
  })

  test('calls login function with correct values on form submit', () => {
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

  test('clears fields after submit', () => {
    renderLoginForm()
    const usernameField = screen.getByPlaceholderText('Username')

    fireEvent.change(usernameField, {
      target: { name: 'username', value: 'testi' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    expect(usernameField.value).toBe('')
  })
})
