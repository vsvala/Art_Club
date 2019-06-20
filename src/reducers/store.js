import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

//import notificationReducer from './notificationReducer'
import userReducer from './userReducer'
import artworkReducer from './artworkReducer'
//import singleArtworkReducer from './singleArtworkReducer'
import loginReducer from './loginReducer'
//import filterReducer from './filterReducer'
//import singleMemberReducer from './singleMemberReducer'

const reducer = combineReducers({
  //notification: notificationReducer,
  users: userReducer,
  artworks: artworkReducer,
  // singleArtrwork: singleArtworkReducer,
  loggedUser: loginReducer
  // filter: filterReducer,
  // singleMember: singleMemberReducer,
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store