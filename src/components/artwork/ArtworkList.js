import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import artworkService from '../../services/artworks'
import {
  deleteArtwork,
  voteArtwork,
} from '../../reducers/actionCreators/artworkActions'
import filterActions from '../../reducers/actionCreators/filterActions'
import { Link } from 'react-router-dom'
import DeleteButton from '../common/DeleteButton'
import { Form, Button } from 'react-bootstrap'
import cloudinaryOptimize from '../../utils/cloudinary-optimize'

export const ArtworkList = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const loggedUser = useSelector((state) => state.loggedUser.loggedUser)
  const artworkName = useSelector((state) => state.filter.artworkName)

  const { data: artworks = [], isLoading } = useQuery({
    queryKey: ['artworks'],
    queryFn: artworkService.getAll,
  })
  const visibleArtworks = useMemo(() => {
    const normalizedArtworkName = (artworkName || '').toLowerCase()

    return Array.isArray(artworks)
      ? [...artworks]
          .sort((a, b) => b.likes - a.likes)
          .filter(
            (artwork) =>
              artwork.name.toLowerCase().includes(normalizedArtworkName) ||
              artwork.artist.toLowerCase().includes(normalizedArtworkName),
          )
      : []
  }, [artworks, artworkName])

  const handleArtworkNameChange = (event) => {
    event.preventDefault()
    dispatch(filterActions.setArtworkName(event.target.value))
  }

  const addLike = (artwork) => async () => {
    await dispatch(voteArtwork({ ...artwork, likes: artwork.likes + 1 }))
    queryClient.invalidateQueries(['artworks'])
  }

  const removeArtwork = (id) => async () => {
    if (window.confirm('Do you want to delete this artwork?')) {
      await dispatch(deleteArtwork(id))
      queryClient.invalidateQueries(['artworks'])
    }
  }

  const canDeleteArtwork = loggedUser?.role === 'admin'
  if (isLoading) return <p>Ladataan...</p>

  return (
    <div className="artworkList">
      <h2 className="galleryTitle">Gallery</h2>
      <div className="galleryHeader">
        <Form.Control
          style={{ margin: '0 auto', maxWidth: '300px' }}
          placeholder="Search artwork or artist"
          className="filterInput"
          value={artworkName}
          onChange={handleArtworkNameChange}
        />
      </div>

      <div className="artworkGallery">
        {visibleArtworks.map((a) => (
          <ul key={a.id} className="ulList">
            <li>
              <img
                src={cloudinaryOptimize(a.galleryImage, 400)}
                className="galleryPicture"
                alt="img"
                loading="lazy"
              />
            </li>
            <li className="artwork">
              {' '}
              <Link to={`/artworks/${a.id}`}> {a.name} </Link> by {a.artist}
            </li>
            <li>
              {a.year}, {a.size}, {a.medium}
            </li>
            <p>
              {a.likes} likes{' '}
              {loggedUser && (
                <Button
                  className="button"
                  onClick={addLike(a)}
                  variant="outline-secondary"
                >
                  like
                </Button>
              )}
            </p>

            {canDeleteArtwork ? (
              <li className="delete">
                <DeleteButton id={a.id} onClick={removeArtwork} />
              </li>
            ) : (
              <em></em>
            )}
          </ul>
        ))}
      </div>
    </div>
  )
}

export default ArtworkList
