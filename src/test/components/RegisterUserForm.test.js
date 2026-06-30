import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { RegisterUserForm } from '../../components/login/RegisterUserForm'

// Huom: komponentti lukee arvot event.target.fieldName.value -tyylillä
// jota JSDOM ei tue fireEvent:llä. Validointilogiikka on testattu
// erikseen validations.test.js:ssä (emailValid). Täällä testataan
// UI-rakenne ja kentät.

const renderForm = (props = {}) =>
  render(
    <MemoryRouter>
      <RegisterUserForm createUser={jest.fn()} notify={jest.fn()} {...props} />
    </MemoryRouter>,
  )

describe('RegisterUserForm', () => {
  test('renderöityy kaatumatta', () => {
    renderForm()
    expect(screen.getByText('Register and apply membership')).toBeInTheDocument()
  })

  test('Name-kenttä löytyy', () => {
    renderForm()
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument()
  })

  test('Email-kenttä löytyy', () => {
    renderForm()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
  })

  test('Username-kenttä löytyy', () => {
    renderForm()
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
  })

  test('Password-kenttä löytyy', () => {
    renderForm()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
  })

  test('Apply-nappi löytyy', () => {
    renderForm()
    expect(screen.getByRole('button', { name: 'Apply' })).toBeInTheDocument()
  })

  test('Terms of use -linkki löytyy', () => {
    renderForm()
    expect(screen.getByText('Terms of use')).toBeInTheDocument()
  })

  test('Privacy Policy -linkki löytyy', () => {
    renderForm()
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
  })
})
