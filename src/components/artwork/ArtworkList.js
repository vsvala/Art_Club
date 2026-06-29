import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeArtworks, deleteArtwork } from '../../reducers/actionCreators/artworkActions'
import filterActions from '../../reducers/actionCreators/filterActions'
import { Link } from 'react-router-dom'
import DeleteButton from '../common/DeleteButton'
import { Form, Button } from 'react-bootstrap'
import { voteArtwork } from '../../reducers/actionCreators/artworkActions'
import { notify } from '../../reducers/actionCreators/notificationActions'

export const ArtworkList = ({ deleteArtwork, initializeArtworks, artworks, loggedUser, filter, setArtworkName, voteArtwork }) => {
  useEffect(() => {
    initializeArtworks()
  }, [])

  const handleArtworkNameChange = (event) => {
    event.preventDefault()
    setArtworkName(event.target.value)
  }

  const addLike = (artwork) => {
    return () => {
      const likedArtwork = artworks.find(n => n.id === artwork.id)
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

  return (
    <div className="artworkList">
      <div style={{ float: 'right' }}>
        <Form.Control
          placeholder='Search artwork or artist'
          className='filterInput'
          value={filter.name}
          onChange={handleArtworkNameChange} />
      </div>

      <div style={{ marginLeft: '25%' }}>
        <h2>Gallery</h2>
      </div>

      <div>
        { artworks && artworks.sort((a, b) => b.likes - a.likes)
          .filter(artwork =>
            artwork.name.toLowerCase().includes(filter.artworkName.toLowerCase())
            || artwork.artist.toLowerCase().includes(filter.artworkName.toLowerCase())
          )
          .map(a =>
            <ul key={a.id} className='ulList'>
              <li><img
                src={a.galleryImage}
                className='galleryPicture'
                alt='img'
              /></li>
              <li className="artwork"> <Link to={`/artworks/${a.id}`}> {a.name} </Link> by { a.artist }</li>
              <li>{ a.year }, { a.size }, { a.medium }</li>
              <p>{a.likes} likes <Button className="button" onClick={addLike(a)} variant="outline-secondary">like</Button></p>

              {loggedUser && loggedUser.role === 'admin'
                ? <li className="delete"><DeleteButton id={a.id} onClick={removeArtwork} /></li>
                : <em></em>}
            </ul>
          )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    artworks: state.artworks.artworks,
    loggedUser: state.loggedUser.loggedUser,
    filter: {
      artworkName: state.filter.artworkName
    }
  }
}

export default connect(
  mapStateToProps,
  { initializeArtworks, deleteArtwork, ...filterActions, notify, voteArtwork }
)(ArtworkList)
