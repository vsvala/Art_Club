import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../../images/tripleblue.svg'
//import { notification, setError } from './../reducers/actionCreators/notificationActions'
import { login } from '../../reducers/actionCreators/loginActions'
import { Form, Button, Col, Container, Row, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const LoginForm = ({ login, loggedUser }) => {
  const [input, setInput] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (loggedUser && loggedUser.token) {
      navigate('/')
    }
  }, [loggedUser])

  const handleLogin = (event) => {
    event.preventDefault()

    const { username, password } = input
    login(username, password)

    setInput({ username: '', password: '' })
  }

  const handleChange = (event) => {
    const newInput = {
      ...input,
      [event.target.name]: event.target.value,
    }
    setInput(newInput)
  }

  return (
    <div className="loginForm">
      <Container>
        <Row>
          <Col md={{ span: 12 }}>
            {/* <Col md={{ span: 5, offset: 3 }}> */}

            <div className="logHeader">
              <h3>Sign In</h3>
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md={{ span: 12, offset: 0 }}>
            <Form onSubmit={handleLogin}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={input.username}
                  onChange={handleChange}
                  autoFocus
                  required
                />
                <br />

                <InputGroup>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    value={input.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn btn-outline-secondary"
                  >
                    <i
                      className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}
                    ></i>
                  </button>
                </InputGroup>
                <div className="grayInfoText">
                  <p>
                    No login details:{' '}
                    <Link to="/register" className="register">
                      Register
                    </Link>{' '}
                    and apply membership
                  </p>
                </div>
                <br />
                <Button className="button" variant="light" type="submit">
                  Login
                </Button>
              </Form.Group>

              <div className="logoHeader">
                <h1>Art Club</h1>
                <img
                  src={logo}
                  width="100"
                  height="60"
                  className="logLogo"
                  alt="Art club LOGO"
                />
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => ({
  loggedUser: state.loggedUser.loggedUser,
})

export default connect(mapStateToProps, { login })(LoginForm)
