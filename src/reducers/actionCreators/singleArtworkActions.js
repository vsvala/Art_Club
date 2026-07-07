import artworkService from '../../services/artworks'
import tokenCheckService from '../../services/tokenCheck'

export const initializeSingleArtwork = (artworkId) => {
  return async (dispatch) => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedInUser'))
    if (loggedUser && loggedUser.token) {
      const token = loggedUser.token
      const response = await tokenCheckService.userCheck(token)
      if (response.message === 'success') {
        await artworkService.setToken(loggedUser.token)
      }
    }
    const content = await artworkService.getSingleArtwork(artworkId)
    dispatch({ type: 'INIT_SINGLE_ARTWORK', data: content })
  }
}
