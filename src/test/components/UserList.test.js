import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import UserList from '../../components/user/UserList'
import userReducer from '../../reducers/userReducer'
import loginReducer from '../../reducers/loginReducer'
import notificationReducer from '../../reducers/notificationReducer'

const mockUsers = [
  { id: '1', name: 'Maija Maalari', username: 'maija', role: 'member', email: 'maija@test.com', artworks: [{}, {}] },
  { id: '2', name: 'Pekka Piirtäjä', username: 'pekka', role: 'admin', email: 'pekka@test.com', artworks: [] },
]

const server = setupServer(
  rest.get('*/api/users', (req, res, ctx) => res(ctx.json(mockUsers))),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const createTestStore = (role = 'admin') =>
  createStore(
    combineReducers({
      users: userReducer,
      loggedUser: loginReducer,
      notification: notificationReducer,
    }),
    { loggedUser: { loggedUser: { id: '99', role } } },
    applyMiddleware(thunk),
  )

const renderUserList = (role = 'admin') =>
  render(
    <Provider store={createTestStore(role)}>
      <MemoryRouter>
        <UserList />
      </MemoryRouter>
    </Provider>,
  )

describe('UserList', () => {
  test('renders Users heading', () => {
    renderUserList()
    expect(screen.getByText('Users')).toBeInTheDocument()
  })

  test('renders table headers', () => {
    renderUserList()
    expect(screen.getByText('name')).toBeInTheDocument()
    expect(screen.getByText('username')).toBeInTheDocument()
    expect(screen.getByText('email')).toBeInTheDocument()
  })

  test('renders users after loading from API', async () => {
    renderUserList()
    await waitFor(() => screen.getByText('Maija Maalari'))
    expect(screen.getByText('Maija Maalari')).toBeInTheDocument()
    expect(screen.getByText('Pekka Piirtäjä')).toBeInTheDocument()
  })

  test('admin sees delete buttons for each user', async () => {
    renderUserList('admin')
    await waitFor(() => screen.getByText('Maija Maalari'))
    expect(screen.getAllByRole('button', { name: /delete/i })).toHaveLength(2)
  })

  test('member does not see delete buttons', async () => {
    renderUserList('member')
    await waitFor(() => screen.getByText('Maija Maalari'))
    expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument()
  })
})