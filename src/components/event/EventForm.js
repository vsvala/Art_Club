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
  const handleSubmit = async (event) => {
    event.preventDefault()

    if (eventImage.eventImage === undefined) {
      notify('Remember to choose image!', 5)
    } else if (input.title.length <= 2) {
      notify('Title has to have at least 3 characters', 5)
    } else if (input.place.length <= 3) {
      notify('Place has to have at least 3 characters', 5)
    } else if (input.description.length <= 5) {
      notify('Description has to have at least 6 characters', 5)
    } else {
      const data = new FormData()
      data.append('eventImage', eventImage.eventImage)
      data.append('title', input.title)
      data.append('place', input.place)
      data.append('start', formatDate(state.startDate))
      data.append('end', formatDate(state.endDate))
      data.append('description', input.description)

      const createEventResult = await createEvent(data)
      if (createEventResult.success) {
        queryClient.invalidateQueries(['events']) // kerrotaan React Querylle: cache vanhentunut
        navigate('/users/events')
      } else {
        notify(createEventResult?.error || 'Saving failed!', 5)
      }
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

export default connect(null, { createEvent, notify })(EventForm)
