import artworkService from '../../services/artworks'
import tokenCheckService from '../../services/tokenCheck'

// tells studentservice to get specific student by id from database
export const initializeSingleArtwork = (artworkId) => {
  console.log('initializeSingleArtwork')
  return async (dispatch) => {
    let loggedUser = JSON.parse(window.localStorage.getItem('loggedInUser'))
    console.log('loginaction init user localstorestaaaaaaaaaaaa',loggedUser)
    if (loggedUser) {
      let token = loggedUser.token
      const response = await tokenCheckService.userCheck(token)
      if (response.message === 'success') {
        await artworkService.setToken(loggedUser.token)
        console.log(loggedUser,'userlöytyi localstoresta.tokenit asetettu')
      }
    }
    const content = await artworkService.getSingleArtwork(artworkId)
    dispatch({
      type: 'INIT_SINGLE_ARTWORK',
      data: content
    })
  }
}
