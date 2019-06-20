import React, { useEffect } from 'react'
import User from './User'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import { getUsers } from '../../reducers/actionCreators/userActions'


export const UserList = ({ userArray, getUsers }) => {
  useEffect(() => {
    // if (userList.length===0) {
    console.log('initialiList')
    getUsers()
    // }
  }, [])
  //console.log('propsoooooooooooooo', props)


  return (

    <div className="userList">
      <h2>Users</h2>
      <Table bordered hover>
        <thead>
          <tr>
            <th>UserId</th>
            <th>name</th>
            <th>username</th>
            <th>status</th>
            <th>email</th>
            <th>artworks</th>
            {/* artworks lista vai töiden määrä tuleeko tämä edes tähän?/tarviiko
            TODO  aprove status..*/}

          </tr>
        </thead>

        <tbody>

          { userArray&&userArray.map(user => <User  user={user} key={user.id} />
          )}
        </tbody>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log('state', state.users.users)

  return {
    userArray: state.users.users
  }
}

export default connect(
  mapStateToProps,
  { getUsers }
)(UserList)
