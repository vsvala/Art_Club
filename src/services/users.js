import axios from 'axios'
//import url from './config'

const baseUrl =  'http://localhost:3001/api/users'

//TODO  get config

//gets all users
const getAllUsers =async () => {
  try{
    const response = axios.get(baseUrl)
    return response.data
  }catch(error)
  {
    if (error === 400) {
      return { error: 'Could not get userlist from db' }
    }
  }
}
//gets a single user by id
const getUser = async (id) => {
  try {
    const response = await axios.get(baseUrl + `/${id}`)
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
const createUser = async (user) => {
  console.log('servise create',user)
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
const updateUser = async (content, id) => {
  try{
    const response = await axios.put(`${baseUrl}/${id}`, content)
    return response.data
  }catch(error){
    return { error: 'User could not be updated' }
  }
}


//delete user
const deleteUser = async(id) => {
  try {
    const response= await axios.delete(`${baseUrl}/${id}`)
    return response.data
  } catch (error) {
    return { error: 'User with userid "' + id + '" not found!' }
  }
}


export default { getAllUsers, getUser, updateUser, createUser, deleteUser }