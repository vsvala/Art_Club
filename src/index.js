import React from 'react'
import { Provider } from 'react-redux'
import store from './reducers/store'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
)
//App is a child of Provider to make connect to work and store is Providers attribute
