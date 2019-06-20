import artworkService from '../../services/artworks'
//import { notify, setError } from './notificationActions'

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
  return async (dispatch)  => {
    console.log('createArtworkaction', content)
    const artwork = await artworkService.create(content)
    console.log(artwork,'uuusArtwork')
    if (artwork.error || artwork === undefined) {
      dispatch({
        type: 'NOTIFICATION',
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
        type: 'NOTIFICATION',
        data: 'Information updated'
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
        })
      }, 3000)
    }
  }
}
export default { initializeArtworks, createArtwork }