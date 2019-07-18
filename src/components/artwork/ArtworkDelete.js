import React from 'react'
import { Link } from 'react-router-dom'
//import DeleteButton from '../common/DeleteButton'

import { connect } from 'react-redux'
import { deleteArtwork } from '../../reducers/actionCreators/artworkActions'
import {  Button } from 'react-bootstrap'

/* eslint-disable */
const BASE_URL= 'http://localhost:3001/'

const ArtworkDelete = ({ artwork, deleteArtwork }) => {

  
  //event handler for deleting specific  artworkn
  const removeArtwork= (id) => {
    return () => {
      if (window.confirm('Do you want to delete this artwork?')) {
        deleteArtwork(id)//, loggedUser.user.user_id
      }
    }
  }

  return (
    <div className="artworkThumb">
      <ul Style="list-style-type:none;">
      <li>
        <img
       src={ BASE_URL +`${ artwork.galleryImage }`}
       width='300'
       height='auto'
       className='singlepicture'
       alt='img'
        /> 
       </li>
        <li className="artwork"> <Link to={`/artworks/${artwork.id}`}> {artwork.name} </Link>
         by { artwork.artist }</li>
         <li> { artwork.year }, { artwork.size }, { artwork.medium }</li>
         <li>  <Button className="button" onClick={removeArtwork(artwork.id)} variant="outline-secondary" type="submit" >
      Delete
          </Button></li>   <br/>
        {/*         <li className="delete"><DeleteButton id={artwork.id} onClick={removeArtwork(artwork.id)} /></li>*/}      
        </ul>
    </div>
  )
}

export default connect(
  null,
  { deleteArtwork }
)(ArtworkDelete)
