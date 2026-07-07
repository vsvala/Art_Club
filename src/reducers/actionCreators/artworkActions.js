import artworkService from '../../services/artworks'
import tokenCheckService from '../../services/tokenCheck'

export const initializeArtworks = () => {
  return async (dispatch) => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedInUser'))
    if (loggedUser && loggedUser.token) {
      const token = loggedUser.token
      const response = await tokenCheckService.userCheck(token)
      if (response.message === 'success') {
        await artworkService.setToken(loggedUser.token)
      }
    }
    const content = await artworkService.getAll()
    dispatch({
      type: 'INIT_ARTWORKS',
      data: content,
    })
  }
}

export const createArtwork = (content) => {
  return async (dispatch) => {
    const artwork = await artworkService.create(content)
    if (artwork.error || artwork === undefined) {
      dispatch({ type: 'NOTIFY', data: 'Saving failed!' })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 3000)
    } else {
      dispatch({ type: 'CREATE_ARTWORK', data: artwork })
      dispatch({ type: 'NOTIFY', data: 'Artwork added' })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 3000)
    }
  }
}

export const voteArtwork = (artwork) => {
  return async (dispatch) => {
    const response = await artworkService.update(artwork.id, artwork)
    if (response.error || response === undefined) {
      dispatch({ type: 'NOTIFY', data: 'Liking failed!' })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 3000)
    } else {
      dispatch({ type: 'VOTE', id: artwork.id })
      dispatch({ type: 'NOTIFY', data: 'Artwork liked' })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 3000)
    }
  }
}

export const deleteArtwork = (artwork_id) => {
  return async (dispatch) => {
    const response = await artworkService.deleteArtwork(artwork_id)
    if (response.error || response === undefined) {
      dispatch({ type: 'NOTIFY', data: 'Delete failed!' })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 3000)
    } else {
      dispatch({ type: 'DELETE_ARTWORK', data: { id: artwork_id } })
      dispatch({ type: 'NOTIFY', data: 'artwork deleted' })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 3000)
    }
  }
}

export default { initializeArtworks, createArtwork, deleteArtwork, voteArtwork }
