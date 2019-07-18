import React , { useState } from'react'
import { connect } from 'react-redux'
//import { FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
//import { emailValid } from '../../utils/validations'
import { updateUser } from '../../reducers/actionCreators/userActions'
//import { notification } from '../../reducers/notificationReducer'


//TODO  vALIDOINNIT  kaikissa kentissä jotain.ei tyhjiä
//ja se että virheen sattuessa kentät ei tyhjenny ??

export const UpdateUserForm = ( {
  updateUser,
  id,
  history,
  loggedUser,
  singleUser

}) => {
  // const [input, setInput] = useState({ email:loggedUser.email, username:loggedUser.username })
  const [name, setName] = useState(singleUser.name)
  const [email, setEmail] = useState(singleUser.email)
  const [username, setUsername] = useState(singleUser.username)

  const handleSubmit = (event) => {
    event.preventDefault()

    const user = {
      id:id,
      name:name,
      email:email,
      username:username,
      // role:'member'
    }
    console.log('registering',user )
    const response=updateUser(user)
    console.log('resp', response)
  // history.push('/users/:id/myPage')
  //Miksi ei updataa TODO korjaa
  }

  // const handleChange = (event) => {
  //   const newInput = {
  //     ...input,
  //     [event.target.name]: event.target.value
  //   }
  //   setInput(newInput)
  // }


  return(

    <div className='registerForm'>
      <Container>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <div className='regHeader'>
              <h3>Update your information</h3>
            </div>
          </Col>
        </Row>
        <br/>
        <Col md={{ span: 10, offset: 1 }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name: </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                // onChange={handleChange}
                //placeholder="Name"
                onChange={(e) => setName(e.target.value)}

              />
              <Form.Label>Email: </Form.Label>
              <Form.Control
                type='email'
                name='email'
                value={email}
                //value={input.email}
                //placeholder="Email"
                //onChange={handleChange}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Form.Label>Username: </Form.Label>
              <Form.Control
                type="text"
                name="username"
                //placeholder="Username"
                value={username}
                //onChange={handleChange}
                onChange={(e) => setUsername(e.target.value)}
              />
              <br/>
              <Button className="button" variant="light" type="submit">Update
              </Button>
              <br/>
            </Form.Group>
          </Form>
        </Col>
      </Container>
    </div>
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
  { updateUser }
)(UpdateUserForm)
