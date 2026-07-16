import axios from 'axios'
import { handleError } from './serviceUtils'

const baseUrl = '/api/artworks'

let token = null

const setToken = (newToken) => {
  token = newToken ? `Bearer ${newToken}` : null
}

const getConfig = () => {
  return {
    headers: { Authorization: token },
  }
}

const getPage = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(baseUrl, {
      params: { page, limit },
    })
    return response.data // expected: { artworks: [], hasMore: bool }
  } catch (error) {
    return handleError(error, 'Could not get artworks from db')
  }
}

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (error) {
    return handleError(error, 'Could not get artworks from db')
  }
}

const getSingleArtwork = async (id) => {
  try {
    const response = await axios.get(baseUrl + `/${id}`)
    return response.data
  } catch (error) {
    return handleError(error, 'Could not get artwork from db')
  }
}

const create = async (data) => {
  try {
    const response = await axios.post(baseUrl, data, getConfig())
    return response.data
  } catch (error) {
    const status = error.response?.status
    if (status === 400) return { error: 'artwork missing.' }
    if (status === 401) return { error: 'Username or password is incorrect.' }
    return handleError(error, 'Unable to connect to server.')
  }
}

const update = async (id, newObject) => {
  try {
    const response = await axios.put(baseUrl + `/${id}`, newObject, getConfig())
    return response.data
  } catch (error) {
    return handleError(error, 'Could not update artwork')
  }
}

const deleteArtwork = async (id) => {
  try {
    const response = await axios.delete(baseUrl + `/${id}`, getConfig())
    return response.data
  } catch (error) {
    return handleError(error, `Artwork with id "${id}" not found!`)
  }
}

export default {
  getAll,
  getPage,
  create,
  update,
  setToken,
  deleteArtwork,
  getSingleArtwork,
}
