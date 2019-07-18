
import React, { useState } from 'react'
import { notify } from '../../reducers/actionCreators/notificationActions'
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { updateLoggedUser } from '../../reducers/actionCreators/loginActions'
import { updateIntro } from '../../reducers/actionCreators/userActions'


export const UserIntroForm = ( {
  updateLoggedUser,
  id,
  //history,
  //updateIntro,
  // loggedUser,
  singleUser

}) => {

  const [intro, setIntro] = useState(singleUser.intro)

  //const [intro, setIntro] = useState(loggedUser.intro&&loggedUser.intro)

  // takes new input values from the form, updates logged user
  const handleSubmit = (event) => {
    event.preventDefault()
    const input = {
      intro: intro
    }
    // gives error if too long
    // if (input.intro.length > 1000) {
    //notify('Experience maximum length is 1000 characters', 5)
    // } else {
    // updateIntro(input, id)
    updateLoggedUser(input, id)
    notify('usends', 5)
    // }
  }

  return(

    <Form onSubmit={handleSubmit} className='intro' >
      {/* <td><h3><Link to='/users/password' className='member'>Write Introduction text</Link></h3></td> */}
      <Form.Group>
        <Form.Label><h4>Write Introduction text (remaining characters):</h4></Form.Label>
        {/* //(remaining characters {1000 - this.intro.length} */}
        <Form.Control
          as='textarea'
          rows='3'
          type='text'
          name='intro'
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
        />
      </Form.Group>
      <Button className='button updateButton' type='submit'>Send</Button>
    </Form>

  )
}
const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser.loggedUser,
    singleUser: state.singleUser.singleUser

  }
}
export default connect(
  mapStateToProps,
  { updateLoggedUser, updateIntro }
)(UserIntroForm)
