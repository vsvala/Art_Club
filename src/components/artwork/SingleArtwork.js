import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import singleArtworkActions from '../../reducers/actionCreators/singleArtworkActions'
import { initializeSingleArtwork }  from '../../reducers/actionCreators/singleArtworkActions'
const BASE_URL= 'http://localhost:3001/'
//import { Table, Button } from 'react-bootstrap'

export const SingleArtwork = ({
  artwork,
  initializeSingleArtwork,
  artworkId
}) => {

  useEffect(() => {
    initializeSingleArtwork(artworkId)
  }, [])

  return (
    <div>
        TODO picture sizing
      <div className="courseHeader">
        {!artwork ?
          null
          :
          <div>
            <img
              src={ BASE_URL+`${ artwork.galleryImage }`}
              width='600'
              height='auto'
              className='galleryPicture'
              alt='img'
            />
            <h2>{artwork.name} by {artwork.artist}</h2>
            <p>year: {artwork.year}, size:{artwork.size}, medium:{artwork.medium} </p>

          </div>
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    artwork: state.singleArtwork.singleArtwork
  }
}

export default connect(
  mapStateToProps,
  { ...singleArtworkActions, initializeSingleArtwork }
)(SingleArtwork)