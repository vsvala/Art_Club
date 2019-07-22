import React, { useEffect } from 'react'//, { useEffect } 
import { connect } from 'react-redux'
import singleArtworkActions from '../../reducers/actionCreators/singleArtworkActions'
import { initializeSingleArtwork }  from '../../reducers/actionCreators/singleArtworkActions'
import url from '../../services/config'
const baseUrl = url + 'public/'
//const BASE_URL= 'http://localhost:3001/'


export const SingleArtwork = ({
  artwork,
  initializeSingleArtwork,
  artworkId
}) => {

  useEffect(() => {
    initializeSingleArtwork(artworkId)
  }, [])

  // const artwork=artworks.find(a => a.id===artworkId)


  return (

    <div className="singleArtwork">
      {!artwork ?
        null
        :
        <div>
          <img
            src={ baseUrl +`${ artwork.galleryImage }`}
            width='700'
            height='auto' //'550'
            className='singlePicture'
            alt='img'
          />
          <p>{artwork.name} by {artwork.artist} year: {artwork.year}, size:{artwork.size}, medium:{artwork.medium} </p>
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    artwork: state.singleArtwork.singleArtwork,
    //artworks:state.artworks.artworks
  }
}

export default connect(
  mapStateToProps,
  { ...singleArtworkActions, initializeSingleArtwork }
)(SingleArtwork)