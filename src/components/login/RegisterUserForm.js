import { React, useState } from 'react'
import { Form, Button, Row, Col, Container, InputGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { createUser } from '../../reducers/actionCreators/userActions'
import { notify } from '../../reducers/actionCreators/notificationActions'
import { emailValid } from '../../utils/validations'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

export const RegisterUserForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    const user = {
      name: event.target.name.value,
      email: event.target.email.value,
      username: event.target.username.value,
      password: event.target.password.value,
    }

    if (!emailValid(user.email)) {
      dispatch(notify('Please check your email', 5))
    } else if (user.name.length < 3) {
      dispatch(notify('Name has to have at least 3 characters', 5))
    } else if (user.username.length < 3) {
      dispatch(notify('Username has to have at least 3 characters', 5))
    } else if (user.password.length < 8) {
      dispatch(notify('Password has to have at least 8 characters', 5))
    } else {
      dispatch(createUser(user))
      navigate('/nonMember')
    }
  }
  return (
    //TODO? first name last name
    <div className="registerForm">
      <Container>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <div className="regHeader">
              <h3>Register and apply membership</h3>
            </div>
          </Col>
        </Row>
        <br />
        <Col md={{ span: 10, offset: 1 }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control type="text" name="name" placeholder="Name" />
              <br />
              <Form.Control type="email" name="email" placeholder="Email" />
              <br />
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
              />
              <br />
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
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
                  I accept{' '}
                  <Link to="/terms" className="terms">
                    Terms of use
                  </Link>{' '}
                  &amp;{' '}
                  <Link to="/privacy" className="gpr">
                    Privacy Policy
                  </Link>
                </p>
              </div>
              <br />
              <div className="formActionAlign">
                <Button className="button" variant="light" type="submit">
                  Apply
                </Button>
              </div>
              <br />
            </Form.Group>
          </Form>
        </Col>
      </Container>
    </div>
  )
}

export default RegisterUserForm
