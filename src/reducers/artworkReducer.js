const initialState = {
  artworks: []
}

const artworkReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'INIT_ARTWORKS': {
    return { ...state, artworks: action.data }
  }

  case 'CREATE_ARTWORK': {
    return { ...state, artworks: [] }
  }

  case 'ARTWORK_FETCH': {
    return { ...state, artworks: [] }
  }

  case 'VOTE': {
    const old = state.artworks.filter(a => a.id !== action.id)
    const liked = state.artworks.find(a => a.id === action.id)
    return {
      ...state,
      artworks: [ ...old, { ...liked, likes: liked.likes + 1 } ]
    }
  }

  case 'DELETE_ARTWORK': {
    return {
      ...state,
      artworks: state.artworks.filter(artwork => artwork.id !== action.data.id)
    }
  }

  default:
    return state
  }
}

export default artworkReducer
