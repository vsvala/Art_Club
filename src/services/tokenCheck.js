import axios from 'axios'
import url from './config'

const baseUrl = url  + 'api/tokenCheck'
//const baseUrl = url  + '/tokenCheck'

const userCheck = async (token) => {
  try {
    console.log('usercheck servisestä')
    const response = await axios.get(baseUrl, { headers: { 'Authorization': 'Bearer ' + token } })
    console.log('usercheck servisestä', response)
    return response.data
  } catch (error) {
    return { error: 'Something went wrong' }
  }
}

export default { userCheck }