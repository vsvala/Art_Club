
const initialState = {
  users: [],
  singleUser: {},
  loggedUser: {},
  //singleArtist: {}
}



const userReducer = (state =initialState, action) => {
  console.log('ACTIONtype:', action)

  switch (action.type) {

  case 'CREATE_USER':{
    // console.log(action.content)
    console.log(action.data, 'create user to store from REDUSER' )
    //return store.concat(action.content)
    return [...state,  action.data ]
    //users: action.data //{ content: action.content, id: getId(), votes:0 }]
  }

  case 'GET_USERS':{
    console.log(action.data, 'get users from REDUCER ')
    return {
      ...state,
      users:action.data
    //return {
    //state= action.data //palauttaa taulukon
    }
  }
  case 'GET_ARTISTS':{
    console.log(action.data, 'get users from REDUCER ')
    return {
      ...state,
      users:action.data
    }
  }

  case 'DELETE_USER': {
    return {
      ...state,
      users: state.users.filter(user => user.id !== action.data.id)
    }
  }

  case 'UPDATE_USER': {
    return {
      ...state,
      loggedUser: action.data,
      singleUser: action.data
    }
  }



  case 'UPDATE_ROLE': {
    console.log('reducer id ja role', action.data.id, action.data.role)
    return {
      ...state,
      users:state.users.map(u =>
        u.id === action.data.id
          ?{ ...u, role:action.data.role }
          : u
      ) }
  }

  case 'INIT_SINGLE_USER': {
    return {
      ...state,
      singleUser: action.data
    }
  }
  // case 'INIT_SINGLE_ARTIST': {
  //   return {
  //     ...state,
  //     singleArtist: action.data
  //   }
  // }


  default:
    return state
  }
}
export default userReducer