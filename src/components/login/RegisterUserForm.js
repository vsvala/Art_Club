import React from'react'
import { connect } from 'react-redux'
//import { FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
//import { emailValid } from '../../utils/validations'
import { createUser } from '../../reducers/actionCreators/userActions'
//import { notification } from '../../reducers/notificationReducer'


//TODO notifikaatio että sähköposti kun member...
//ja se että virheen sattuessa kentät ei tyhjenny ??
//Notifications
//TODO GPR acceptin and email...


export const RegisterUserForm = ( {
  createUser,
  history
// id,
  //notify,
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
    // if (!emailValid(userObject.email)) {
    //   notify('Please check your email', 5)
    // } else {

    console.log('registering',user )
    //super(props);

    //}

    createUser(user)
    //notification(`user ${userObject.username} created`, 5)

    //}
    event.target.name.value=''
    event.target.email.value=''
    event.target.username.value = ''
    event.target.password.value=''
    history.push('/login')
  }

  //   const handleChange = (event) => {
  //     const newInput = {
  //       ...input,
  //       [event.target.name]: event.target.value
  //     }
  //     setInput(newInput)
  //   }


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
  { createUser } // notification,
)(RegisterUserForm)
