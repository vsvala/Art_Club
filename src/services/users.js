import axios from 'axios'
//import url from './config'

const baseUrl =  'http://localhost:3001/api/users'

//TODO  get config

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getConfig = () => {
  return {
    headers: { 'Authorization': token }
  }
}

//gets all users
const getAll = async () => {
  try {
    console.log('servise getallusers')
    const response =await axios.get(baseUrl, getConfig())
    console.log('response from service',response.data)
    return response.data

  }catch(error)
  {
    if (error === 400) {
      return { error: 'Could not get userlist from db' }
    }
  }
}
//gets a single user by id
const getSingleUser = async (id) => {
  try {
    const response = await axios.get(baseUrl + `/${id}`, getConfig())
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

//create new user
const create = async (user) => {
  console.log('servise create', user)
  try {
    const response = await axios.post(baseUrl, user)
    return response.data
  } catch (error) {
    const status = error.response.status
    if (status === 500) {
      return { error: 'Unable to connect to server.' }
    } else if (status === 400) {
      return { error: 'user missing.' }
    } else if (status === 401) {
      return { error: 'Username or password is incorrect.' }
    } else {
      return { error: 'Unable to connect to server.' }
    }
  }
}


//update user
const update = async (content) => {
  console.log('service update',content)
  try{
    const response = await axios.put(baseUrl + '/admin', content, getConfig())// `/admin/${id}`,
    console.log('response data', response.data)
    return response.data
  }catch(error){
    return { error: 'User could not be updated' }
  }
}


//delete user
const deleteUser = async(id) => {
  try {
    const response= await axios.delete(`${baseUrl}/${id}`, getConfig())
    return response.data
  } catch (error) {
    return { error: 'User with userid "' + id + '" not found!' }
  }
}


export default { getAll, getSingleUser, update, create, deleteUser, setToken }