import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {  initializeSingleUser }  from '../../reducers/actionCreators/userActions'
//import { initLoggedUser } from '../../reducers/actionCreators/loginActions'
import userActions from '../../reducers/actionCreators/userActions'
import { Link } from 'react-router-dom'
import url from '../../services/config'
const baseUrl = url + 'public/'
//const BASE_URL= 'http://localhost:3001/'


export const SingleArtist= ({
  singleUser,
  userId,
  initializeSingleUser,
  // getArtists(),
  //loggedUser
}) => {

  useEffect(() => {
    initializeSingleUser(userId)
    console.log('initializeSingleUser(userId)')
  }, [])



  return (
    <div className="singleUser">
      <div className="user">
        {!singleUser?
          null
          :
          <div>
            <div className='singleArtistHeader'>
              <h3>{singleUser.name}</h3>  </div>
            {singleUser.intro}

            <br/>
            {singleUser.artworks && singleUser.artworks
              .map(a =>
                (<ul key={a.id}  className='ulList'>
                  {/* <div className='singleUserPicture'> */}
                  <li>
                    <br/>
                    <img
                      src={ baseUrl+`${ a.galleryImage }`}
                      //src={ BASE_URL+`${ a.galleryImage }`}
                      width='300'
                      height='auto'
                      className='singlepicture'
                      alt='img'
                    />  </li>
                  <li className="artwork"> <Link to={`/artworks/${a.id}`}> {a.name} </Link> by { a.User}</li>
                  <li>{ a.year }, { a.size }, { a.medium }</li>
                </ul> ))
            }
          </div>
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log('state.singlea.singlu', state)

  return {
    singleUser: state.singleUser.singleUser,
    //userToShow: state.users.users
  }
}

export default connect(
  mapStateToProps,
  { ...userActions, initializeSingleUser }
)(SingleArtist)
