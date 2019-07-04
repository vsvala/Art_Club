import React, { useEffect } from 'react'
import User from './User'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import { getUsers, deleteUser } from '../../reducers/actionCreators/userActions'

//TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!alkuun  listanonmembers jotka täytyy hyväksyä,??värikodi?? loppuun hyväksytyt


export const UserList = ({ userArray, getUsers, deleteUser }) => {
  useEffect(() => {
    // if (userList.length===0) {
    console.log('initialiList')
    getUsers()
    // }
  }, [])
  //console.log('propsoooooooooooooo', props)

  const removeUser = (id) => {
    return () => {
      if (window.confirm('Do you want to delete this user?')) {
        deleteUser(id)//, loggedUser.user.user_id
      }
    }
  }

  return (

    <div className="userList">
      <h2>Users</h2>
      <br/>
      <Table bordered hover>
        <thead>
          <tr>
            {/* <th>UserId</th> */}
            <th>name</th>
            <th>username</th>
            <th>status</th>
            <th>email</th>
            <th>artworks</th>
            <th>delete</th>
            {/* artworks lista vai töiden määrä tuleeko tämä edes tähän?/tarviiko
            TODO  aprove status..*/}

          </tr>
        </thead>

        <tbody>

          { userArray&&userArray.map(user =>
            <User  user={user}
              key={user.id}
              onClick={removeUser}/>
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
  { getUsers, deleteUser }
)(UserList)
