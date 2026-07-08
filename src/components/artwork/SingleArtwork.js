import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { initializeSingleArtwork } from '../../reducers/actionCreators/singleArtworkActions'
import cloudinaryOptimize from '../../utils/cloudinary-optimize'

export const SingleArtwork = ({ artwork, initializeSingleArtwork }) => {
  const { id } = useParams()
  useEffect(() => {
    initializeSingleArtwork(id)
  }, [id])

  return (
    <div className="singleArtwork">
      {!artwork ? null : (
        <div>
          <img
            src={cloudinaryOptimize(artwork.galleryImage, 1200)}
            style={{ maxWidth: '100%' }}
            height="auto"
            className="singlePicture"
            alt="img"
          />
          <p>
            {artwork.name} by {artwork.artist}, year: {artwork.year}, size:
            {artwork.size}, medium:{artwork.medium}{' '}
          </p>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    artwork: state.singleArtwork.singleArtwork,
  }
}

export default connect(mapStateToProps, {
  initializeSingleArtwork,
})(SingleArtwork)
