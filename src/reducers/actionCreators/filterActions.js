export const initializeFilter = () => {
  return async (dispatch) => {
    dispatch({
      type: 'INIT_FILTER'
    })
  }
}

// artwork names
export const setArtworkName = (artworkName) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_ARTWORK_NAME',
      data: artworkName
    })
  }
}

export default { initializeFilter, setArtworkName }