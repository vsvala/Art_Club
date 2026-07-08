import React from 'react'
import * as Sentry from '@sentry/react'
import { Provider } from 'react-redux'
import store from './reducers/store'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('root'))

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV || 'development',
  enabled: process.env.NODE_ENV === 'production',
  release: process.env.REACT_APP_SENTRY_RELEASE,
  tracesSampleRate: 0.1,
  beforeSend: (event) => (process.env.NODE_ENV === 'production' ? event : null),
  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/react/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: []
  },
})

root.render(
  <Provider store={store}>
    <Sentry.ErrorBoundary fallback={<p>Something went wrong.</p>}>
      <App />
    </Sentry.ErrorBoundary>
  </Provider>,
)
//App is a child of Provider to make connect to work and store is Providers attribute
