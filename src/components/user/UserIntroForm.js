import React, { useState } from 'react'
import { notify } from '../../reducers/actionCreators/notificationActions'
import { Form, Button } from 'react-bootstrap'
import { updateLoggedUser } from '../../reducers/actionCreators/loginActions'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

export const UserIntroForm = ({ id }) => {
  const singleUser = useSelector((state) => state.singleUser.singleUser)
  const [intro, setIntro] = useState(singleUser.intro)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const input = { intro: intro }
    if (input.intro.length > 1000) {
      dispatch(
        notify(
          'Text is too long! Introduction text maximum length is 1000 characters',
          5,
        ),
      )
    } else {
      dispatch(updateLoggedUser(input, id))
      navigate(`/users/${id}/myPage`)
    }
  }

  return (
    <Form onSubmit={handleSubmit} className="intro">
      <Form.Group>
        <br />
        <br />
        <Form.Label>
          <h4>Write Introduction text (max 1000 characters):</h4>
        </Form.Label>
        <Form.Control
          as="textarea"
          rows="8"
          type="text"
          name="intro"
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
        />
      </Form.Group>
      <Button className="button updateButton" type="submit">
        Send
      </Button>
    </Form>
  )
}

export default UserIntroForm
