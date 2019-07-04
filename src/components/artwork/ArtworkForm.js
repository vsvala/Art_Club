import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createArtwork } from '../../reducers/actionCreators/artworkActions'
//import { notify } from '../../reducers/actionCreators/notificationActions'
import { Form, Button, Col } from 'react-bootstrap'
//import studentActions from '../../reducers/actionCreators/studentActions'
import artworkService from '../../services/artworks'
import FormData from 'form-data'
export const ArtworkForm = (
/*   {
    createArtwork,
    // id,
    //notify,
  } */
) => {

  const [input, setInput] = useState({ image: '', artist: '', name: '',year: '',size: '',medium: '', selectedFile:null })
  const [galleryImage, setFile] = useState({ }) //[]
  // const [multerImage, setImage] = useState([])



  const handleSubmit = async (event) => {
    event.preventDefault()

    console.log('file',galleryImage, galleryImage.galleryImage.name)
    const data=new FormData()
    data.append('galleryImage',galleryImage.galleryImage)
    data.append('artist', event.target.artist.value)
    data.append('name', event.target.name.value)
    data.append('year', event.target.year.value)
    data.append('size', event.target.size.value)
    data.append('medium',event.target.medium.value)
    data.append('userId','5cf94f1a65a6b76cfd2052f8') //TODOOOO

    const formContent = {
      // galleryImage: data, //take this later from picture
      artist: event.target.artist.value,
      name: event.target.name.value,
      year: event.target.year.value,
      size: event.target.size.value,
      medium:event.target.medium.value,
      userId:'5cf94f1a65a6b76cfd2052f8' //TODOOOO
    }
    console.log('submit', formContent)
    console.log('submitdata', data)

    // createArtwork(formContent)
    artworkService.create(data)
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
    setFile({ galleryImage : event.target.files[0] })
    console.log('event', event.target.files[0])
    //   // this.setState({ selectedFile:event.target.files[0]})
    //   const file=event.target.files[0]
    // const put = {
    //   ...selectedFile,
    //   file: event.target.files[0]
    // artworkService.send(event.target.files[0])
  }


  // console.log('event', selectedFile[0])
  // saveFile(file)//lähetä kansioon..

  // }
  /*   const fileUploadHandler=(event) => {
    console.log('file',galleryImage, galleryImage.galleryImage.name)
    const data=new FormData()
    // console.log('file',selectedFile, selectedFile.imagedata.name)
    data.append('imageName',galleryImage.galleryImage.name)
    data.append('galleryImage',galleryImage.galleryImage)

    console.log('event', event)
    console.log('image', galleryImage.galleryImage)
    artworkService.send(data)
  }
 */
  // const uploadImage=(e) => {
  //   let imageFromObj=new FormData()
  //   imageFromObj.append('imageName', 'multi-image-' + Date.now())
  //   console.log('event', event.target.files[0])
  //   imageFromObj.append('imageData', e.target.files[0])
  //   console.log('imgdata', imageFromObj)

  //   artworkService.send(imageFromObj)
  // }


  return (
    <div className='artworkForm'>
      {galleryImage.name}
      <h2>Add artwork</h2>

      <Col md={{ span: 8, offset: 2 }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            {/* <Form.Label>Artist: </Form.Label> */}
            <Form.Control
              type='text'
              placeholder='Artist'
              name='artist'
              onChange={handleChange}
              autoFocus
            />
            <br/>
            {/* <Form.Label>Name of artwork: </Form.Label> */}
            <Form.Control
              type='text'
              placeholder='Name of artwork'
              name='name'
              onChange={handleChange}
            />
            <br/>
            {/* <Form.Label>Year: </Form.Label> */}
            <Form.Control
              type='text'
              placeholder='Year'
              name='year'
              onChange={handleChange}
            />
            <br/>
            {/* <Form.Label>Size (width x hight) in cm: </Form.Label> */}
            <Form.Control
              type='text'
              placeholder='Size (width x hight) cm'
              name='size'
              onChange={handleChange}
            />
            <br/>
            {/* <Form.Label>Medium: </Form.Label> */}
            <Form.Control
              type='text'
              placeholder='Medium'
              name='medium'
              onChange={handleChange}
            />
            <br/>
            {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!>!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11!!!!!!!!TODO tähän muotoilu choose buttonille !!!!!!!!!!!!!!!!!!!!!!!!*/}


            <input type='file'className='fileUploader' name='galleryImage' id="file" onChange={fileSelectedHandler}/>

            {/* <Button onClick={fileUploadHandler}>Upload</Button> */}

            <Button className='button' type='submit' variant="light">Send</Button>

          </Form.Group>
        </Form>
      </Col>
    </div>
  )
}

export default connect(
  null,
  { createArtwork }
)( ArtworkForm )