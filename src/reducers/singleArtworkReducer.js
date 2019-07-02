const initialState = {
  singleArtwork: {},
}

const singleArtworkReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'INIT_SINGLE_ARTWORK': {
    return {
      ...state,
      singleArtwork: action.data
    }
  }

  default:
    return state
  }
}

export default singleArtworkReducer