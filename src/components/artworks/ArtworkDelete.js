import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteArtwork } from '../../reducers/actionCreators/artworkActions'
import { Button } from 'react-bootstrap'
import cloudinaryOptimize from '../../utils/cloudinary-optimize'

const ArtworkDelete = ({ artwork }) => {
  const dispatch = useDispatch()

  const removeArtwork = (id) => {
    return () => {
      if (window.confirm('Do you want to delete this artwork?')) {
        dispatch(deleteArtwork(id))
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
            src={cloudinaryOptimize(artwork.galleryImage, 400)}
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

export default ArtworkDelete
