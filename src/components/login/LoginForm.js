import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../../images/tripleblue.png'
//import { notification, setError } from './../reducers/actionCreators/notificationActions'
import  { login } from '../../reducers/actionCreators/loginActions'
import { Form, Button, Col, Container, Row } from 'react-bootstrap'

export const LoginForm = ({ login }) => {

  const [input, setInput] = useState({ username: '', password: '' })

  const handleLogin = (event) => {
    event.preventDefault()

    const { username, password } = input
    console.log('logging in with', username, password)
    login(username, password)

    setInput({ username: '', password: '' })
  }

  const handleChange = (event) => {
    const newInput = {
      ...input,
      [event.target.name]: event.target.value
    }
    setInput(newInput)
  }

  return (
    <div className='loginForm'>
      <Container>
        <Row>
          <Col>
            <div className='logHeader'>
              <h3>Sign In</h3>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={handleLogin}>
              <Form.Group>
                <Form.Label>username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={input.username}
                  onChange={handleChange}
                  autoFocus
                />

                <Form.Label>password </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button className="btnLogin" variant="dark" type="submit" >
                Login
              </Button>
              <h5>Not login details yet,<Link to='/register' className='register'>Register</Link> and apply membership</h5>
              <h5>TODO muotoilu ja  label tekstit esitäytetyiksi kenttiin</h5>
              <h1>Art Club</h1>
              <img
                src={logo}
                width='100'
                height='60'
                alt='Art club LOGO'
              />

            </Form>
          </Col>
        </Row>
      </Container>
    </div >
  )
}


export default connect(
  null,
  { login } //notification, setError,
)(LoginForm)
