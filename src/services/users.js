import axios from 'axios'
import url from './config'
import { handleError } from './serviceUtils'

const baseUrl = url + 'api/users'

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
    return handleError(error, 'Could not get userlist from db')
  }
}

const getAllArtists = async () => {
  try {
    const response = await axios.get(baseUrl + '/artists', getConfig())
    return response.data
  } catch (error) {
    return handleError(error, 'Could not get userlist from db')
  }
}

const getSingleUser = async (id) => {
  try {
    const response = await axios.get(baseUrl + `/artist/${id}`)
    return response.data
  } catch (error) {
    return handleError(error, 'Could not get user from db')
  }
}

const create = async (user) => {
  try {
    const response = await axios.post(baseUrl, user)
    return response.data
  } catch (error) {
    const status = error.response?.status
    if (status === 400) return { error: 'Username must be unique!' }
    if (status === 401) return { error: 'Username or password is incorrect.' }
    return handleError(error, 'Unable to connect to server.')
  }
}

const update = async (content) => {
  try {
    const response = await axios.put(baseUrl + '/admin', content, getConfig())
    return response.data
  } catch (error) {
    return handleError(error, 'User role could not be updated')
  }
}

const updateIntro = async (content, id) => {
  try {
    const response = await axios.put(
      baseUrl + `/intro/${id}`,
      content,
      getConfig(),
    )
    return response.data
  } catch (error) {
    return handleError(error, 'Users introduction text could not be updated')
  }
}

const updateUser = async (content) => {
  try {
    const response = await axios.put(
      baseUrl + `/info/${content.id}`,
      content,
      getConfig(),
    )
    return response.data
  } catch (error) {
    return handleError(error, 'User info could not be updated')
  }
}

const updatePassword = async ({ oldPassword, newPassword, confirm }) => {
  if (newPassword.length < 8) {
    return { error: 'Password needs to be at least 8 characters long' }
  }
  if (newPassword !== confirm) {
    return { error: 'Make sure the new password and the confirmation match' }
  }
  try {
    const response = await axios.put(
      baseUrl + '/password',
      { oldPassword, newPassword },
      getConfig(),
    )
    return response.data
  } catch (error) {
    return handleError(error, 'Old password is incorrect!')
  }
}

const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, getConfig())
    return response.data
  } catch (error) {
    return handleError(error, `User with userid ${id} not found!`)
  }
}

export default {
  getAll,
  getSingleUser,
  update,
  updateIntro,
  updateUser,
  create,
  deleteUser,
  setToken,
  updatePassword,
  getAllArtists,
}
