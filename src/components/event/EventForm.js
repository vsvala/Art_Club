import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createEvent } from '../../reducers/actionCreators/eventActions'
import { Form, Button, Col, Row, Container } from 'react-bootstrap'
import FormData from 'form-data'



export const EventForm = (
  {
    createEvent,
    id
  }
) => {


  const [input, setInput] = useState({ image: '', artist: '', name: '',year: '',size: '',medium: '', selectedFile:null })
  const [eventImage, setFile] = useState({ })


  const handleSubmit = async (event) => {
    event.preventDefault()

    console.log('file',eventImage, eventImage.eventImage.name)
    const data=new FormData()
    data.append('eventImage',eventImage.eventImage)
    data.append('artist', event.target.artist.value)
    data.append('name', event.target.name.value)
    data.append('year', event.target.year.value)
    data.append('size', event.target.size.value)
    data.append('medium',event.target.medium.value)
    data.append('userId',id)

    // const formContent = {
    //   artist: event.target.artist.value,
    //   name: event.target.name.value,
    //   year: event.target.year.value,
    //   size: event.target.size.value,
    //   medium:event.target.medium.value,
    //   userId:id
    // }
    // console.log('submit', formContent)
    console.log('submitdata', data)


    createEvent(data)
  }

  const handleChange = (event) => {
    const newInput = {
      ...input,
      [event.target.name]: event.target.value
    }
    setInput(newInput)
    console.log(event)
  }


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
                placeholder='Date'
                name='date'
                onChange={handleChange}
              />
              <br/>
              <Form.Control
                type='text'
                placeholder='From'
                name='from'
                onChange={handleChange}
              />
              <br/>
              <Form.Control
                type='text'
                placeholder='To'
                name='to'
                onChange={handleChange}
              />
              <br/>
              <Form.Control
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


