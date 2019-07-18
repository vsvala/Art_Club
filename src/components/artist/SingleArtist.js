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
  //loggedUser
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
            <h2>{artistToShow.name}</h2>
            {/* <h2>{artistToShow.introduction}</h2> */}
            <br/>
                  Hide show Link to add My intoduction text
                  Here comes introduction text think limit lenght how many charactersMake this mox smaller

            {artistToShow.artworks && artistToShow.artworks
              .map(a =>
                (<ul key={a.id}  className='ulList'>
                  {/* <div className='singleUserPicture'> */}
                  <li>
                    <br/>
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
