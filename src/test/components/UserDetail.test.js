import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import UserDetail from '../../components/users/UserDetail'
import userReducer from '../../reducers/userReducer'
import loginReducer from '../../reducers/loginReducer'
import artworkReducer from '../../reducers/artworkReducer'
import notificationReducer from '../../reducers/notificationReducer'

const mockUser = {
  id: '1',
  name: 'Maija Maalari',
  username: 'maija',
  email: 'maija@test.com',
  role: 'member',
  intro: 'Olen taiteilija.',
  artworks: [{ id: 'a1', name: 'Maisema', artist: 'Maija', year: '2020', size: '50x60', medium: 'Oil', galleryImage: null }],
}

const server = setupServer(
  rest.get('*/api/users/artist/:id', (req, res, ctx) => res(ctx.json(mockUser))),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const createTestStore = (loggedUser, singleUser = mockUser) =>
  createStore(
    combineReducers({
      loggedUser: loginReducer,
      singleUser: userReducer,
      artworks: artworkReducer,
      notification: notificationReducer,
    }),
    {
      loggedUser: { loggedUser },
      singleUser: { users: [], singleUser, loggedUser: {} },
    },
    applyMiddleware(thunk),
  )

const renderUserDetail = (loggedUser, singleUser = mockUser) =>
  render(
    <Provider store={createTestStore(loggedUser, singleUser)}>
      <MemoryRouter initialEntries={['/users/1/myPage']}>
        <Routes>
          <Route path="/users/:id/myPage" element={<UserDetail />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  )

describe('UserDetail — owner view', () => {
  const owner = { id: '1', role: 'member' }

  test('owner sees account info table', () => {
    renderUserDetail(owner)
    expect(screen.getByText('Update information')).toBeInTheDocument()
    expect(screen.getByText('Write introduction')).toBeInTheDocument()
  })

  test('owner sees their email', () => {
    renderUserDetail(owner)
    expect(screen.getByText('maija@test.com')).toBeInTheDocument()
  })

  test('shows Add link when under 10 artworks', () => {
    renderUserDetail(owner)
    expect(screen.getByRole('link', { name: 'Add' })).toBeInTheDocument()
  })

  test('hides Add link when at 10 artworks', () => {
    const userAt10 = { ...mockUser, artworks: new Array(10).fill({ id: 'x', name: 'T', artist: 'A', year: '2020', size: '10x10', medium: 'Oil', galleryImage: null }) }
    renderUserDetail(owner, userAt10)
    expect(screen.queryByRole('link', { name: 'Add' })).not.toBeInTheDocument()
  })
})

describe('UserDetail — visitor view', () => {
  const otherUser = { id: '99', role: 'member' }

  test('visitor does not see account info table', () => {
    renderUserDetail(otherUser)
    expect(screen.queryByText('Update information')).not.toBeInTheDocument()
    expect(screen.queryByText('maija@test.com')).not.toBeInTheDocument()
  })

  test('visitor still sees username heading', () => {
    renderUserDetail(otherUser)
    expect(screen.getByText('Maija Maalari')).toBeInTheDocument()
  })
})

describe('UserDetail — artworks section', () => {
  test('shows "No images uploaded yet" when no artworks', () => {
    const userNoArtworks = { ...mockUser, artworks: [] }
    renderUserDetail({ id: '1', role: 'member' }, userNoArtworks)
    expect(screen.getByText('No images uploaded yet')).toBeInTheDocument()
  })

  test('shows intro text when present', () => {
    renderUserDetail({ id: '1', role: 'member' })
    expect(screen.getByText('Olen taiteilija.')).toBeInTheDocument()
  })
})
