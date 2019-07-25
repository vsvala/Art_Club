
import React, { useState } from 'react'
import { notify } from '../../reducers/actionCreators/notificationActions'
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { updateLoggedUser } from '../../reducers/actionCreators/loginActions'
import { updateIntro } from '../../reducers/actionCreators/userActions'


export const UserIntroForm = ( {
  updateLoggedUser,
  id,
  singleUser,
  notify

}) => {

  const [intro, setIntro] = useState(singleUser.intro)
  // (if intro lenght...const introLenght = singleUser.intro.lenght

  // takes new input values from the form, updates logged user
  const handleSubmit = (event) => {
    event.preventDefault()
    const input = {
      intro: intro
    }
    // gives error if too long introtext
    if (input.intro.length > 1000) {
      notify('Text is too long! Experience maximum length is 1000 characters', 5)
    } else {
      updateLoggedUser(input, id)
    }
  }

  return(

    <Form onSubmit={handleSubmit} className='intro' >
      <Form.Group>
        <br/>
        <br/>
        <Form.Label><h4>Write Introduction text (max 1000 characters):</h4></Form.Label>
        {/*(remaining characters {1000 - intro.lenght} )*/}

        <Form.Control
          as='textarea'
          rows='8'
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
    singleUser: state.singleUser.singleUser
  }
}
export default connect(
  mapStateToProps,
  { updateLoggedUser, updateIntro, notify }
)(UserIntroForm)
