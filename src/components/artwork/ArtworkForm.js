import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createArtwork, deleteArtwork  } from '../../reducers/actionCreators/artworkActions'
import { Form, Button, Col } from 'react-bootstrap'
import { getUsers } from '../../reducers/actionCreators/userActions'
import artworkService from '../../services/artworks'
import FormData from 'form-data'
import ArtworkThumb from './ArtworkThumb'


export const ArtworkForm = (
  {
  // deleteArtwork,
    getUsers,
    users,
    id
  }
) => {
  useEffect(() => {
    console.log('id')
    getUsers()
  }, [])

  const userToShow =users.find(u => u.id===id)



  //event handler for deleting specific  artworkn
  const removeArtwork = (artworkId) => {
    return () => {
      if (window.confirm('Do you want to delete this artwork?')) {
        deleteArtwork(artworkId)//, loggedUser.user.user_id
      }
    }
  }

  const [input, setInput] = useState({ image: '', artist: '', name: '',year: '',size: '',medium: '', selectedFile:null })
  const [galleryImage, setFile] = useState({ })


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
    data.append('userId',id)

    const formContent = {
      artist: event.target.artist.value,
      name: event.target.name.value,
      year: event.target.year.value,
      size: event.target.size.value,
      medium:event.target.medium.value,
      userId:id
    }
    console.log('submit', formContent)
    console.log('submitdata', data)

    //TODOOOO...tämä actioncreatoreiden kautta.. createArtwork(formContent)
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
  // if (userArtworks){
  //   const artworkList=userArtworks
  //     .map(artwork =>
  //       <ArtworkThumb
  //         artwork={artwork}
  //         key={artwork.id}//artwork_id
  //         onClick={removeArtwork}
  //       />
  //     )}

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

            <input type='file'className='fileUploader' name='galleryImage' id="file" onChange={fileSelectedHandler}/>

            {/* <Button onClick={fileUploadHandler}>Upload</Button> */}

            <Button className='button' type='submit' variant="light">Send</Button>

          </Form.Group>
        </Form>

        <br/>
        <br/>
        {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1<h4>TODO  EROTA FORMI kehyksillä taipiilota added..</h4> */}
        <h2>Added artworks { userToShow && userToShow.artworks.length}/10 </h2>
        <h4>You can add 10 images to the gallery. TODO RAJOITE.</h4>
        <br/>
        <div className='addedArt'>
          { userToShow &&  userToShow
            .artworks
            .map(a =>
              <ArtworkThumb
                key={a.id}
                artwork={a}
                onClick={removeArtwork}
              />
            )}
        </div>
      </Col>
    </div>

  )
}

const mapStateToProps = (state, id) => {
  console.log('stateeeeeeeeeeeee', state.users.users)
  return {
    users: state.users.users
    //.find(u => u.id===id)
  }
}

export default connect(
  mapStateToProps,
  { createArtwork, getUsers }
)( ArtworkForm )


