import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createArtwork } from '../../reducers/actionCreators/artworkActions'
import { Form, Button, Col, Row, Container } from 'react-bootstrap'
import { getArtists } from '../../reducers/actionCreators/userActions'
import FormData from 'form-data'
import ReadMoreReact from 'read-more-react'

export const AddArtworkForm = (
  {
    createArtwork,
    getArtists,
    users,
    id,
    //history
  }
) => {
  useEffect(() => {
    console.log('id',id)
    getArtists()
  }, [])

  const userToShow=users&&users.find(u => u.id===id)

  const [input, setInput] = useState({ image: '', artist: '', name: '',year: '',size: '',medium: '', selectedFile:null })
  const [galleryImage, setFile] = useState({ })


  const handleSubmit = (event) => {
    event.preventDefault()
    //createsFormdata object
    console.log('file',galleryImage, galleryImage.galleryImage.name)
    const data=new FormData()
    data.append('galleryImage',galleryImage.galleryImage)
    data.append('artist', event.target.artist.value)
    data.append('name', event.target.name.value)
    data.append('year', event.target.year.value)
    data.append('size', event.target.size.value)
    data.append('medium',event.target.medium.value)
    data.append('userId',id)

    console.log('submitdata', data)
    createArtwork(data)
    // history.push('/users/:id/myPage')
  }

  const handleChange = (event) => {
    const newInput = {
      ...input,
      [event.target.name]: event.target.value
    }
    setInput(newInput)
    console.log(event)
  }


  const fileSelectedHandler = (event) => {
    setFile({ galleryImage : event.target.files[0] })
    console.log('event', event.target.files[0])
  }


  return (
    <div className='artworkForm'>
      <Container>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <div className='artworkHeader'>
              <h3>Add artwork</h3>
            </div>
          </Col>
        </Row>
        <br/>

        <Form onSubmit={handleSubmit}>
          <Col md={{ span: 10, offset: 1 }}>
            <Form.Group>
              <Form.Control
                type='text'
                placeholder='Artist'
                name='artist'
                onChange={handleChange}
                autoFocus
              />
              <br/>
              <Form.Control
                type='text'
                placeholder='Name of artwork'
                name='name'
                onChange={handleChange}
              />
              <br/>
              <Form.Control
                type='text'
                placeholder='Year'
                name='year'
                onChange={handleChange}
              />
              <br/>
              <Form.Control
                type='text'
                placeholder='Size (width x hight) cm'
                name='size'
                onChange={handleChange}
              />
              <br/>
              <Form.Control
                type='text'
                placeholder='Medium'
                name='medium'
                onChange={handleChange}
              />
              <div className="grayInfoText">
                <p>You can upload max 10 images to the gallery. Added artworks { userToShow && userToShow.artworks.length}/10 </p>
              </div>
              <br/>
              { userToShow && userToShow.artworks.length>=10
                ? <h5>You have reached limit of 10 images. To add new images delete your old images fom MyPage</h5>
                : <Button className='button' type='submit' variant="light">Send</Button>
              }

            </Form.Group>
          </Col>
        </Form>

        <input type='file'className='fileUploader' name='galleryImage' id="file" onChange={fileSelectedHandler}/>


      </Container>
      <div className="ImageInfoText">
        <ReadMoreReact
          text={ 'Image instructions! width 600px, height 500px, max_fileSize:1024*1024*5, resolution: 72dpi, format:jpg '}
          min={5}
          ideal={10}
          max={100}
          readMoreText={'Read more'}/>
      </div>
    </div>

  )
}

const mapStateToProps = (state) => {
  console.log('users state frm addArtworFrom', state.users.users)
  return {
    users: state.users.users
  }
}

export default connect(
  mapStateToProps,
  { createArtwork, getArtists }
)( AddArtworkForm )


