import artworkService from '../../services/artworks'

export const initializeSingleArtwork = (artworkId) => {
  return async (dispatch) => {
    const content = await artworkService.getSingleArtwork(artworkId)
    dispatch({ type: 'INIT_SINGLE_ARTWORK', data: content })
  }
}
