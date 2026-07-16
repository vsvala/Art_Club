import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import EventList from '../../components/event/EventList'
import loginReducer from '../../reducers/loginReducer'
import eventReducer from '../../reducers/eventReducer'

const mockEvents = [
  {
    id: '1',
    title: 'Kesänäyttely',
    start: '2026-08-01',
    end: '2026-08-15',
    place: 'Helsinki',
    description: 'Vuosittainen näyttely',
    eventImage: '',
  },
]

const server = setupServer(
  rest.get('*/api/events', (req, res, ctx) => res(ctx.json(mockEvents))),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const createTestStore = (role = null) =>
  createStore(
    combineReducers({ loggedUser: loginReducer, events: eventReducer }),
    { loggedUser: { loggedUser: role ? { id: '1', role } : null } },
    applyMiddleware(thunk),
  )

const renderEventList = (role = null) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <Provider store={createTestStore(role)}>
      <QueryClientProvider client={queryClient}>
        <EventList />
      </QueryClientProvider>
    </Provider>,
  )
}

describe('EventList', () => {
  test('shows loading state initially', () => {
    renderEventList()
    expect(screen.getByText('Ladataan...')).toBeInTheDocument()
  })

  test('renders events after loading', async () => {
    renderEventList()
    await waitFor(() => screen.getByText('Kesänäyttely'))
    expect(screen.getByText('Kesänäyttely')).toBeInTheDocument()
    expect(screen.getByText(/Helsinki/)).toBeInTheDocument()
  })

  test('admin sees delete button for event', async () => {
    renderEventList('admin')
    await waitFor(() => screen.getByText('Kesänäyttely'))
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
  })

  test('member does not see delete button', async () => {
    renderEventList('member')
    await waitFor(() => screen.getByText('Kesänäyttely'))
    expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument()
  })
})
