import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import notificationReducer from '../../reducers/notificationReducer'
import Notification from '../../components/common/Notification'

// Apufunktio: luo testi-store haluamallasi alkutilalla
const createTestStore = (notification = '') =>
  createStore(combineReducers({ notification: notificationReducer }), {
    notification,
  })

describe('Notification', () => {
  test('ei renderöi mitään kun notifikaatio on tyhjä', () => {
    const store = createTestStore('')
    const { container } = render(
      <Provider store={store}>
        <Notification />
      </Provider>,
    )
    expect(container).toBeEmptyDOMElement()
  })

  test('näyttää viestin kun notifikaatio on asetettu', () => {
    const store = createTestStore('Teos lisätty onnistuneesti')
    render(
      <Provider store={store}>
        <Notification />
      </Provider>,
    )
    expect(screen.getByText('Teos lisätty onnistuneesti')).toBeInTheDocument()
  })

  test('näyttää reunuksen kun viesti on näkyvissä', () => {
    const store = createTestStore('Virhe tapahtui')
    render(
      <Provider store={store}>
        <Notification />
      </Provider>,
    )
    const div = screen.getByText('Virhe tapahtui')
    expect(div).toHaveStyle('border: solid')
  })
})
