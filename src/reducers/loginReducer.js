const initialState = {
  loggedUser:{},
  singleUser:{}
  // loadingUser: true
}

const loginReducer = (state = initialState, action) => {
  console.log('loginreducer')
  switch (action.type) {

  case 'INIT_USER': {
    return {
      ...state,
      loggedUser: action.data
      // loadingUser: false
    }
  }

  case 'LOGIN': {
    return {
      ...state,
      loggedUser: action.data
    }
  }

  case 'LOGOUT': {
    return {
      ...state,
      loggedUser: null
    }
  }

  case 'UPDATE_LOGGED_USER': {
    return {
      ...state,
      loggedUser: action.data,
      //singleUser: action.data
    }
  }

  default: {
    return state
  }
  }
}


export default loginReducer
