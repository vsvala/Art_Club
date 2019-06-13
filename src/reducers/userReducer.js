
const initialState = {
  users: []
}

const userReducer = (state =initialState, action) => {
  console.log('ACTIONtype:', action)

  switch (action.type) {

  case 'CREATE_USER':
    console.log(action.content)
    console.log(action.data)
    //return store.concat(action.content)
    return {
      ...state,
      users: action.data //{ content: action.content, id: getId(), votes:0 }]
    }

  case 'INITIALIZE_USERS':
    return {
      ...state,
      users: action.data
    //return {
    //state= action.data //palauttaa taulukon
    }

  default:
    return state
  }
}
export default userReducer