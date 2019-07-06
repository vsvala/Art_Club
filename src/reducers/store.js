import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import notificationReducer from './notificationReducer'
import userReducer from './userReducer'
import artworkReducer from './artworkReducer'
import singleArtworkReducer from './singleArtworkReducer'
import loginReducer from './loginReducer'
//import filterReducer from './filterReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  users: userReducer,
  artworks: artworkReducer,
  singleArtwork: singleArtworkReducer,
  loggedUser: loginReducer,
  // filter: filterReducer,
  singleUser: userReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store