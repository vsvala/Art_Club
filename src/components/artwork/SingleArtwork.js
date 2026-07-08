import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import artworkService from '../../services/artworks'
import cloudinaryOptimize from '../../utils/cloudinary-optimize'

export const SingleArtwork = () => {
  const { id } = useParams()
  const { data: artwork, isLoading } = useQuery({
    queryKey: ['artwork', id],
    queryFn: () => artworkService.getSingleArtwork(id),
  })

  if (isLoading) return <p>Ladataan...</p>
  if (!artwork) return null

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

export default SingleArtwork
