import React from 'react'
import { Link } from 'react-router-dom'
import DeleteButton from '../common/DeleteButton'


const Artwork = ({ artwork,  onClick }) => {
  // the course version is chosen accordingly to if loggedUser has applied to the course

  return (
  //TODO muuta listaksi.//kuvagalleriaksi..grid
  //HAku tietyn taiteilijan sivulle..?


    <tr className="artwork">
      {/* <img src='http://localhost:3001/uploads/1562020795260download.jpg'/> */}

      {/* <td className="image"> { artwork.galleryImage }</td> */}
      <img
        src={`http://localhost:3001/${ artwork.galleryImage }`}
        //'assets/{ artwork.galleryImage }'
        // <img src={process.env.PUBLIC_URL + '{ artwork.galleryImage }'} />
        width='200'
        height='200'
        className='galleryPicture'
        alt='img'
      />
      <td> <Link to={`/artworks/${artwork.id}`}> {artwork.name} </Link></td>
      <td className="year"> { artwork.year }</td>
      <td className="size"> { artwork.size }</td>
      <td className="medium"> { artwork.medium }</td>
      <td className="artist"> { artwork.artist }</td>
      <td className="delete"><DeleteButton id={artwork.id} onClick={onClick} />
      </td>
    </tr>
  )
}

export default Artwork
