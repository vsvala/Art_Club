import React from 'react'
import { Link } from 'react-router-dom'
import DeleteButton from '../ui/DeleteButton'
import { Button } from 'react-bootstrap'
import cloudinaryOptimize from '../../utils/cloudinary-optimize'

export const ArtworkCard = ({ artwork, canLike, onLike, canDelete, onDelete }) => {
  return (
    <ul className="ulList">
      <li>
        <img
          src={cloudinaryOptimize(artwork.galleryImage, 400)}
          className="galleryPicture"
          alt="img"
          loading="lazy"
        />
      </li>
      <li className="artwork">
        {' '}
        <Link to={`/artworks/${artwork.id}`}> {artwork.name} </Link> by{' '}
        {artwork.artist}
      </li>
      <li>
        {artwork.year}, {artwork.size}, {artwork.medium}
      </li>
      <p>
        {artwork.likes} likes{' '}
        {canLike && (
          <Button
            className="button"
            onClick={onLike}
            variant="outline-secondary"
          >
            like
          </Button>
        )}
      </p>

      {canDelete ? (
        <li className="delete">
          <DeleteButton id={artwork.id} onClick={onDelete} />
        </li>
      ) : (
        <em></em>
      )}
    </ul>
  )
}

export default ArtworkCard
