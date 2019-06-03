const initialState = {
  artworkLoading: false,
  artworks: []
}

// updates the state of the "course application" course list
const artworkReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'INIT_ARTWORKS': {
    return {
      ...state,
      artworks: action.data,
      loadingartworks: false
    }
  }

  case 'ARTWORK_FETCH': {
    return {
      ...state,
      artworks: [],
      loadingartworks: true
    }
  }


  case 'DELETE_ARTWORK': {
    return {
      ...state,
      artworks: state.artworks.filter(c => c.course_id !== action.data.id)
    }
  }

  default:
    return state
  }
}


export default artworkReducer