const initialState = {
  loggedUser: {},
  singleUser: {}
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'INIT_USER': {
    return { ...state, loggedUser: action.data }
  }

  case 'LOGIN': {
    return { ...state, loggedUser: action.data }
  }

  case 'LOGOUT': {
    return { ...state, loggedUser: null }
  }

  case 'UPDATE_LOGGED_USER': {
    return { ...state, loggedUser: action.data }
  }

  default: {
    return state
  }
  }
}

export default loginReducer
