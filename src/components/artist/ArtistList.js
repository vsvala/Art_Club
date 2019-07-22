import React, { useEffect } from 'react'
import Artist from './Artist'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import { getArtists } from '../../reducers/actionCreators/userActions'


export const ArtistList = ({ artistsToShow, getArtists }) => {
  useEffect(() => {
    // if (artistsToShow.artworks.length===0) {
    console.log('initialiList')
    getArtists()
    // }
  }, [])



  return (

    <div className="artistList">
      <h2>Artists</h2>

      <Table hover size='sm'>
        <thead>
          <tr>
            <th>name</th>
            <th>artworks</th>
          </tr>
        </thead>

        <tbody>
          { artistsToShow&&artistsToShow.map(user =>
            <Artist  user={user}
              key={user.id}
              artworks={user.artworks}
            />
          )}
        </tbody>
      </Table>
    </div>
  )}

const mapStateToProps = (state) => {
  console.log('statefromUSerList artistsToShow', state.users.users)

  return {
    artistsToShow: state.users.users
  }
}

export default connect(
  mapStateToProps,
  { getArtists }
)(ArtistList)
