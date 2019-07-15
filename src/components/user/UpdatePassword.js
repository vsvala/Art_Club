import React, { useState } from 'react'
import { notify, setError } from '../../reducers/actionCreators/notificationActions'
import userService from '../../services/users'
import { Form, Button, Col, Container, Row } from 'react-bootstrap'
import { connect } from 'react-redux'


export const UpdatePassword = ({ notify, setError }) => {

  const [input, setInput] = useState({ oldPassword: '', newPassword: '', confirm: '' })

  const handlePasswordChange = async (event) => {
    event.preventDefault()
    const { oldPassword, newPassword, confirm } = input
    const response = await userService.updatePassword({ oldPassword, newPassword, confirm })
    console.log('resp', response)
    if (response.error) {
      setError(response.error, 5)
    } else {
      notify('Password updated successfully!', 5)
      setInput({ oldPassword: '', newPassword: '', confirm: '' })
    }
  }

  const handleChange = (event) => {
    const newInput = {
      ...input,
      [event.target.name]: event.target.value
    }
    setInput(newInput)
  }

  return (
    <div className='passwordForm'>
      <Container>
        <Row>
          <Col>
            <div className='logHeader'>
              <h3>Change password</h3>
            </div>
          </Col>
        </Row>
        <br/>
        <Col md={{ span:10, offset: 1 }}>
          <Form onSubmit={handlePasswordChange}>
            <Form.Group>
              <Form.Control
                type="password"
                name="oldPassword"
                placeholder="Old Password"
                value={input.oldPassword}
                onChange={handleChange}
                autoFocus />
              <br/>
              <Form.Control
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={input.newPassword}
                onChange={handleChange} />
              <br/>
              <Form.Control
                type="password"
                name="confirm"
                placeholder="Confirm Password"
                value={input.confirm}
                onChange={handleChange} />
            </Form.Group>
            <br/>
            <Button className="button btnLogin" type="submit" >
          Update
            </Button>
          </Form>
        </Col>
      </Container>
    </div>
  )
}

export default connect(
  null,
  { notify, setError }
)(UpdatePassword)
