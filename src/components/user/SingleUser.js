import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {  initializeSingleUser }  from '../../reducers/actionCreators/userActions'
import userActions from '../../reducers/actionCreators/userActions'


export const SingleUser = ({
  userToShow,
  userId,
  initializeSingleUser
}) => {

  useEffect(() => {
    initializeSingleUser(userId)
    console.log('initializeSingleUser(userId)')
  }, [])


  return (
    <div className="singleUser">
      <h2>My page</h2>
      <h5>TODO  link to add or  update detais?,</h5>
      <div className="user">
        {!userToShow ?
          null
          :
          <div>
            {/* {userToShow&&userToShow} */}
            <h2>{userToShow.name}</h2>

            <p>{userToShow.username}</p>
            <p>{userToShow.email}</p>
            <p>{userToShow.role}</p>
            <br/>
            <h2>Artworks:</h2>
            <ul>
              {userToShow.artworks && userToShow.artworks
                .map(a =>
                  (<div key={a.id}>
                    {a.name} by
                    {a.artist}
                    {a.galleryImage}
                  </div>))
              }
            </ul>
          </div>
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log('state.singleUser.singleUser', state)

  return {
    userToShow: state.singleUser.singleUser
  }
}

export default connect(
  mapStateToProps,
  { ...userActions, initializeSingleUser }
)(SingleUser)
