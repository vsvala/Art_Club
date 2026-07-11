import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../../reducers/store'
import { RegisterUserForm } from '../../components/login/RegisterUserForm'

const renderForm = () =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <RegisterUserForm />
      </MemoryRouter>
    </Provider>,
  )

describe('RegisterUserForm', () => {
  test('renders without crashing', () => {
    renderForm()
    expect(
      screen.getByText('Register and apply membership'),
    ).toBeInTheDocument()
  })

  test('Name field is present', () => {
    renderForm()
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument()
  })

  test('Email field is present', () => {
    renderForm()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
  })

  test('Username field is present', () => {
    renderForm()
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
  })

  test('Password field is present', () => {
    renderForm()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
  })

  test('Apply button is present', () => {
    renderForm()
    expect(screen.getByRole('button', { name: 'Apply' })).toBeInTheDocument()
  })

  test('Terms of use link is present', () => {
    renderForm()
    expect(screen.getByText('Terms of use')).toBeInTheDocument()
  })

  test('Privacy Policy link is present', () => {
    renderForm()
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
  })
})
