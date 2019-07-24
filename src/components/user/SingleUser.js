import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {  initializeSingleUser }  from '../../reducers/actionCreators/userActions'
import userActions from '../../reducers/actionCreators/userActions'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { notify } from '../../reducers/actionCreators/notificationActions'
import { deleteArtwork } from '../../reducers/actionCreators/artworkActions'
import ArtworkDelete from '../artwork/ArtworkDelete'

//const BASE_URL= 'http://localhost:3001/'


export const SingleUser = ({
  singleUser,
  userId,
  initializeSingleUser,
  loggedUser,
  //deleteArtwork
  // notify
}) => {

  useEffect(() => {
    initializeSingleUser(userId)
    console.log('initializeSingleUser(userId)')
  }, [])

  /*   const removeArtwork= (id) => {
    return () => {
      if (window.confirm('Do you want to delete this artwork?')) {
        deleteArtwork(id)//, loggedUser.user.user_id
      }
    }
  } */

  //const [intro, setIntro] = useState(loggedUser.intro&&loggedUser.intro)

  // takes new input values from the form, updates logged user
  //const handleSubmit = (event) => {
  //  event.preventDefault()

  // const input = {
  //   intro: intro

  // }
  // gives error if too long
  // if (input.intro.length > 1000) {
  //notify('Experience maximum length is 1000 characters', 5)
  // } else {
  // updateLoggedUser(input, userId)
  //notify('usends', 5)
  // }
  // }



  return (
    <div className="singleUser">
      {/* <h2>My page</h2> */}

      <div className="user">

        {!singleUser ?
          null
          :
          <div>
            {/* {singleUser&&singleUser.id} */}
            <h2>{singleUser.name}</h2>


            {loggedUser && loggedUser.role==='member' | loggedUser.role==='admin'
              ? <div>
                <Table bordered>
                  <thead>
                    <tr>
                      <th>name</th>
                      <th>username</th>
                      <th>email</th>
                      <th>status</th>
                      <th>artworks</th>
                      <th>update</th>
                      <th>Write inroduction</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{singleUser.name}</td>
                      <td>{singleUser.username}</td>
                      <td>{singleUser.email}</td>
                      <td>{singleUser.role}</td>
                      <td>{singleUser.artworks && singleUser.artworks.length}/10
                        <Link to="/users/addArtwork" className='member'>  Add</Link></td>
                      <td> <Link to='/users/update' className='member'>Update information</Link></td>
                      {/* { loggedUser.role==='member' | loggedUser.username===singleUser.username? */}
                      <td> <Link to='/users/intro' className='member'>Write introduction</Link></td>
                      {/* : null} */}
                    </tr>
                  </tbody>
                </Table>
                <br/>
                { singleUser.intro?
                  <h4>Introduction text</h4>
                  : null
                }
              </div>
              : <em></em>}


            {/*Introduction text */}
            {singleUser.intro && singleUser.intro}
            <br/>
            <br/>
            <h4>Artworks</h4>
            {singleUser.artworks<=0&&singleUser.artworks<=0?
              <p>No images uploaded yet</ p>
              :     null
            }
          </div>}


        {/*Artworks */}
        <div className='addedArtworks'>
          {singleUser.artworks && singleUser
            .artworks
            .map(a =>
              <ArtworkDelete
                key={a.id}
                artwork={a}
              />
            )}
        </div>
        {/*     (<ul key={a.id}  className='ulList'>
                  <li>
                    <img
                      src={ BASE_URL +`${ a.galleryImage }`}
                      width='300'
                      height='auto'
                      className='singlepicture'
                      alt='img'
                    />  </li>
                  <li>  {a.name}
                    <Button className="button buttonDelete" onClick={removeArtwork(a.id)} variant="outline-secondary" type="submit" >
                  Delete
                    </Button></li>
                </ul> ))
  } */}

      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log('state fromsingleUserPAge', state)

  return {
    singleUser: state.singleUser.singleUser,
    loggedUser: state.loggedUser.loggedUser
  }
}

export default connect(
  mapStateToProps,
  { notify, ...userActions, initializeSingleUser, deleteArtwork  }
)(SingleUser)
