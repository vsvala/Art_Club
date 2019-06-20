
const initialState = {
  users: []
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
  case 'DELETE_USER': {
    return {
      ...state,
      users: state.users.filter(u => u.user_id !== action.data.id)
    }
  }
  default:
    return state
  }
}
export default userReducer