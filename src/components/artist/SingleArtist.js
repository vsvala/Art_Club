import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {  initializeSingleArtist }  from '../../reducers/actionCreators/userActions'
import { initLoggedUser } from '../../reducers/actionCreators/loginActions'
import userActions from '../../reducers/actionCreators/userActions'
const BASE_URL= 'http://localhost:3001/'


export const SingleArtist = ({
  artistToShow,
  userId,
  initializeSingleArtist,
  initLoggedUser,
  loggedUser
}) => {

  useEffect(() => {
    initializeSingleArtist(userId) &&
    initLoggedUser()
    console.log('initializeSingleUser(userId)')
  }, [])


  return (
    <div className="singleUser">
      {/* <h2>My page</h2> */}
      <div className="user">
        {!artistToShow ?
          null
          :
          <div>
            {/* {userToShow&&userToShow} */}
            <h2>{artistToShow.name}</h2>
            <br/>
            {loggedUser && loggedUser.role==='member' | loggedUser.role==='admin'
              ? <p>name: {artistToShow.username}, mail: {artistToShow.email}, role: {artistToShow.role}</p>
              : <em></em>}
            {/* <h3>Artworks</h3> */}
            {artistToShow.artworks && artistToShow.artworks
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
  console.log('state.singlea.singlA', state)

  return {
    artistToShow: state.singleArtist.singleArtist,
    loggedUser: state.loggedUser.loggedUser
  }
}

export default connect(
  mapStateToProps,
  { ...userActions, initializeSingleArtist, initLoggedUser  }
)(SingleArtist)
