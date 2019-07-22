import React from 'react'
import { connect } from 'react-redux'
import url from '../../services/config'
const baseUrl = url + 'public/'
//const BASE_URL= 'http://localhost:3001/'

export const SingleArtwork = ({
  artworks,
  artworkId
}) => {

  const artwork=artworks.find(a => a.id===artworkId)

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
    artworks:state.artworks.artworks
  }
}

export default connect(
  mapStateToProps,
  {  }
)(SingleArtwork)