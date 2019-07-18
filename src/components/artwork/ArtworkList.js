import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeArtworks,  deleteArtwork } from '../../reducers/actionCreators/artworkActions'
import filterActions from '../../reducers/actionCreators/filterActions'
import { initLoggedUser } from '../../reducers/actionCreators/loginActions'
import { Link } from 'react-router-dom'
import DeleteButton from '../common/DeleteButton'
import url from '../../services/config'
import { Form } from 'react-bootstrap'

const baseUrl = url + 'public/'

/* eslint-disable */
//const BASE_URL= process.env.PUBLIC_URL  //'http://localhost:3001/'
/* eslint-enable */

//import Artwork from './Artwork'

export const ArtworkList = ({ deleteArtwork, initializeArtworks, artworks, loggedUser,  initLoggedUser, filter,  setArtworkName }) => { // => {
  useEffect(() => {
    // if (artworks.length === 0) {
    console.log('initialiList')
    initializeArtworks() &&
    initLoggedUser()
    // }
  }, [])

  const handleArtworkNameChange = (event) => {
    event.preventDefault()
    setArtworkName(event.target.value)
  }


  //TODO search by artist or by artwork...order alphabetically by ainting and artist
  //event handler for deleting specific course application, tells studentactions to deleteApliedCourse
  const removeArtwork = (id) => {
    return () => {
      if (window.confirm('Do you want to delete this artwork?')) {
        deleteArtwork(id)//, loggedUser.user.user_id
      }
    }
  }

  return (
    <div className="artworkList">

      <div style={{ float: 'right' }}>
        {/* <div style={{ color: '#6c757d' }}> Filter:</div> */}
        <Form.Control
          placeholder='Search artwork or artist'
          className='filterInput'
          value={filter.name}
          onChange={handleArtworkNameChange} />
      </div>


      <h2>Gallery</h2>

      <br/>
      {console.log('artworks..hhh',artworks)}
      <div>
        { artworks
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
              <li className="artwork"> <Link to={`/artworks/${a.id}`}> {a.name} </Link>
         by { a.artist }, { a.year }, { a.size }, { a.medium }</li>

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
  { initializeArtworks, deleteArtwork, initLoggedUser, ...filterActions  }
)(ArtworkList)

