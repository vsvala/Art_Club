import userService from '../../services/users'
import artworkService from '../../services/artworks'
import loginService from '../../services/login'
import eventService from '../../services/events'
import tokenCheckService from '../../services/tokenCheck'

export const initLoggedUser = () => {
  return async (dispatch) => {
    let loggedUser = JSON.parse(window.localStorage.getItem('loggedInUser'))
    if (loggedUser) {
      let token = loggedUser.token
      const response = await tokenCheckService.userCheck(token)
      if (response.message === 'success') {
        await artworkService.setToken(loggedUser.token)
        await userService.setToken(loggedUser.token)
        await eventService.setToken(loggedUser.token)
        dispatch({ type: 'INIT_USER', data: loggedUser })
      }
    }
  }
}

export const updateLoggedUser = (content, id) => {
  return async (dispatch) => {
    const response = await userService.updateIntro(content, id)
    if (response.error || response === undefined) {
      dispatch({ type: 'NOTIFY', data: 'Saving  introduction failed!' })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 3000)
    } else {
      dispatch({ type: 'UPDATE_LOGGED_USER', data: response })
      dispatch({ type: 'NOTIFY', data: 'Introduction text updated!' })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 3000)
    }
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    const response = await loginService.login({ username: username, password: password })
    if (response.error) {
      dispatch({ type: 'NOTIFY', data: response.error })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 3000)
    } else {
      await userService.setToken(response.token)
      await artworkService.setToken(response.token)
      await eventService.setToken(response.token)
      dispatch({ type: 'LOGIN', data: { ...response } })
      dispatch({ type: 'NOTIFY', data: 'Logged in succesfully!' })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 3000)
      window.localStorage.setItem('loggedInUser', JSON.stringify({ ...response }))
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedInUser')
    await userService.setToken(null)
    await artworkService.setToken(null)
    await eventService.setToken(null)
    dispatch({ type: 'LOGOUT' })
  }
}

export default { login, logout, initLoggedUser, updateLoggedUser }
