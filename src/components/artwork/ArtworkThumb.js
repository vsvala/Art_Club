import React from 'react'
import { Link } from 'react-router-dom'
import DeleteButton from '../common/DeleteButton'
const BASE_URL= 'http://localhost:3001/'

const Artwork = ({ artwork,  onClick }) => {

  return (

    <div className="artworkThumb">

      <ul Style="list-style-type:none;">
        <li>
          <img
            src={ BASE_URL+`${ artwork.galleryImage }`}
            width='75'
            height='auto'
            className='thumbPicture'
            alt='img'
          /></li>
        <li className="artwork"> <Link to={`/artworks/${artwork.id}`}> {artwork.name} </Link></li>
        <li className="delete"><DeleteButton id={artwork.id} onClick={onClick} /></li>
      </ul>
    </div>
  )
}

export default Artwork
