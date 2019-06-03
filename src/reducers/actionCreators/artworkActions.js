import artworkService from '../../services/artworks'
//import { notify, setError } from './notificationActions'

// tells artworkService to get all artworks from database and dispatch them to store
export const initializeArtworks = () => {
  return async (dispatch) => {
    const content = await artworkService.getAll()
    dispatch({
      type: 'INIT_ARTWORKS',
      data: content
    })
  }
}
export default { initializeArtworks }