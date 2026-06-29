import axios from 'axios'
import url from './config'

const baseUrl = url + 'api/events'

let token = null

const setToken = newToken => {
  token = newToken ? `bearer ${newToken}` : null
}

const getConfig = () => {
  return {
    headers: { 'Authorization': token }
  }
}

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl, getConfig())
    return response.data
  } catch (error) {
    return { error: 'Could not get events from db' }
  }
}

const create = async (data) => {
  try {
    const response = await axios.post(baseUrl, data, getConfig())
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

const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(baseUrl + `/${id}`, getConfig())
    return response.data
  } catch (error) {
    return { error: 'Event with id "' + id + '" not found!' }
  }
}

export default { getAll, create, setToken, deleteEvent }
