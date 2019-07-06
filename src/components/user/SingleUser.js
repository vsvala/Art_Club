import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeSingleUser }  from '../../reducers/actionCreators/userActions'
import userActions from '../../reducers/actionCreators/userActions'


export const SingleUser = ({
  user,
  initializeSingleUser,
  userId,
}) => {

  useEffect(() => {
    initializeSingleUser(userId)
  }, [])


  return (
    <div className="singleUser">
      <h2>My page</h2>
      <h5>TODO  my artworks and link to add or  my info : role , email etc..update detais?,</h5>
      <div className="user">
        {!user ?
          null
          :
          <div>
            <h2>{user.name} {user.username}</h2>
            <ul>
              <li>{user.role}</li>
            </ul>
          </div>
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.singleUser.singleUser
  }
}

export default connect(
  mapStateToProps,
  { ...userActions, initializeSingleUser }
)(SingleUser)
