import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {  initializeSingleUser }  from '../../reducers/actionCreators/userActions'
import { initLoggedUser, updateLoggedUser } from '../../reducers/actionCreators/loginActions'
import userActions from '../../reducers/actionCreators/userActions'
import { Link } from 'react-router-dom'
import { Table, Form, Button } from 'react-bootstrap'
import { notify } from '../../reducers/actionCreators/notificationActions'

const BASE_URL= 'http://localhost:3001/'


export const SingleUser = ({
  userToShow,
  userId,
  initializeSingleUser,
  initLoggedUser,
  loggedUser,
  notify
}) => {

  useEffect(() => {
    initializeSingleUser(userId) &&
    initLoggedUser()
    console.log('initializeSingleUser(userId)')
  }, [])
  const [intro, setIntro] = useState('kääk')//singleUser.intro

  // takes new input values from the form, updates logged user
  const handleSubmit = (event) => {
    event.preventDefault()

    const input = {
      intro: intro

    }
    // gives error if too long
    if (input.experience.length > 1000) {
      notify('Experience maximum length is 1000 characters', 5)
    } else {
      updateLoggedUser(input, userId)
    }
  }



  return (
    <div className="singleUser">
      {/* <h2>My page</h2> */}
      <div className="user">
        {!userToShow ?
          null
          :
          <div>
            {/* {userToShow&&userToShow.id} */}
            <h2>{userToShow.name}</h2>
            <br/>
            {loggedUser && loggedUser.role==='member' | loggedUser.role==='admin'
              ? <div>
                <Table>
                  <thead>
                    <tr>
                      <th>name</th>
                      <th>username</th>
                      <th>email</th>
                      <th>artworks</th>
                      <th>status</th>
                      <th>update</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>{userToShow.name}</td>
                      <td>{userToShow.username}</td>
                      <td>{userToShow.email}</td>
                      <td>{userToShow.artworks && userToShow.artworks.length}/10</td>
                      <td>{userToShow.role}</td>
                      { loggedUser.role==='member' | loggedUser.username===userToShow.username?
                        <td> <Link to='/users/update' className='member'>Update information</Link></td>
                        :
                        null
                      }
                    </tr>
                  </tbody>
                </Table>

                <Table>
                  <tbody>
                    <tr>
                      { loggedUser.role==='member' | loggedUser.username===userToShow.username?
                        <div>
                          {/* <td><h3><Link to='/users/password' className='member'>Write Introduction text</Link></h3></td> */}

                          <Form onSubmit={handleSubmit} className='intro' >
                            <Form.Group>
                              <Form.Label>Write Introduction text (remaining characters {1000 - intro.length}):</Form.Label>
                              <Form.Control
                                as='textarea'
                                rows='5'
                                type='text'
                                name='intro'
                                value={intro}
                                onChange={(e) => setIntro(e.target.value)}
                              />

                            </Form.Group>
                            <Button className='button updateButton' type='submit'>Update</Button>
                          </Form> </div>
                        :
                        null
                      }

                    </tr>
                  </tbody>
                  {/* Hide show Link to add My intoduction text  from here... */}
                </Table>
              </div>
              : <em></em>}
            {/* <h3>Artworks</h3> */}
            Here comes introduction text think limit lenght how many charactersMake this mox smaller
            <br/>
            <br/>
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
  console.log('state.singleUser', state)

  return {
    userToShow: state.singleUser.singleUser,
    loggedUser: state.loggedUser.loggedUser
  }
}

export default connect(
  mapStateToProps,
  { notify, ...userActions, initializeSingleUser, initLoggedUser, updateLoggedUser  }
)(SingleUser)
