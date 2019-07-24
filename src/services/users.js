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


//gets all users for loggedUser
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


//gets all users
const getAllArtists = async () => {
  try {
    console.log('servise getallArtists')
    const response =await axios.get(baseUrl+'/artists', getConfig())
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
// const getSingleUser = async (id) => {
//   try {
//     const response = await axios.get(baseUrl + `/admin/${id}`, getConfig())
//     return response.data
//   } catch (error) {
//     if (error === 400) {
//       return { error: 'Could not get user from db' }
//     }
//     if (error === 500) {
//       return { error: 'Internal server error' }
//     }
//   }
// }

//gets a single user by id
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


//update userrole
const update = async (content) => {
  console.log('service update',content)
  try{
    const response = await axios.put(baseUrl + '/admin', content, getConfig())// `/admin/${id}`,
    console.log('response data', response.data)
    return response.data
  }catch(error){
    return { error: 'User role could not be updated' }
  }
}


//update user information
const updateIntro = async (content, id) => {
  console.log('service update info',content, id)
  try{
    const response = await axios.put(baseUrl + `/intro/${id}`, content, getConfig())
    console.log('response data', response.data)
    return response.data
  }catch(error){
    return { error: 'Users introduction text could not be updated' }
  }
}


//update user information
const updateUser = async (content) => {
  console.log('service update info',content)
  try{
    const response = await axios.put(baseUrl + '/info', content, getConfig())
    console.log('response data', response.data)
    return response.data
  }catch(error){
    return { error: 'User info could not be updated' }
  }
}

//update password
const updatePassword = async ({ oldPassword, newPassword, confirm }) => {
  console.log('service update password config',getConfig())
  if (newPassword.length < 8) {
    return { error: 'Password needs to be at least 8 characters long' }
  }
  if (newPassword === confirm) {
    try {
      const response = await axios.put(baseUrl+ '/password', { oldPassword, newPassword }, getConfig())
      return response.data
    } catch (error) {
      return { error: 'Old password is incorrect!' }
    }
  } else {
    return { error: 'Make sure the new password and the confirmation match' }
  }
}

//delete user
const deleteUser = async(id) => {
  try {
    const response= await axios.delete(`${baseUrl}/${id}`, getConfig())
    return response.data
  } catch (error) {
    return { error: 'User with userid ' + id + ' not found!' }
  }
}


export default { getAll, getSingleUser, update, updateIntro, updateUser, create, deleteUser, setToken, updatePassword, getAllArtists }