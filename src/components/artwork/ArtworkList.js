import React, { useMemo, useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
  const loggedUser = useSelector((state) => state.loggedUser.loggedUser)
  const artworkName = useSelector((state) => state.filter.artworkName)

  const [page, setPage] = useState(1)
  const [artworks, setArtworks] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState(null)
  const sentinelRef = useRef(null)

  useEffect(() => {
    const loadFirstPage = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await artworkService.getPage(1, 10)
        setArtworks(data.artworks)
        setHasMore(data.hasMore)
        setPage(2)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadFirstPage()
  }, [])

  useEffect(() => {
    if (!sentinelRef.current || loading || !hasMore) return

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !loading && hasMore) {
          setLoading(true)
          setError(null)
          try {
            const data = await artworkService.getPage(page, 10)
            setArtworks((prev) => [...prev, ...data.artworks])
            setHasMore(data.hasMore)
            setPage((prev) => prev + 1)
          } catch (err) {
            setError(err.message)
          } finally {
            setLoading(false)
          }
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [page, loading, hasMore])
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
    setArtworks(
      artworks.map((a) =>
        a.id === artwork.id ? { ...a, likes: a.likes + 1 } : a,
      ),
    )
  }

  const removeArtwork = (id) => async () => {
    if (window.confirm('Do you want to delete this artwork?')) {
      await dispatch(deleteArtwork(id))
      setArtworks(artworks.filter((a) => a.id !== id))
    }
  }

  const canDeleteArtwork = loggedUser?.role === 'admin'
  if (loading && artworks.length === 0) return <p>Ladataan...</p>

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
      {error && <div className="error">{error}</div>}

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
      {loading && <p>Ladataan lisää...</p>}
      {hasMore && <div ref={sentinelRef} style={{ height: '20px' }} />}
    </div>
  )
}

export default ArtworkList
