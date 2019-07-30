import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeArtworks,  deleteArtwork } from '../../reducers/actionCreators/artworkActions'
import filterActions from '../../reducers/actionCreators/filterActions'
import { Link } from 'react-router-dom'
import DeleteButton from '../common/DeleteButton'
import url from '../../services/config'
import { Form } from 'react-bootstrap'
import { voteArtwork } from '../../reducers/actionCreators/artworkActions'
import { notify } from '../../reducers/actionCreators/notificationActions'
import {  Button } from 'react-bootstrap'
const baseUrl = url + 'public/'
import { BrowserRouter as Router, Route } from 'react-router-dom'

/* eslint-disable */
//const BASE_URL= process.env.PUBLIC_URL  //'http://localhost:3001/'
/* eslint-enable */
//import Artwork from './Artwork'

export const ArtworkList = ({ deleteArtwork, initializeArtworks, artworks, loggedUser, filter,  setArtworkName, voteArtwork }) => {
  useEffect(() => {
    // if (artworks.length === 0) {
    console.log('initialiList')
    initializeArtworks()
    // }
  }, [])

  const handleArtworkNameChange = (event) => {
    event.preventDefault()
    setArtworkName(event.target.value)
  }

  const addLike = (artwork) => {
    console.log('liking',artwork )
    return () => {
      const likedArtwork = artworks.find(n => n.id === artwork.id)
      const artworkObject = { ...likedArtwork, likes: artwork.likes + 1 }
      console.log('liking Object', artworkObject)
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
      <Router>
        <Route exact path="/artworks" render={() => <ArtworkList/>} />
      </Router>


      {/* Search form */}
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

      {console.log('artworks..hhh',artworks&&artworks)}
      <div>
        { artworks&&artworks.sort((a, b) => b.likes - a.likes)
          .filter(artwork =>
            artwork.name.toLowerCase().includes(filter.artworkName.toLowerCase())
          ||   artwork.artist.toLowerCase().includes(filter.artworkName.toLowerCase())
          )
          .map(a =>
            <ul key={a.id}  className='ulList'>
              <li><img
                src={ baseUrl+`${ a.galleryImage }`}
                // width='300'
                // height='auto'
                className='galleryPicture'
                alt='img'
              /></li>
              <li className="artwork"> <Link to={`/artworks/${a.id}`}> {a.name} </Link> by { a.artist }</li>
              <li>{ a.year }, { a.size }, { a.medium }</li>
              <p>{a.likes} likes < Button  className="button" onClick={addLike(a)} variant="outline-secondary" >like</Button></p>
              {/* <p>Added by {a.user.name}</p> */}

              {loggedUser && loggedUser.role==='admin'
                ? <li className="delete"><DeleteButton id={a.id} onClick={removeArtwork} /></li>
                : <em></em>}
            </ul>
          )}
      </div>
    </div>   )
}

//  {console.log('artworks..hhh',artworkList)}
//       {artworkList
//         .map(artwork =>
//           <Artwork
//             artwork={artwork}
//             key={artwork.id}//artwork_id
//             onClick={removeArtwork}
//           />
//         )}
//     </div>


const mapStateToProps = (state) => {
  console.log('state', state.artworks.artworks)

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

