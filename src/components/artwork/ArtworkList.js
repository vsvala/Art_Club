import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeArtworks,  deleteArtwork } from '../../reducers/actionCreators/artworkActions'
import { Table } from 'react-bootstrap'
import Artwork from './Artwork'

export const ArtworkList = ({ deleteArtwork, initializeArtworks, artworkList }) => { // => {
  useEffect(() => {
    // if (artworks.length === 0) {
    console.log('initialiList')
    initializeArtworks()
    // }
  }, [])
  //little thumbernail pictures
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
      <h2>Gallery</h2>
      <br/>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Year</th>
            <th >Size</th>
            <th>Medium</th>
            <th>Artist</th>
          </tr>
        </thead>
        <tbody>
          {console.log('artworks..hhh',artworkList)}
          {artworkList
            .map(artwork =>
              <Artwork
                artwork={artwork}
                key={artwork.id}//artwork_id
                onClick={removeArtwork}
              />
            )}
        </tbody>
      </Table>
    </div>

  )
}

const mapStateToProps = (state) => {
  console.log('state', state.artworks.artworks)

  return {
    artworkList: state.artworks.artworks
  }
}


export default connect(
  mapStateToProps,
  { initializeArtworks, deleteArtwork }
)(ArtworkList)

