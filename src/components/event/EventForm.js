import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createEvent } from '../../reducers/actionCreators/eventActions'
import { Form, Button, Col, Row, Container } from 'react-bootstrap'
import FormData from 'form-data'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


export const EventForm = (
  {
    createEvent,
    id
  }
) => {


  const [input, setInput] = useState({ title: '', place: '', description: '' })
  const [eventImage, setFile] = useState({ })
  const [state, setState] = useState({
    startDate: new Date(),
    endDate:  new Date()
  })



  const handleSubmit =async(event) => {
    event.preventDefault()
    console.log('file',eventImage, eventImage.eventImage.name)
    console.log('startend', state.startDate, state.endDate)
    const data=new FormData()
    data.append('eventImage',eventImage.eventImage)
    data.append('title', input.title)
    data.append('place', input.place)
    data.append('start', state.startDate)
    data.append('end', state.endDate)
    data.append('description',input.description)
    data.append('userId',id)

    console.log('submitdata', data)
    createEvent(data)
  }


  //eventhandler for changin formField inputs
  const handleChange = (event) => {
    const newInput = {
      ...input,
      [event.target.name]: event.target.value
    }
    setInput(newInput)
    console.log(event)
  }

  const handleChangeStart=(date) => {
    setState({
      startDate: date
    })
  }
  const handleChangeEnd=(date) => {
    setState({
      ...state,
      endDate: date
    })
  }

  // eventhandler for fileInput
  const fileSelectedHandler = (event) => {
    setFile({ eventImage : event.target.files[0] })
    console.log('event', event.target.files[0])
  }


  return (

    <div className='eventForm'>
      <Container>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <div className='eventHeader'>
              <h3>Add event</h3>
            </div>
          </Col>
        </Row>
        <br/>

        <Form onSubmit={handleSubmit}>
          <Col md={{ span: 10, offset: 1 }}>
            <Form.Group>

           Starting and ending time :
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
              />

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
              />
              <br/>
              <br/>
              <Form.Control
                type='text'
                placeholder='Title'
                name='title'
                onChange={handleChange}
                autoFocus
              />

              {/*    <br/>
              <Form.Control
                type='text'
                placeholder='Start date'
                name='startDate'
                onChange={handleChange}
              />
              <br/>
              <Form.Control
                type='text'
                placeholder='End date'
                name='endDate'
                onChange={handleChange}
              /> */}
              {/*   <br/>
              <Form.Control
                type='text'
                placeholder='Start time'
                name='startTime'
                onChange={handleChange}
              />
              <br/>
              <Form.Control
                type='text'
                placeholder='End time'
                name='endTime'
                onChange={handleChange}
              /> */}
              <br/>
              <Form.Control
                type='text'
                placeholder='Place'
                name='place'
                onChange={handleChange}
              />
              <br/>
              <Form.Control
                as='textarea'
                rows='3'
                type='text'
                placeholder='Description'
                name='description'
                onChange={handleChange}
              />
              <br/>
              <Button className='button' type='submit' variant="light">Send</Button>
            </Form.Group>
          </Col>
          <div className="loadEventPictureText">
            <p>Upload event picture</p>
          </div>
        </Form>
        <br/>
        <br/>
        <input type='file'className='fileUploader' name='eventImage' id="file" onChange={fileSelectedHandler}/>
      </Container>
    </div>
  )
}


export default connect(
  null,
  { createEvent }
)( EventForm )


