import React, { useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import {
  initializeArtworks,
  deleteArtwork,
} from '../../reducers/actionCreators/artworkActions'
import filterActions from '../../reducers/actionCreators/filterActions'
import { Link } from 'react-router-dom'
import DeleteButton from '../common/DeleteButton'
import { Form, Button } from 'react-bootstrap'
import { voteArtwork } from '../../reducers/actionCreators/artworkActions'
import { notify } from '../../reducers/actionCreators/notificationActions'
import cloudinaryOptimize from '../../utils/cloudinary-optimize'

export const ArtworkList = ({
  deleteArtwork,
  initializeArtworks,
  artworks,
  loggedUser,
  artworkName,
  setArtworkName,
  voteArtwork,
}) => {
  useEffect(() => {
    initializeArtworks()
  }, [])

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
    setArtworkName(event.target.value)
  }

  const addLike = (artwork) => {
    return () => {
      const likedArtwork = artworks?.find((n) => n.id === artwork.id)
      const artworkObject = { ...likedArtwork, likes: artwork.likes + 1 }
      voteArtwork(artworkObject)
    }
  }

  const removeArtwork = (id) => {
    return () => {
      if (window.confirm('Do you want to delete this artwork?')) {
        deleteArtwork(id)
      }
    }
  }
  const canDeleteArtwork = Boolean(loggedUser && loggedUser.role === 'admin')

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

const mapStateToProps = (state) => {
  return {
    artworks: state.artworks.artworks,
    loggedUser: state.loggedUser.loggedUser,
    artworkName: state.filter.artworkName,
  }
}

export default connect(mapStateToProps, {
  initializeArtworks,
  deleteArtwork,
  ...filterActions,
  notify,
  voteArtwork,
})(ArtworkList)
