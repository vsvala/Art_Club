import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import SingleArtist from '../../components/artist/SingleArtist'
import userReducer from '../../reducers/userReducer'
import notificationReducer from '../../reducers/notificationReducer'

const mockArtist = {
  id: '1',
  name: 'Maija Maalari',
  intro: 'Maalaan akvarelleja.',
  artworks: [
    { id: 'a1', name: 'Maisema', artist: 'Maija', year: '2020', size: '50x60', medium: 'Oil', galleryImage: null },
    { id: 'a2', name: 'Muotokuva', artist: 'Maija', year: '2021', size: '40x50', medium: 'Acrylic', galleryImage: null },
  ],
}

const server = setupServer(
  rest.get('*/api/users/artist/:id', (req, res, ctx) => res(ctx.json(mockArtist))),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const createTestStore = (singleUser = mockArtist) =>
  createStore(
    combineReducers({ singleUser: userReducer, notification: notificationReducer }),
    { singleUser: { users: [], singleUser, loggedUser: {} } },
    applyMiddleware(thunk),
  )

const renderSingleArtist = (singleUser = mockArtist) =>
  render(
    <Provider store={createTestStore(singleUser)}>
      <MemoryRouter initialEntries={['/artists/1']}>
        <Routes>
          <Route path="/artists/:id" element={<SingleArtist />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  )

describe('SingleArtist', () => {
  test('renders artist name', () => {
    renderSingleArtist()
    expect(screen.getByText('Maija Maalari')).toBeInTheDocument()
  })

  test('renders intro text', () => {
    renderSingleArtist()
    expect(screen.getByText('Maalaan akvarelleja.')).toBeInTheDocument()
  })

  test('renders all artworks', () => {
    renderSingleArtist()
    expect(screen.getByText(/Maisema/)).toBeInTheDocument()
    expect(screen.getByText(/Muotokuva/)).toBeInTheDocument()
  })

  test('renders artwork links to artwork pages', () => {
    renderSingleArtist()
    const links = screen.getAllByRole('link')
    const artworkLinks = links.filter((l) => l.href.includes('/artworks/'))
    expect(artworkLinks).toHaveLength(2)
    expect(artworkLinks[0]).toHaveAttribute('href', '/artworks/a1')
  })

  test('renders artwork metadata', () => {
    renderSingleArtist()
    expect(screen.getByText(/2020/)).toBeInTheDocument()
    expect(screen.getByText(/Oil/)).toBeInTheDocument()
  })

  test('renders nothing when singleUser is null', () => {
    renderSingleArtist(null)
    expect(screen.queryByText('Maija Maalari')).not.toBeInTheDocument()
  })
})