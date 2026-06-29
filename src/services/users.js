import axios from 'axios'
import url from './config'

const baseUrl = url + 'api/users'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
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
    if (error === 400) {
      return { error: 'Could not get userlist from db' }
    }
  }
}

const getAllArtists = async () => {
  try {
    const response = await axios.get(baseUrl + '/artists', getConfig())
    return response.data
  } catch (error) {
    if (error === 400) {
      return { error: 'Could not get userlist from db' }
    }
  }
}

const getSingleUser = async (id) => {
  try {
    const response = await axios.get(baseUrl + `/artist/${id}`)
    return response.data
  } catch (error) {
    if (error === 400) {
      return { error: 'Could not get user from db' }
    }
    if (error === 500) {
      return { error: 'Internal server error' }
    }
  }
}

const create = async (user) => {
  try {
    const response = await axios.post(baseUrl, user)
    return response.data
  } catch (error) {
    const status = error.response.status
    if (status === 500) {
      return { error: 'Unable to connect to server.' }
    } else if (status === 400) {
      return { error: 'Username must be unique!' }
    } else if (status === 401) {
      return { error: 'Username or password is incorrect.' }
    } else {
      return { error: 'Unable to connect to server.' }
    }
  }
}

const update = async (content) => {
  try {
    const response = await axios.put(baseUrl + '/admin', content, getConfig())
    return response.data
  } catch (error) {
    return { error: 'User role could not be updated' }
  }
}

const updateIntro = async (content, id) => {
  try {
    const response = await axios.put(baseUrl + `/intro/${id}`, content, getConfig())
    return response.data
  } catch (error) {
    return { error: 'Users introduction text could not be updated' }
  }
}

const updateUser = async (content) => {
  try {
    const response = await axios.put(baseUrl + `/info/${content.id}`, content, getConfig())
    return response.data
  } catch (error) {
    return { error: 'User info could not be updated' }
  }
}

const updatePassword = async ({ oldPassword, newPassword, confirm }) => {
  if (newPassword.length < 8) {
    return { error: 'Password needs to be at least 8 characters long' }
  }
  if (newPassword === confirm) {
    try {
      const response = await axios.put(baseUrl + '/password', { oldPassword, newPassword }, getConfig())
      return response.data
    } catch (error) {
      return { error: 'Old password is incorrect!' }
    }
  } else {
    return { error: 'Make sure the new password and the confirmation match' }
  }
}

const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, getConfig())
    return response.data
  } catch (error) {
    return { error: 'User with userid ' + id + ' not found!' }
  }
}

export default { getAll, getSingleUser, update, updateIntro, updateUser, create, deleteUser, setToken, updatePassword, getAllArtists }
