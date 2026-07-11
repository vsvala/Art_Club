const initialState = {
  loggedUser: null,
  singleUser: {},
  authLoading: true,
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'INIT_USER': {
    return { ...state, loggedUser: action.data, authLoading: false }
  }

  case 'AUTH_READY': {
    return { ...state, authLoading: false }
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
