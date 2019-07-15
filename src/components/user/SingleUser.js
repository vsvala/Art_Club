import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {  initializeSingleUser }  from '../../reducers/actionCreators/userActions'
import { initLoggedUser } from '../../reducers/actionCreators/loginActions'
import userActions from '../../reducers/actionCreators/userActions'
const BASE_URL= 'http://localhost:3001/'


export const SingleUser = ({
  userToShow,
  userId,
  initializeSingleUser,
  initLoggedUser,
  loggedUser
}) => {

  useEffect(() => {
    initializeSingleUser(userId) &&
    initLoggedUser()
    console.log('initializeSingleUser(userId)')
  }, [])


  return (
    <div className="singleUser">
      {/* <h2>My page</h2> */}
      <div className="user">
        {!userToShow ?
          null
          :
          <div>
            {/* {userToShow&&userToShow} */}
            <h2>{userToShow.name}</h2>
            <br/>
            {loggedUser && loggedUser.role==='member' | loggedUser.role==='admin'
              ? <p>name: {userToShow.username}, mail: {userToShow.email}, role: {userToShow.role}</p>
              : <em></em>}
            {/* <h3>Artworks</h3> */}
            {userToShow.artworks && userToShow.artworks
              .map(a =>
                (<ul key={a.id}  className='ulList'>
                  {/* <div className='singleUserPicture'> */}
                  <li>
                    <img
                      src={ BASE_URL+`${ a.galleryImage }`}
                      width='300'
                      height='auto'
                      className='singlepicture'
                      alt='img'
                    />  </li>
                  <li>  {a.name}</li>
                </ul> ))
            }
          </div>
        }
      </div>
      <br/>
      {/* <h5>TODO  link to add or  update detais?,</h5> */}
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log('state.singleUser.singleUser', state)

  return {
    userToShow: state.singleUser.singleUser,
    loggedUser: state.loggedUser.loggedUser
  }
}

export default connect(
  mapStateToProps,
  { ...userActions, initializeSingleUser, initLoggedUser  }
)(SingleUser)
