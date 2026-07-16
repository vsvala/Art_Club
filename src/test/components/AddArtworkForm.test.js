import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import AddArtworkForm from '../../components/artwork/AddArtworkForm'
import Notification from '../../components/common/Notification'
import userReducer from '../../reducers/userReducer'
import notificationReducer from '../../reducers/notificationReducer'
import loginReducer from '../../reducers/loginReducer'

const userWith3Artworks = { id: '42', name: 'Maija', artworks: [{}, {}, {}] }
const userAt10Limit = { id: '42', name: 'Maija', artworks: new Array(10).fill({}) }

const server = setupServer(
  rest.get('*/api/users/artists', (req, res, ctx) => res(ctx.json([userWith3Artworks]))),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const createTestStore = (users = [userWith3Artworks]) =>
  createStore(
    combineReducers({
      users: userReducer,
      notification: notificationReducer,
      loggedUser: loginReducer,
    }),
    { users: { users, singleUser: {}, loggedUser: {} } },
    applyMiddleware(thunk),
  )

const renderForm = (users = [userWith3Artworks]) =>
  render(
    <Provider store={createTestStore(users)}>
      <MemoryRouter>
        <Notification />
        <AddArtworkForm id="42" />
      </MemoryRouter>
    </Provider>,
  )

describe('AddArtworkForm — render', () => {
  test('shows Add artwork heading', () => {
    renderForm()
    expect(screen.getByText('Add artwork')).toBeInTheDocument()
  })

  test('renders all form fields', () => {
    renderForm()
    expect(screen.getByPlaceholderText('Artist')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Name of artwork')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Year')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Size (width x hight) cm')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Medium')).toBeInTheDocument()
  })

  test('shows Send button when under artwork limit', () => {
    renderForm()
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
  })

  test('hides Send button and shows limit message when at 10 artworks', () => {
    renderForm([userAt10Limit])
    expect(screen.queryByRole('button', { name: /send/i })).not.toBeInTheDocument()
    expect(screen.getByText(/reached limit of 10 images/i)).toBeInTheDocument()
  })
})

describe('AddArtworkForm — validation', () => {
  test('shows error when no image is selected', async () => {
    renderForm()
    fireEvent.submit(screen.getByRole('button', { name: /send/i }).closest('form'))
    await waitFor(() => screen.getByText('Remember to choose image!'))
    expect(screen.getByText('Remember to choose image!')).toBeInTheDocument()
  })

})