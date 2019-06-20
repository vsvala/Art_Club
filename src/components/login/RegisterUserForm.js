import React from'react'
import { connect } from 'react-redux'
//import { FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap'
import { Form, Button } from 'react-bootstrap'

//import { emailValid } from '../../utils/validations'
import { createUser } from '../../reducers/actionCreators/userActions'
//import { notification } from '../../reducers/notificationReducer'
//TODO ohjaus ja se että virheen sattuessa kentät ei tyhjenny




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

      <form onSubmit={handleSubmit}>
        <Form.Group>

          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
          />

          <Form.Label>Email: </Form.Label>
          <Form.Control
            type='email'
            name='email'
            // onChange={(e) => updateEmail(e.target.value)}
          />

          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
          />

          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
          />

          <br></br>
          <Button className="btnLogin" variant="dark" type="submit">Apply</Button>
        </Form.Group>

      </form>

    </div>
  )
}

export default connect(
  null,
  { createUser } // notification,
)(RegisterUserForm)
