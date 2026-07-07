import eventService from '../../services/events'
import tokenCheckService from '../../services/tokenCheck'

export const initializeEvents = () => {
  return async (dispatch) => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedInUser'))
    if (loggedUser && loggedUser.token) {
      const token = loggedUser.token
      const response = await tokenCheckService.userCheck(token)
      if (response.message === 'success') {
        await eventService.setToken(loggedUser.token)
      }
    }
    const content = await eventService.getAll()
    dispatch({ type: 'INIT_EVENTS', data: content })
  }
}

export const createEvent = (content) => {
  return async (dispatch) => {
    const event = await eventService.create(content)
    if (event.error || event === undefined) {
      dispatch({ type: 'NOTIFY', data: 'Saving failed!' })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 3000)
    } else {
      dispatch({ type: 'CREATE_EVENT', data: event })
      dispatch({ type: 'NOTIFY', data: 'Event created' })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 3000)
    }
  }
}

export const deleteEvent = (event_id) => {
  return async (dispatch) => {
    const response = await eventService.deleteEvent(event_id)
    if (response.error || response === undefined) {
      dispatch({ type: 'NOTIFY', data: 'Delete failed!' })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 3000)
    } else {
      dispatch({ type: 'DELETE_EVENT', data: { id: event_id } })
      dispatch({ type: 'NOTIFY', data: 'Event deleted' })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 3000)
    }
  }
}

export default { initializeEvents, createEvent, deleteEvent }
