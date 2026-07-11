import React, { useState } from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { updateUser } from '../../reducers/actionCreators/userActions'
import { notify } from '../../reducers/actionCreators/notificationActions'
import { emailValid } from '../../utils/validations'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

export const UpdateUserForm = ({ id }) => {
  const singleUser = useSelector((state) => state.singleUser.singleUser)

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const [name, setName] = useState(singleUser.name)
  const [email, setEmail] = useState(singleUser.email)
  const [username, setUsername] = useState(singleUser.username)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const user = {
      id: id,
      name: name,
      email: email,
      username: username,
    }
    if (!emailValid(user.email)) {
      dispatch(notify('Please check your email', 5))
    } else if (user.name.length < 3) {
      dispatch(notify('Name has to have at least 3 characters', 5))
    } else if (user.username.length < 3) {
      dispatch(notify('Username has to have at least 3 characters', 5))
    } else {
      const response = await dispatch(updateUser(user))
      if (response.success) {
        navigate(`/users/${id}/myPage`)
      }
    }
  }

  return (
    <div className="registerForm">
      <Container>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <div className="regHeader">
              <h3>Update your information</h3>
            </div>
          </Col>
        </Row>
        <br />

        <div className="updateInfoLabels">
          <Col md={{ span: 10, offset: 1 }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Name: </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Label>Email: </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Label>Username: </Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <Button className="button" variant="light" type="submit">
                  Update
                </Button>
                <br />
              </Form.Group>
            </Form>
          </Col>
        </div>
      </Container>
    </div>
  )
}

export default UpdateUserForm
