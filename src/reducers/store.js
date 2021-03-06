import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import notificationReducer from './notificationReducer'
import userReducer from './userReducer'
import artworkReducer from './artworkReducer'
import eventReducer from './eventReducer'
import loginReducer from './loginReducer'
import filterReducer from './filterReducer'
import singleArtworkReducer from './singleArtworkReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  users: userReducer,
  artworks: artworkReducer,
  events: eventReducer,
  loggedUser: loginReducer,
  filter: filterReducer,
  singleUser: userReducer,
  singleArtwork: singleArtworkReducer
  //singleArtist: userReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store