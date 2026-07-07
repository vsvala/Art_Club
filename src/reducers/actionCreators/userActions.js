import userService from '../../services/users'

export const createUser = (content) => {
  return async (dispatch) => {
    const response = await userService.create(content)
    if (response.error || response === undefined) {
      dispatch({ type: 'NOTIFY', data: response.error })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 3000)
    } else {
      dispatch({ type: 'CREATE_USER', data: response })
      dispatch({ type: 'NOTIFY', data: 'User Registered' })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 3000)
    }
  }
}

export const updateUser = (content) => {
  return async (dispatch) => {
    const response = await userService.updateUser(content)
    if (response.error || response === undefined) {
      dispatch({ type: 'NOTIFY', data: response.error })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 3000)
      return { success: false, error: response?.error || 'Update failed!' }
    } else {
      dispatch({ type: 'UPDATE_USER', data: response })
      dispatch({ type: 'NOTIFY', data: 'Information updated' })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 3000)
      return { success: true, data: response }
    }
  }
}

export const getUsers = () => {
  return async (dispatch) => {
    const content = await userService.getAll()
    dispatch({ type: 'GET_USERS', data: content })
  }
}

export const getArtists = () => {
  return async (dispatch) => {
    const content = await userService.getAllArtists()
    dispatch({ type: 'GET_ARTISTS', data: content })
  }
}

export const deleteUser = (user_id) => {
  return async (dispatch) => {
    const response = await userService.deleteUser(user_id)
    if (response.error || response === undefined) {
      dispatch({ type: 'NOTIFY', data: 'Delete failed!' })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 3000)
    } else {
      dispatch({ type: 'DELETE_USER', data: { id: user_id } })
      dispatch({ type: 'NOTIFY', data: 'User deleted' })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 3000)
    }
  }
}

export const updateRole = (content) => {
  return async (dispatch) => {
    const response = await userService.update(content)
    if (response.error || response === undefined) {
      dispatch({ type: 'NOTIFY', data: 'Update failed!' })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 3000)
    } else {
      const id = content.id
      const role = content.role
      dispatch({ type: 'UPDATE_ROLE', data: { id, role } })
      dispatch({ type: 'NOTIFY', data: 'User updated' })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 3000)
    }
  }
}

export const initializeSingleUser = (id) => {
  return async (dispatch) => {
    const content = await userService.getSingleUser(id)
    dispatch({ type: 'INIT_SINGLE_USER', data: content })
  }
}

export default {
  createUser,
  getUsers,
  deleteUser,
  updateRole,
  initializeSingleUser,
  getArtists,
}
