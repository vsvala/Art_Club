import React from 'react'
import { connect } from 'react-redux'
//import { updateLoggedUser } from '../../reducers/actionCreators/loginActions'
//import { notify } from '../../reducers/actionCreators/notificationActions'
import { Form, Button } from 'react-bootstrap'
//import studentActions from '../../reducers/actionCreators/studentActions'

export const ArtworkForm = (
  // eslint-disable-next-line no-empty-pattern
  {
  //updateLoggedUser,
  // id,
  // //notify,
  }
) => {

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formContent = {
      image: event.target.image.value, //take this later from picture
      artist: event.target.artits.value,
      name: event.target.name.value,
      year: event.target.year.value,
      size: event.target.size.value,
      medium:event.target.medium.value
    }
    console.log(formContent)
  }

  const handleChange = (event) => {
    // const newInput = {
    //   ...input,
    //   [event.target.name]: event.target.value
    // }
    // setInput(newInput)
    console.log(event)
  }



  return (
    <div className='artworkForm'>

      <h2>Add artwork</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Image: </Form.Label>
          <Form.Control
            type='text'
            name='image'
            //value={input.image}
            onChange={handleChange}
            autoFocus
          />
          <Form.Label>Artist: </Form.Label>
          <Form.Control
            type='text'
            name='artist'
            onChange={handleChange}
          />
          <Form.Label>Name of artwork: </Form.Label>
          <Form.Control
            type='text'
            name='name'
            onChange={handleChange}
          />
          <Form.Label>Year: </Form.Label>
          <Form.Control
            type='text'
            name='year'
            onChange={handleChange}
          />
          <Form.Label>Size (width x hight) in cm: </Form.Label>
          <Form.Control
            type='text'
            name='size'
            onChange={handleChange}
          />
          <Form.Label>Medium: </Form.Label>
          <Form.Control
            type='text'
            name='medium'
            onChange={handleChange}
          />

        </Form.Group>
        <Button className='button' type='submit'>send</Button>
      </Form>
    </div>
  )
}

export default connect(
  null,
  // { notify }
)( ArtworkForm )