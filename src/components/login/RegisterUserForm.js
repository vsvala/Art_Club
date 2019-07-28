import React from'react'
import { connect } from 'react-redux'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { createUser } from '../../reducers/actionCreators/userActions'
import { notify } from '../../reducers/actionCreators/notificationActions'
import { emailValid } from '../../utils/validations'


export const RegisterUserForm = ({
  createUser,
  history,
  // id,
  notify
}) => {

  const handleSubmit = (event) => {
    event.preventDefault()

    const user = {
      name:event.target.name.value,
      email:event.target.email.value,
      username:event.target.username.value,
      password:event.target.password.value,
      role:'nonMember'
    }

    if (!emailValid(user.email)) {
      notify('Please check your email', 5)
    }
    else if (user.name.length < 3) {
      notify('Name has to have at least 3 characters', 5)
    }
    else if (user.username.length < 3) {
      notify('Username has to have at least 3 characters', 5)
    }
    else if (user.password.length < 8) {
      notify('Password has to have at least 8 characters', 5)
    } else {
      console.log('registering',user )
      createUser(user)
      history.push('/nonMember')
    }
    // event.target.name.value=''
    // event.target.email.value=''
    // event.target.username.value = ''
    // event.target.password.value=''


    //   const handleChange = (event) => {
    //     const newInput = {
    //       ...input,
    //       [event.target.name]: event.target.value
    //     }
    //     setInput(newInput)
    //   }

  }
  return(

    //TODO? first name laste name
    <div className='registerForm'>
      <Container>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <div className='regHeader'>
              <h3>Register and apply membership</h3>
            </div>
          </Col>
        </Row>
        <br/>
        <Col md={{ span: 10, offset: 1 }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
              />
              <br/>
              <Form.Control
                type='email'
                name='email'
                placeholder="Email"
                // onChange={(e) => updateEmail(e.target.value)}
              />
              <br/>
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
              />
              <br/>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
              />
              <div className='grayInfoText'>
                <p>I accept <Link to='/terms' className='terms'>Terms of use</Link> 	&amp; <Link to='/privacy' className='gpr'>Privacy Policy</Link></p>
              </div>
              <br/>
              <Button className="button" variant="light" type="submit">Apply</Button>
              <br/>
            </Form.Group>
          </Form>
        </Col>
      </Container>
    </div>
  )
}

export default connect(
  null,
  { createUser, notify } // notification,
)(RegisterUserForm)