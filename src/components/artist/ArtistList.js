import React, { useEffect } from 'react'
import Artist from './Artist'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import { getArtists } from '../../reducers/actionCreators/userActions'


export const ArtistList = ({ userArray, getArtists }) => {
  useEffect(() => {
    // if (userArray.artworks.length===0) {
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
            {/* artworks lista nimistä vai töiden määrä ?*/}
          </tr>
        </thead>

        <tbody>
          { userArray&&userArray.map(user =>
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
  console.log('statefromUSerList userarray', state.users.users)

  return {
    userArray: state.users.users
  }
}

export default connect(
  mapStateToProps,
  { getArtists }
)(ArtistList)
