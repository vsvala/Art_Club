import axios from 'axios'

const baseUrl = '/api/artworks'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getConfig = () => {
  return {
    headers: { 'Authorization': token }
  }
}

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (error) {
    return { error: 'Could not get artworks from db' }
  }
}

const getSingleArtwork = async (id) => {
  try {
    const response = await axios.get(baseUrl + `/${id}`)
    return response.data
  } catch (error) {
    if (error === 400) {
      return { error: 'Could not get artwork from db' }
    }
    if (error === 500) {
      return { error: 'Internal server error' }
    }
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
      return { error: 'artwork missing.' }
    } else if (status === 401) {
      return { error: 'Username or password is incorrect.' }
    } else {
      return { error: 'Unable to connect to server.' }
    }
  }
}

const update = async (id, newObject) => {
  try {
    const response = await axios.put(baseUrl + `/${id}`, newObject, getConfig())
    return response.data
  } catch (error) {
    return { error: 'Could not update artwork' }
  }
}

const deleteArtwork = async (id) => {
  try {
    const response = await axios.delete(baseUrl + `/${id}`, getConfig())
    return response.data
  } catch (error) {
    return { error: 'Artwork with id "' + id + '" not found!' }
  }
}

export default { getAll, create, update, setToken, deleteArtwork, getSingleArtwork }
