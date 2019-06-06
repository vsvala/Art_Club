import axios from 'axios'
//import url from './config'

const baseUrl =  'http://localhost:3001/api/artworks'

//const baseUrl = url + 'api/artworks/'
//const baseUrl = 'http://localhost:3001/artworks'  //json server


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

const create = async (artwork) => {
  console.log('servise create',artwork)

  try {
    const response = await axios.post(baseUrl, artwork)
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


export default { getAll, create }