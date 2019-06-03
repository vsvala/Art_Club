import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeArtworks } from '../reducers/actionCreators/artworkActions'
import { Table } from 'react-bootstrap'
import Artwork from './Artwork'

export const ArtworkList = (artworks, initializeArtworks) => {

  useEffect(() => {
    if (artworks.length === 0) {
      initializeArtworks()
    }
  }, [])

  return (
    <div className="artworkList">
      <h2>Artworks</h2>

      <Table bordered hover>
        <thead>
          <tr>
            <th>Artist</th>
            <th>Name</th>
            <th className='centerColumn' >Year</th>
            <th className='centerColumn' >Size</th>
            <th className='centerColumn' >Medium</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {artworks
            .map(artwork =>
              <Artwork
                artwork={artwork}
                key={artwork.artwork_id}
              />
            )}
        </tbody>
      </Table>
    </div>

  )
}

const mapStateToProps = (state) => {
  return {
    artworks: state.artwork.artworks
  }
}


export default connect(
  mapStateToProps,
  { initializeArtworks }
)(ArtworkList)

