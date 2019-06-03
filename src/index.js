import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './reducers/store'
import App from './App'


//App is a child of Provider to make connect to work and store is Providers attribute
ReactDOM.render(
  <Provider store={store}>
   <App />
  </Provider>,
  document.getElementById('root')
)