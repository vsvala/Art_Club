import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom'
import UserIntroForm from '../../components/user/UserIntroForm'
import Notification from '../../components/common/Notification'
import userReducer from '../../reducers/userReducer'
import loginReducer from '../../reducers/loginReducer'
import notificationReducer from '../../reducers/notificationReducer'

const mockUser = { id: '1', name: 'Maija', intro: 'Olen taiteilija.' }

const createTestStore = (singleUser = mockUser) =>
  createStore(
    combineReducers({
      singleUser: userReducer,
      loggedUser: loginReducer,
      notification: notificationReducer,
    }),
    { singleUser: { users: [], singleUser, loggedUser: {} } },
    applyMiddleware(thunk),
  )

const renderForm = (singleUser = mockUser) =>
  render(
    <Provider store={createTestStore(singleUser)}>
      <MemoryRouter>
        <Notification />
        <UserIntroForm id="1" />
      </MemoryRouter>
    </Provider>,
  )

describe('UserIntroForm', () => {
  test('renders heading and textarea', () => {
    renderForm()
    expect(screen.getByText(/Write Introduction text/i)).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test('pre-fills textarea with existing intro', () => {
    renderForm()
    expect(screen.getByDisplayValue('Olen taiteilija.')).toBeInTheDocument()
  })

  test('shows error when intro exceeds 1000 characters', async () => {
    renderForm()
    const longText = 'a'.repeat(1001)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: longText } })
    fireEvent.submit(screen.getByRole('button', { name: /send/i }).closest('form'))
    await waitFor(() => screen.getByText(/Introduction text maximum length is 1000 characters/i))
    expect(screen.getByText(/Introduction text maximum length is 1000 characters/i)).toBeInTheDocument()
  })

  test('shows Send button', () => {
    renderForm()
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
  })
})
