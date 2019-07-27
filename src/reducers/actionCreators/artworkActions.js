import artworkService from '../../services/artworks'

// tells artworkService to get all artworks from database and dispatch them to store
export const initializeArtworks = () => {
  return async (dispatch) => {
    const content = await artworkService.getAll()
    console.log('actions init content:', content )
    dispatch({
      type: 'INIT_ARTWORKS',
      data: content
    })
  }
}

// creates new artwork
export const createArtwork=(content) => {
  console.log('actions create:', content )

  return async (dispatch)  => {
    console.log('createArtworkaction', content)
    const artwork = await artworkService.create(content)
    console.log(artwork,'uuusArtwork')
    if (artwork.error || artwork === undefined) {
      dispatch({
        type: 'NOTIFY',
        data: 'Saving failed!'
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
        })
      }, 3000)
    } else {

      dispatch({
        type:'CREATE_ARTWORK',
        data:artwork
      })
      dispatch({
        type: 'NOTIFY',
        data: 'Artwork added'
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
        })
      }, 3000)
    }
  }
}

export const voteArtwork = (artwork) => {
  return async (dispatch) => {
    const response = await artworkService.update(artwork.id, artwork)
    if (response.error || response === undefined) {
      dispatch({
        type: 'NOTIFY',
        data: 'Liking failed!'
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
        })
      }, 3000)
    } else {
      dispatch({
        type: 'VOTE',
        id: artwork.id
      })
      dispatch({
        type: 'NOTIFY',
        data: 'Artwork liked'
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
        })
      }, 3000)
    }
  }
}
// delete artwork
export const deleteArtwork = (artwork_id) => {
  return async (dispatch) => {
    const response = await artworkService.deleteArtwork(artwork_id)
    if (response.error || response === undefined) {
      dispatch({
        type: 'NOTIFY',
        data: 'Delete failed!'
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
        })
      }, 3000)
    } else {
      dispatch({
        type: 'DELETE_ARTWORK',
        data: { id: artwork_id }
      })
      dispatch({
        type: 'NOTIFY',
        data: 'artwork deleted'
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
        })
      }, 3000)
    }
  }
}

export default { initializeArtworks, createArtwork, deleteArtwork, voteArtwork }