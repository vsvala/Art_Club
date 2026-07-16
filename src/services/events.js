import axios from 'axios'
import url from './config'
import { handleError } from './serviceUtils'

const baseUrl = url + 'api/events'

let token = null

const setToken = (newToken) => {
  token = newToken ? `Bearer ${newToken}` : null
}

const getConfig = () => {
  return {
    headers: { Authorization: token },
  }
}

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl, getConfig())
    return response.data
  } catch (error) {
    return handleError(error, 'Could not get events from db')
  }
}

const create = async (data) => {
  try {
    const response = await axios.post(baseUrl, data, getConfig())
    return response.data
  } catch (error) {
    const status = error.response?.status
    if (status === 400) return { error: 'event missing.' }
    if (status === 401) return { error: 'Username or password is incorrect.' }
    return handleError(error, 'Unable to connect to server.')
  }
}

const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(baseUrl + `/${id}`, getConfig())
    return response.data
  } catch (error) {
    return handleError(error, `Event with id "${id}" not found!`)
  }
}

export default { getAll, create, setToken, deleteEvent }