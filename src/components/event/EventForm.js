import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createEvent } from '../../reducers/actionCreators/eventActions'
import { Form, Button, Col, Row, Container } from 'react-bootstrap'
import FormData from 'form-data'

//TODO time fielsd and gettin calender to choose date..tand time.

export const EventForm = (
  {
    createEvent,
    id
  }
) => {


  const [input, setInput] = useState({ image: '', title: '', place: '', startDate: '',endDate: '', startTime: '',endTime: '', description: '', selectedFile:null })
  const [eventImage, setFile] = useState({ })



  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('file',eventImage, eventImage.eventImage.name)
    const data=new FormData()
    data.append('eventImage',eventImage.eventImage)
    data.append('title', event.target.title.value)
    data.append('place', event.target.place.value)
    data.append('startDate', event.target.startDate.value)
    data.append('endDate', event.target.endDate.value)
    data.append('startTime', event.target.startTime.value)
    data.append('endTime', event.target.endTime.value)
    data.append('description',event.target.description.value)
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


  // eventhandler for fileInput
  const fileSelectedHandler=event => {
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
              <Form.Control
                type='text'
                placeholder='Title'
                name='title'
                onChange={handleChange}
                autoFocus
              />
              <br/>
              <Form.Control
                type='text'
                placeholder='Place'
                name='place'
                onChange={handleChange}
              />
              <br/>
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
              />
              <br/>
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


