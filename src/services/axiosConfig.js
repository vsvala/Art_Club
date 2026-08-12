import axios from 'axios'
import store from '../reducers/store'
import { logout } from '../reducers/actionCreators/loginActions'

// initLoggedUser already handles a rejected tokenCheck on startup, so that
// request is excluded here to avoid dispatching logout() twice.
const EXCLUDED_PATH = 'api/tokenCheck'

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const hadAuthHeader = Boolean(error.config?.headers?.Authorization)
    const isExcluded = error.config?.url?.includes(EXCLUDED_PATH)

    if (status === 401 && hadAuthHeader && !isExcluded) {
      store.dispatch(logout())
    }

    return Promise.reject(error)
  },
)
