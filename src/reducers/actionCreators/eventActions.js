import eventService from '../../services/events'

// tells eventService to get all events from database and dispatch them to store
export const initializeEvents = () => {
  console.log('actions init content:' )
  return async (dispatch) => {
    const content = await eventService.getAll()
    console.log('actions init content:', content )
    dispatch({
      type: 'INIT_EVENTS',
      data: content
    })
  }
}




// creates new event
export const createEvent =(content) => {
  console.log('actions create:', content )

  return async (dispatch)  => {
    console.log('createEventaction', content)
    const event = await eventService.create(content)
    console.log(event,'uuusEvent')
    if (event.error || event === undefined) {
      dispatch({
        type: 'NOTIFY',
        data: 'Saving failed!'
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
        })
      }, 3000)
    } else {

      dispatch({
        type:'CREATE_EVENT',
        data:event
      })
      dispatch({
        type: 'NOTIFY',
        data: 'Event created'
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
        })
      }, 3000)
    }
  }
}

// delete event
export const deleteEvent = (event_id) => {
  return async (dispatch) => {
    const response = await eventService.deleteEvent(event_id)
    if (response.error || response === undefined) {
      dispatch({
        type: 'NOTIFY',
        data: 'Delete failed!'
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
        })
      }, 3000)
    } else {
      dispatch({
        type: 'DELETE_EVENT',
        data: { id: event_id }
      })
      dispatch({
        type: 'NOTIFY',
        data: 'Event deleted'
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
        })
      }, 3000)
    }
  }
}

export default { initializeEvents, createEvent, deleteEvent }