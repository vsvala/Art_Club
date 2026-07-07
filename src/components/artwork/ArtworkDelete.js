import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteArtwork } from '../../reducers/actionCreators/artworkActions'
import { Button } from 'react-bootstrap'

const ArtworkDelete = ({ artwork, deleteArtwork }) => {
  const removeArtwork = (id) => {
    return async () => {
      if (window.confirm('Do you want to delete this artwork?')) {
        await deleteArtwork(id)
      }
    }
  }

  return (
    <div className="artworkThumb">
      <ul
        style={{
          listStyleType: 'none',
        }}
      >
        <li>
          <img
            src={artwork.galleryImage}
            className="galleryPicture"
            alt="img"
          />
        </li>
        <li className="artwork">
          <Link to={`/artworks/${artwork.id}`}> {artwork.name} </Link>
          by {artwork.artist}
        </li>
        <li>
          {artwork.year}, {artwork.size}, {artwork.medium}
        </li>
        <li>
          <Button
            className="button"
            onClick={removeArtwork(artwork.id)}
            variant="outline-secondary"
            type="submit"
          >
            Delete
          </Button>
        </li>
        <br />
      </ul>
    </div>
  )
}

export default connect(null, { deleteArtwork })(ArtworkDelete)
