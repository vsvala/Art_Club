// defines the state of course list filter

const initialState = {
  artworkName: ''
}

const filterReducer = (state = initialState, action) => {
  switch (action.type) {

  case 'SET_ARTWORK_NAME': {
    return { ...state, artworkName: action.data }
  }
  case 'INIT_FILTER': {
    return initialState
  }
  default: {
    return state
  }
  }
}


export default filterReducer