import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import notificationReducer from '../../reducers/notificationReducer'
import Notification from '../../components/common/Notification'

// Helper: creates test store with given initial state
const createTestStore = (notification = '') =>
  createStore(combineReducers({ notification: notificationReducer }), {
    notification,
  })

describe('Notification', () => {
  test('renders nothing when notification is empty', () => {
    const store = createTestStore('')
    const { container } = render(
      <Provider store={store}>
        <Notification />
      </Provider>,
    )
    expect(container).toBeEmptyDOMElement()
  })

  test('shows message when notification is set', () => {
    const store = createTestStore('Artwork added successfully')
    render(
      <Provider store={store}>
        <Notification />
      </Provider>,
    )
    expect(screen.getByText('Artwork added successfully')).toBeInTheDocument()
  })

  test('shows border when message is visible', () => {
    const store = createTestStore('An error occurred')
    render(
      <Provider store={store}>
        <Notification />
      </Provider>,
    )
    const div = screen.getByText('An error occurred')
    expect(div).toHaveStyle('border: solid')
  })
})
