import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createEvent } from '../../reducers/actionCreators/eventActions'
import { Form, Button, Col, Row, Container } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom'
import { notify } from '../../reducers/actionCreators/notificationActions'
import { useQueryClient } from '@tanstack/react-query'

export const EventForm = ({ createEvent, notify }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [input, setInput] = useState({ title: '', place: '', description: '' })
  const [eventImage, setFile] = useState({})
  const [state, setState] = useState({
    startDate: new Date(),
    endDate: new Date(),
  })
  const [errors, setErrors] = useState({})

  const formatDate = (date) => {
    const weekdays = ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la']
    const weekday = weekdays[date.getDay()]
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${weekday} ${day}.${month}.${year} klo ${hours}:${minutes}`
  }

  const validateForm = () => {
    const newErrors = {}

    if (!eventImage.eventImage) {
      newErrors.image = 'Remember to choose image!'
    }
    if (input.title.length <= 2) {
      newErrors.title = 'Title has to have at least 3 characters'
    }
    if (input.place.length <= 2) {
      newErrors.place = 'Place has to have at least 3 characters'
    }
    if (input.description.length <= 5) {
      newErrors.description = 'Description has to have at least 6 characters'
    }
    if (!state.startDate) {
      newErrors.start = 'Start date is required'
    }
    if (!state.endDate) {
      newErrors.end = 'End date is required'
    }
    if (state.endDate && state.startDate && state.endDate < state.startDate) {
      newErrors.end = 'End date mustsame or after start date'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    const data = new FormData()
    data.append('eventImage', eventImage.eventImage)
    data.append('title', input.title)
    data.append('place', input.place)
    data.append('start', formatDate(state.startDate))
    data.append('end', formatDate(state.endDate))
    data.append('description', input.description)

    const createEventResult = await createEvent(data)
    if (createEventResult.success) {
      queryClient.invalidateQueries(['events'])
      navigate('/users/events')
    } else {
      notify(createEventResult?.error || 'Saving failed!', 5)
    }
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
                  {errors.start && (
                    <small className="text-danger d-block mt-1">
                      {errors.start}
                    </small>
                  )}
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
                  {errors.end && (
                    <small className="text-danger d-block mt-1">
                      {errors.end}
                    </small>
                  )}
                </Col>

                <Col xs={12} md={6}>
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={input.title}
                    onChange={handleChange}
                    autoFocus
                    isInvalid={errors.title ? true : false}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Control
                    type="text"
                    placeholder="Place"
                    name="place"
                    value={input.place}
                    onChange={handleChange}
                    isInvalid={errors.place ? true : false}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.place}
                  </Form.Control.Feedback>
                </Col>
                <Col xs={12}>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    placeholder="Description"
                    name="description"
                    value={input.description}
                    onChange={handleChange}
                    isInvalid={errors.description ? true : false}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
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
        {errors.image && (
          <small className="text-danger d-block mt-2">{errors.image}</small>
        )}
      </Container>
    </div>
  )
}

export default connect(null, { createEvent, notify })(EventForm)
