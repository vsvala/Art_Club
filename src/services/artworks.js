import axios from 'axios'
import url from './config'

const baseUrl = url + 'api/artworks/'

let token = null


const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getConfig = () => {
  return{
    headers: { 'Authorization': token }
  }
}

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    console.log('service get all', response)
    console.log('servic get all data', response.data)
    return response.data

  } catch (error) {
    return { error: 'Could not get artworks from db' }
  }
}

const getSingleArtwork= async (id) => {
  console.log('service get singleartwork')

  try {
    const response = await axios.get(baseUrl + `/${id}`)
    return response.data
  } catch (error) {
    if (error === 400) {
      return { error: 'Could not getartwork from db' }
    }
    if (error === 500) {
      return { error: 'Internal server error' }
    }
  }
}

const create = async (data) => {
  console.log('servise create',data)
  // const config=getConfig()
  // console.log('serviseconfu',config)
  // data.append('config', config.token)

  try {
    const response = await axios.post(baseUrl, data)
    console.log('response')
    console.log(response.statusText)
    return response.data
  } catch (error) {
    const status = error.response.status
    if (status === 500) {
      return { error: 'Unable to connect to server.' }
    } else if (status === 400) {
      return { error: 'artwork missing.' }
    } else if (status === 401) {
      return { error: 'Username or password is incorrect.' }
    } else {
      return { error: 'Unable to connect to server.' }
    }
  }
}

// const send = async (galleryImage) => {
//   console.log('servise create', galleryImage)

//   try {
//     const response = await axios.post('http://localhost:3001/api/images', galleryImage)/* , {
//       headers: {
//         // 'accept': 'application/json',
//         // 'Accept-Language': 'en-US,en;q=0.8',
//         'Content-Type': 'multipart/form-data'
//       }, */
//     // })
//     console.log('response')
//     console.log(response.statusText)
//     return response.data
//   } catch (error) {
//     const status = error.response.status
//     if (status === 500) {
//       return { error: 'Unable to connect to server.' }
//     } else if (status === 400) {
//       return { error: 'artwork missing.' }
//     } else if (status === 401) {
//       return { error: 'Username or password is incorrect.' }
//     } else {
//       return { error: 'Unable to connect to server.' }
//     }
//   }
// }

const update = async(content, id) => {
  try {
    const response = await axios.put(`${ baseUrl } /${id}`,content, getConfig())
    return response.data
  } catch (error) {
    return { error: 'Could not update artwork' }
  }
}

//Deletes a student from database by student number. Only for admin!
const deleteArtwork = async (id) => {
  try {
    const response = await axios.delete(baseUrl + `/${id}`)//, getConfig())
    return response.data
  } catch (error) {
    return { error: 'Student with student number "' + id + '" not found!' }
  }
}


export default { getAll, getSingleArtwork, create, update, setToken, deleteArtwork }