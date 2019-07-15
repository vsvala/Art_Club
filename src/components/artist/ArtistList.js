import React, { useEffect } from 'react'
import Artist from './Artist'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import { getArtists } from '../../reducers/actionCreators/userActions'

//TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!alkuun  listanonmembers jotka täytyy hyväksyä,??värikodi?? loppuun hyväksytyt


export const ArtistList = ({ userArray, getArtists }) => {
  useEffect(() => {
    // if (userList.length===0) {
    console.log('initialiList')
    getArtists()
    // }
  }, [])
  //console.log('propsoooooooooooooo', props)

  return (

    <div className="artistList">
      <h2>Artists</h2>
      <br/>
      <Table bordered hover>
        <thead>
          <tr>
            {/* <th>UserId</th> */}
            <th>name</th>
            <th>artworks</th>
            {/* artworks lista vai töiden määrä tuleeko tämä edes tähän?/tarviiko
            TODO  aprove status..*/}

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
