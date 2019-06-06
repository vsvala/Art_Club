import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeArtworks } from '../reducers/actionCreators/artworkActions'
import { Table } from 'react-bootstrap'
import Artwork from './Artwork'

export const ArtworkList = ({ artworkList, initializeArtworks }) => {
  useEffect(() => {
    // if (artworks.length === 0) {
    console.log('initialiList')
    initializeArtworks()
    // }
  }, [])

  return (
    <div className="artworkList">
      <h2>Artworks</h2>

      <Table bordered hover>
        <thead>
          <tr>
            <th>image</th>
            <th>Artist</th>
            <th>Name</th>
            <th>Year</th>
            <th >Size</th>
            <th className='centerColumn' >Medium</th>
          </tr>
        </thead>
        <tbody>
          {console.log('artworks..hhh',artworkList)}
          {artworkList
            .map(artwork =>
              <Artwork
                artwork={artwork}
                key={artwork.id}//artwork_id
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
  { initializeArtworks }
)(ArtworkList)

