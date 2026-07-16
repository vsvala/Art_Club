import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { MemoryRouter } from 'react-router-dom'
import Home from '../../components/Home'
import loginReducer from '../../reducers/loginReducer'

const createTestStore = (loggedUser = null) =>
  createStore(
    combineReducers({ loggedUser: loginReducer }),
    { loggedUser: { loggedUser } },
  )

const renderHome = (loggedUser = null) =>
  render(
    <Provider store={createTestStore(loggedUser)}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </Provider>,
  )

describe('Home — logged out', () => {
  test('shows welcome heading', () => {
    renderHome()
    expect(screen.getByText('Welcome To Art Club!')).toBeInTheDocument()
  })

  test('shows login and register links', () => {
    renderHome()
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument()
  })
})

describe('Home — logged in as member', () => {
  const member = { id: '1', username: 'maija', role: 'member' }

  test('shows username', () => {
    renderHome(member)
    expect(screen.getByText('maija')).toBeInTheDocument()
  })

  test('shows welcome heading', () => {
    renderHome(member)
    expect(screen.getByText('Welcome To Art Club!')).toBeInTheDocument()
  })

  test('does not show pending message', () => {
    renderHome(member)
    expect(screen.queryByText(/processed soon/i)).not.toBeInTheDocument()
  })
})

describe('Home — logged in as nonMember', () => {
  const nonMember = { id: '2', username: 'uusi', role: 'nonMember' }

  test('shows pending membership message', () => {
    renderHome(nonMember)
    expect(screen.getByText(/processed soon/i)).toBeInTheDocument()
  })

  test('does not show main welcome heading', () => {
    renderHome(nonMember)
    expect(screen.queryByText('Welcome To Art Club!')).not.toBeInTheDocument()
  })
})