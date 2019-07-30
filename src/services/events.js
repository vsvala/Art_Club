import axios from 'axios'
import url from './config'
import { initLoggedUser } from '../reducers/actionCreators/loginActions'

const baseUrl = url + 'api/events'
//const baseUrl = '/api/events'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getConfig = () => {
  return{
    headers: { 'Authorization': token }
  }
}


// get all events
const getAll = async () => {
  console.log('service get all')
  try {
    const response = await axios.get(baseUrl, getConfig())
    console.log('service get all', response)
    console.log('servic get all data', response.data)
    return response.data
  } catch (error) {
    return { error: 'Could not get events from db' }
  }
}


// creates event
const create = async (data) => {
  console.log('servise create',data)
  // const config=getConfig()
  // console.log('serviseconfu',config)
  // data.append('config', config.token)

  try {
    const response = await axios.post(baseUrl, data, getConfig())
    console.log('response')
    console.log(response.statusText)
    return response.data
  } catch (error) {
    const status = error.response.status
    if (status === 500) {
      return { error: 'Unable to connect to server.' }
    } else if (status === 400) {
      return { error: 'event missing.' }
    } else if (status === 401) {
      return { error: 'Username or password is incorrect.' }
    } else {
      return { error: 'Unable to connect to server.' }
    }
  }
}


//Deletes a event from database by event.id. Only for admin!
const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(baseUrl + `/${id}`, getConfig())
    return response.data
  } catch (error) {
    return { error: 'Event with id "' + id + '" not found!' }
  }
}


export default { getAll, create, setToken, deleteEvent, initLoggedUser }
