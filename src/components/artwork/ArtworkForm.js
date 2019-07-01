import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createArtwork } from '../../reducers/actionCreators/artworkActions'
//import { notify } from '../../reducers/actionCreators/notificationActions'
import { Form, Button } from 'react-bootstrap'
//import studentActions from '../../reducers/actionCreators/studentActions'
import artworkService from '../../services/artworks'
import FormData from 'form-data'

export const ArtworkForm = (
  {
    createArtwork,
    // id,
    //notify,
  }
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
  const fileUploadHandler=(event) => {
    console.log('file',galleryImage, galleryImage.galleryImage.name)
    const data=new FormData()
    // console.log('file',selectedFile, selectedFile.imagedata.name)
    //data.append('file',selectedFile.imagedata)
    //data.append('name',selectedFile.image.name)
    data.append('imageName',galleryImage.galleryImage.name)
    data.append('galleryImage',galleryImage.galleryImage)


    console.log('event', event)
    console.log('image', galleryImage.galleryImage)
    // artworkService.send(selectedFile)
    // console.log('data', data)
    artworkService.send(data)
    // saveFile(file)//lähetä kansioon..
  }

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

      <input type='file' name='galleryImage' onChange={fileSelectedHandler}/>
      <Button onClick={fileUploadHandler}>Upload</Button>


      {/*    <input type="file" className='upload-btn' onChange={(e) => uploadImage(e)} />
     <img src={this.StaticRange.multerImage} alt='upload' className='process_image'/>

      <fileBase type='file' multiple={false} onDone={this.getBaseFile.bind(this)}/>*/}



      <Form onSubmit={handleSubmit}>
        <Form.Group>
{/*           <Form.Label>Image: </Form.Label>
          <Form.Control
            type='text'
            name='image'
            //value={input.image}
            onChange={handleChange}
            autoFocus
          /> */}
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
  { createArtwork }
)( ArtworkForm )