import React from 'react'

const Artwork = ({ artwork }) => {
  // the course version is chosen accordingly to if loggedUser has applied to the course


  return (
    //TODO muuta listaksi.//kuvagalleriaksi..grid
    //HAku tietyn taiteilijan sivulle..?
    <tr className="artwork">

      <td className="image"> { artwork.image }</td>
      <td className="artist"> { artwork.artist }</td>
      <td className="name"> { artwork.name} </td>
      <td className="year"> { artwork.year }</td>
      <td className="size"> { artwork.size }</td>
      <td className="medium"> { artwork.medium }</td>


    </tr>

  )
}

export default Artwork
