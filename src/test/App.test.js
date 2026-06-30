import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../reducers/store'
import App from '../App'

test('App renderöityy kaatumatta', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
})
