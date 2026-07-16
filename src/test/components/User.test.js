import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { MemoryRouter } from 'react-router-dom'
import User from '../../components/user/User'
import loginReducer from '../../reducers/loginReducer'

const mockUser = {
  id: '1',
  name: 'Maija Maalari',
  username: 'maija',
  role: 'member',
  email: 'maija@test.com',
  artworks: [{}, {}],
}

const createTestStore = (role = 'admin') =>
  createStore(
    combineReducers({ loggedUser: loginReducer }),
    { loggedUser: { loggedUser: { id: '99', role } } },
  )

const renderUser = (loggedRole = 'admin', user = mockUser) =>
  render(
    <Provider store={createTestStore(loggedRole)}>
      <MemoryRouter>
        <table>
          <tbody>
            <User user={user} onClick={() => () => {}} />
          </tbody>
        </table>
      </MemoryRouter>
    </Provider>,
  )

describe('User — display', () => {
  test('renders username and email', () => {
    renderUser()
    expect(screen.getByText('maija')).toBeInTheDocument()
    expect(screen.getByText('maija@test.com')).toBeInTheDocument()
  })

  test('renders artwork count', () => {
    renderUser()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  test('links to artist profile', () => {
    renderUser()
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/artists/1')
  })
})

describe('User — admin vs member view', () => {
  test('admin sees role selector dropdown', () => {
    renderUser('admin')
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  test('admin sees delete button', () => {
    renderUser('admin')
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
  })

  test('member sees role as plain text, not dropdown', () => {
    renderUser('member')
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
    expect(screen.getByText('member')).toBeInTheDocument()
  })

  test('member does not see delete button', () => {
    renderUser('member')
    expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument()
  })
})