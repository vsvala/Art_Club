import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { RegisterUserForm } from '../../components/login/RegisterUserForm'

// Note: component reads values via event.target.fieldName.value
// which JSDOM does not support with fireEvent. Validation logic is tested
// separately in validations.test.js (emailValid). Here we test
// the UI structure and fields.

const renderForm = (props = {}) =>
  render(
    <MemoryRouter>
      <RegisterUserForm createUser={jest.fn()} notify={jest.fn()} {...props} />
    </MemoryRouter>,
  )

describe('RegisterUserForm', () => {
  test('renders without crashing', () => {
    renderForm()
    expect(screen.getByText('Register and apply membership')).toBeInTheDocument()
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
