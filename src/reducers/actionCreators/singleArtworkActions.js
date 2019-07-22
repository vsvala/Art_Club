import artworkService from '../../services/artworks'

// tells studentservice to get specific student by id from database
export const initializeSingleArtwork = (artworkId) => {
  console.log('initializeSingleArtwork')
  return async (dispatch) => {
    const content = await artworkService.getSingleArtwork(artworkId)
    dispatch({
      type: 'INIT_SINGLE_ARTWORK',
      data: content
    })
  }
}
