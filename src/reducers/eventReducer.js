const initialState = {
  events: [],
}

// updates the state of the event list
const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_EVENT': {
      return {
        ...state,
        events: [],
      }
    }

    case 'DELETE_EVENT': {
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.data.id),
      }
    }

    default:
      return state
  }
}

export default eventReducer
