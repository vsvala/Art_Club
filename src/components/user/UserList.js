import React, { useEffect } from 'react'
import User from './User'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import { getUsers, deleteUser } from '../../reducers/actionCreators/userActions'


export const UserList = ({ userArray, getUsers, deleteUser }) => {
  useEffect(() => {
    // if (userList.length===0) {
    console.log('initialiList')
    getUsers()
    // }
  }, [])

  const removeUser = (id) => {
    return () => {
      if (window.confirm('Do you want to delete this user?')) {
        deleteUser(id)
      }
    }
  }

  return (

    <div className="userList">
      <h2>Users</h2>
      <Table bordered hover size='sm'>
        <thead>
          <tr>
            <th>name</th>
            <th>username</th>
            <th>status</th>
            <th>email</th>
            <th>artworks</th>
            <th>delete</th>
          </tr>
        </thead>

        <tbody>
          { userArray&&userArray.map(user =>
            <User  user={user}
              key={user.id}
              artworks={user.artworks}
              onClick={removeUser}/>
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
  { getUsers, deleteUser }
)(UserList)
