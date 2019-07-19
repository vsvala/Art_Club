import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {  initializeSingleArtist }  from '../../reducers/actionCreators/userActions'
import { initLoggedUser } from '../../reducers/actionCreators/loginActions'
import userActions from '../../reducers/actionCreators/userActions'
import { Link } from 'react-router-dom'
import url from '../../services/config'
const baseUrl = url + 'public/'

//const BASE_URL= 'http://localhost:3001/'


export const SingleArtist = ({
  singleArtist,
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
        {!singleArtist ?
          null
          :
          <div>
            <div className='singleArtistHeader'>
              <h3>{singleArtist.name}</h3>  </div>
            {singleArtist.intro}

            <br/>
            {singleArtist.artworks && singleArtist.artworks
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
                  <li className="artwork"> <Link to={`/artworks/${a.id}`}> {a.name} </Link>
                     by { a.artist }, { a.year }, { a.size }, { a.medium }</li>
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
    singleArtist: state.singleArtist.singleArtist,
    loggedUser: state.loggedUser.loggedUser
  }
}

export default connect(
  mapStateToProps,
  { ...userActions, initializeSingleArtist, initLoggedUser  }
)(SingleArtist)
