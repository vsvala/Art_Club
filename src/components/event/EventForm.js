import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createEvent } from '../../reducers/actionCreators/eventActions'
import { Form, Button, Col, Row, Container } from 'react-bootstrap'
import FormData from 'form-data'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom'

export const EventForm = ({ createEvent }) => {
  const navigate = useNavigate()
  const [input, setInput] = useState({ title: '', place: '', description: '' })
  const [eventImage, setFile] = useState({})
  const [state, setState] = useState({
    startDate: new Date(),
    endDate: new Date(),
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData()
    data.append('eventImage', eventImage.eventImage)
    data.append('title', input.title)
    data.append('place', input.place)
    data.append('start', state.startDate)
    data.append('end', state.endDate)
    data.append('description', input.description)

    createEvent(data)
    navigate('/users/events')
  }

  const handleChange = (event) => {
    const newInput = {
      ...input,
      [event.target.name]: event.target.value,
    }
    setInput(newInput)
  }

  const handleChangeStart = (date) => {
    setState({
      startDate: date,
    })
  }

  const handleChangeEnd = (date) => {
    setState({
      ...state,
      endDate: date,
    })
  }

  const fileSelectedHandler = (event) => {
    setFile({ eventImage: event.target.files[0] })
  }

  return (
    <div className="eventForm">
      <Container>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <div className="eventHeader">
              <h3>Add event</h3>
            </div>
          </Col>
        </Row>
        <br />

        <Form onSubmit={handleSubmit}>
          <Col md={{ span: 10, offset: 1 }}>
            <Form.Group>
              <Row className="g-2 align-items-center">
                <Col xs={12}>Start and end:</Col>
                <Col xs={12} md={6}>
                  <DatePicker
                    selected={state.startDate}
                    selectsStart
                    startDate={state.startDate}
                    endDate={state.endDate}
                    onChange={handleChangeStart}
                    showTimeSelect
                    showWeekNumbers
                    timeFormat="H:mm"
                    timeIntervals={30}
                    dateFormat="d.M.yyyy H:mm"
                    timeCaption="time"
                    wrapperClassName="w-100"
                  />
                </Col>
                <Col xs={12} md={6}>
                  <DatePicker
                    selected={state.endDate}
                    selectsEnd
                    startDate={state.startDate}
                    endDate={state.endDate}
                    onChange={handleChangeEnd}
                    minDate={state.startDate}
                    showTimeSelect
                    showWeekNumbers
                    timeFormat="H:mm"
                    timeIntervals={30}
                    dateFormat="d.M.yyyy H:mm"
                    timeCaption="time"
                    wrapperClassName="w-100"
                  />
                </Col>
                <Col xs={12} md={6}>
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    name="title"
                    onChange={handleChange}
                    autoFocus
                  />
                </Col>
                <Col xs={12} md={6}>
                  <Form.Control
                    type="text"
                    placeholder="Place"
                    name="place"
                    onChange={handleChange}
                  />
                </Col>
                <Col xs={12}>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    placeholder="Description"
                    name="description"
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <div className="grayInfoText">
                <p>Upload event picture, size width:200px, height:300px</p>
              </div>
              <br />
              <Button className="button" type="submit" variant="light">
                Send
              </Button>
            </Form.Group>
          </Col>
        </Form>
        <br />
        <input
          type="file"
          className="fileUploader"
          name="eventImage"
          id="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={fileSelectedHandler}
        />
      </Container>
    </div>
  )
}

export default connect(null, { createEvent })(EventForm)
