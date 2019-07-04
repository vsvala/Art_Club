import React from'react'
import { connect } from 'react-redux'
//import { FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap'
import { Form, Button, Col } from 'react-bootstrap'

//import { emailValid } from '../../utils/validations'
import { createUser } from '../../reducers/actionCreators/userActions'
//import { notification } from '../../reducers/notificationReducer'


//TODO notifikaatio että sähköposti kun member...
//ja se että virheen sattuessa kentät ei tyhjenny ??
//Notifications


export const RegisterUserForm = ( {
  createUser
// id,
  //notify,
}) => {

  const handleSubmit = async(event) => {
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
    // history.push('/login')
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
    <div>
      <h2>Apply membership</h2>
      <br/>
      <Col md={{ span: 8, offset: 2 }}>
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

            <br></br>
            <Button className="button" variant="light" type="submit">Apply</Button>
          </Form.Group>
        </Form>
      </Col>
    </div>
  )
}

export default connect(
  null,
  { createUser } // notification,
)(RegisterUserForm)
