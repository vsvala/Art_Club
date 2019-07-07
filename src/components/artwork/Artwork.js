import React from 'react'
import { Link } from 'react-router-dom'
import DeleteButton from '../common/DeleteButton'
const BASE_URL= 'http://localhost:3001/'

const Artwork = ({ artwork,  onClick }) => {
  // the course version is chosen accordingly to if loggedUser has applied to the course

  //const baseurl=process.env.PUBLIC_URL

  return (
  //TODO muuta listaksi.//kuvagalleriaksi..grid
  //HAku tietyn taiteilijan sivulle..?


    <div className="artworkGallery">
      {/* <img src='http://localhost:3001/uploads/1562020795260download.jpg'/> */}

      {/* <td className="image"> { artwork.galleryImage }</td> */}
      {/*    <img
        src={`http://localhost:3001/${ artwork.galleryImage }`}
        //'assets/{ artwork.galleryImage }'
        // <img src={process.env.PUBLIC_URL + '{ artwork.galleryImage }'} />
        width='200'
        height='200'
        className='galleryPicture'
        alt='img'
      /> */}

      {/* <img src={'%PUBLIC_URL%/uploads/15620743612820ekakesä3f 2 (1).jpg'} alt="logo" className="brand-logo"/> */}
      <ul Style="list-style-type:none;">
        <li>
          <img
          // src=  {`%PUBLIC_URL%${ artwork.galleryImage }`}   <img src={window.location.origin +'/uploads/15620743612820ekakesä3f 2 (1).jpg'} />

            // src={`${process.env.PUBLIC_URL}/${ artwork.galleryImage }`}
            // src={process.env.PUBLIC_URL+`${ artwork.galleryImage }`}
            //'assets/{ artwork.galleryImage }'
            // <img src={process.env.PUBLIC_URL + '{ artwork.galleryImage }'} />
            //src={`http://localhost:3001/${ artwork.galleryImage }`}
            src={ BASE_URL+`${ artwork.galleryImage }`}
            width='300'
            height='auto'
            className='galleryPicture'
            alt='img'
          /></li>
        <li className="artwork"> <Link to={`/artworks/${artwork.id}`}> {artwork.name} </Link>
         by { artwork.artist }, { artwork.year }, { artwork.size }, { artwork.medium }</li>
        {/*       <li className="size"> { artwork.size }</li>
         <li className="medium"> { artwork.medium }</li>
          <li className="artist"> { artwork.artist }</li> */}
        <li className="artist"> { artwork.galleryImage }</li>

        <li className="delete"><DeleteButton id={artwork.id} onClick={onClick}  />TODO DELETE hidden vain adminille</li>
      </ul>
    </div>
  )
}

export default Artwork
