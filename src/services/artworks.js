import axios from 'axios'
//import url from './config'

//const baseUrl = url + 'api/artworks/'
const baseUrl = 'http://localhost:3001/artworks'


const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (error) {
    return { error: 'Could not get artworks from db' }
  }
}

export default { getAll }