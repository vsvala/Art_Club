import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import DeleteButton from '../common/DeleteButton'
//const BASE_URL= 'http://localhost:3001/'
import url from '../../services/config'
import { voteArtwork } from '../../reducers/artworkReducer'
import { notify } from '../../reducers/notificationReducer'
const baseUrl = url + 'public/'
//const baseurl=process.env.PUBLIC_URL

const Artwork = ({ artwork,  onClick, notify,  voteArtwork }) => {

  const addLike = (artwork) => {
    console.log(artwork, 'päänestetääänblogi')
    return () => {
      // const likedArtwork = artworks.find(n => n.id === blog.id)
      const artworkObject = { ...artwork, likes: artwork.likes + 1 }
      console.log(artworkObject, 'päänestetääänuusObject')
      voteArtwork(artworkObject) //actioncreator kutsu
      notify(`Artworkn ${artworkObject.title} by ${artwork.artist} like added`, 5)
      //   })
      //   .catch(error => {
      //     this.setState({
      //       error: `Blogin '${blogObject.title}' likejen päivitys epäonnistui, voit likettää yhtä blogia vain yhden kerran loggautumisesi yhteydessä`,
      //     // blogs: this.state.blogs.filter(n => n.id !==blog.id)
      //     })

    }
  }
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
            src={ baseUrl +`${ artwork.galleryImage }`}
            //width='300'
            //height='auto'
            className='galleryPicture'
            alt='img'
          /></li>
        <li className="artwork"> <Link to={`/artworks/${artwork.id}`}> {artwork.name} </Link>
         by { artwork.artist }, { artwork.year }, { artwork.size }, { artwork.medium }</li>
        {/*       <li className="size"> { artwork.size }</li>
         <li className="medium"> { artwork.medium }</li>
          <li className="artist"> { artwork.artist }</li> */}
        <li className="artist"> { artwork.galleryImage }</li>
        <p>{artwork.likes}likes < button onClick={addLike(artwork)}>like</button></p>
        <p>Added by {artwork.user.name}</p>
        <li className="delete"><DeleteButton id={artwork.id} onClick={onClick}  />TODO DELETE hidden vain adminille</li>
      </ul>
    </div>
  )
}
export default connect(
  null,
  { notify, voteArtwork,  }
)(Artwork)
