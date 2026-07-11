import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import LoginForm from '../../components/login/LoginForm'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { login } from '../../reducers/actionCreators/loginActions'

jest.mock('../../reducers/actionCreators/loginActions', () => ({
  login: jest.fn(),
}))

const makeStore = (overrides = {}) =>
  createStore(
    (state = { loggedUser: { loggedUser: null }, notification: null }) => state,
    applyMiddleware(thunk),
  )

const renderLoginForm = (storeOverrides = {}) =>
  render(
    <Provider store={makeStore(storeOverrides)}>
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    </Provider>,
  )

describe('LoginForm', () => {
  beforeEach(() => {
    login.mockReturnValue({ type: 'MOCK_LOGIN' })
  })

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
    login.mockReturnValue({ type: 'MOCK_LOGIN' })

    renderLoginForm()

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { name: 'username', value: 'testi' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { name: 'password', value: 'salasana123' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    expect(login).toHaveBeenCalledWith('testi', 'salasana123')
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
