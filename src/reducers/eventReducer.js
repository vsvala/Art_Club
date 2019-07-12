const initialState = {
  events: []
}

// updates the state of the event list
const eventReducer = (state = initialState, action) => {

  switch (action.type) {
  case 'INIT_EVENTS': {
    return {
      ...state,
      events: action.data,
    }
  }

  case 'CREATE_EVENT': {
    return {
      ...state,
      events: action.data,
    }
  }

  case 'EVENT_FETCH': {
    return {
      ...state,
      events: [],
    }
  }

  case 'DELETE_EVENT': {
    return {
      ...state,
      event: state.evenst.filter(event => event.id !== action.data.id)
    }
  }

  default:
    return state
  }
}


export default eventReducer