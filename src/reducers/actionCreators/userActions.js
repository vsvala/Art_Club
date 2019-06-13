import userService from '../../services/users'

export const createUser=(content) => {
  return async (dispatch)  => {
    const newUser = await userService.create(content)
    dispatch({
      type:'CREATE_USER',
      data:newUser
    })
  }
}

export const initializeUsers = () => {
  return async (dispatch) => {
    const content = await userService.getAll()
    console.log(content)
    dispatch({
      type: 'INITIALIZE_USERS',
      data:content
    })
  }
}

export default { createUser, initializeUsers }