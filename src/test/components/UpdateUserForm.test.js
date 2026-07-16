import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import UpdateUserForm from '../../components/user/UpdateUserForm'
import Notification from '../../components/common/Notification'
import userReducer from '../../reducers/userReducer'
import loginReducer from '../../reducers/loginReducer'
import notificationReducer from '../../reducers/notificationReducer'

const mockUser = {
  id: '1',
  name: 'Maija Maalari',
  username: 'maija',
  email: 'maija@test.com',
  role: 'member',
}

const server = setupServer(
  rest.put('*/api/users/info/:id', (req, res, ctx) => res(ctx.json(mockUser))),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

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
        <UpdateUserForm id="1" />
      </MemoryRouter>
    </Provider>,
  )

describe('UpdateUserForm — render', () => {
  test('shows heading', () => {
    renderForm()
    expect(screen.getByText('Update your information')).toBeInTheDocument()
  })

  test('pre-fills name, email and username from store', () => {
    renderForm()
    expect(screen.getByDisplayValue('Maija Maalari')).toBeInTheDocument()
    expect(screen.getByDisplayValue('maija@test.com')).toBeInTheDocument()
    expect(screen.getByDisplayValue('maija')).toBeInTheDocument()
  })
})

describe('UpdateUserForm — validation', () => {
  test('shows error for invalid email', async () => {
    renderForm()
    fireEvent.change(screen.getByDisplayValue('maija@test.com'), {
      target: { value: 'ei-validi' },
    })
    fireEvent.submit(screen.getByRole('button', { name: /update/i }).closest('form'))
    await waitFor(() => screen.getByText('Please check your email'))
    expect(screen.getByText('Please check your email')).toBeInTheDocument()
  })

  test('shows error when name is too short', async () => {
    renderForm()
    fireEvent.change(screen.getByDisplayValue('Maija Maalari'), {
      target: { value: 'Ab' },
    })
    fireEvent.submit(screen.getByRole('button', { name: /update/i }).closest('form'))
    await waitFor(() => screen.getByText('Name has to have at least 3 characters'))
    expect(screen.getByText('Name has to have at least 3 characters')).toBeInTheDocument()
  })

  test('shows error when username is too short', async () => {
    renderForm()
    fireEvent.change(screen.getByDisplayValue('maija'), {
      target: { value: 'ab' },
    })
    fireEvent.submit(screen.getByRole('button', { name: /update/i }).closest('form'))
    await waitFor(() => screen.getByText('Username has to have at least 3 characters'))
    expect(screen.getByText('Username has to have at least 3 characters')).toBeInTheDocument()
  })
})