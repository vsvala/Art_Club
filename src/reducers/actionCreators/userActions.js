import userService from '../../services/users'


// Register and creates new user
export const createUser=(content) => {
  return async (dispatch)  => {
    console.log('createUserACTION', content)
    const response= await userService.create(content)
    console.log(response,'uuusUser')
    if (response.error || response === undefined) {
      dispatch({
        type: 'NOTIFY',
        data: response.error
        //'Registering user failed!'
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
        })
      }, 3000)
    } else {

      dispatch({
        type:'CREATE_USER',
        data:response
      })
      dispatch({
        type: 'NOTIFY',
        data: 'User Registered'
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
        })
      }, 3000)
    }
  }
}

//updating user iformation
export const updateUser = (content) => {
  return async (dispatch) => {
    const response = await userService.updateUser(content)
    if (response.error || response === undefined) {
      dispatch({
        type: 'NOTIFY',
        data: response.error
        //'Saving failed!'
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
        })
      }, 3000)
    } else {
      dispatch({
        type: 'UPDATE_USER',
        data: response
      })
      dispatch({
        type: 'NOTIFY',
        data: 'Information updated'
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
        })
      }, 3000)
    }
  }
}

// get all usesrs for loggedUser
export const getUsers = () => {
  return async (dispatch) => {
    console.log('initinUSers_ACTION')
    const content = await userService.getAll()
    console.log('initinUSers_AcTION and content',content)
    dispatch({
      type: 'GET_USERS',
      data:content
    })
  }
}

// gets all artistsList
export const getArtists = () => {
  return async (dispatch) => {
    console.log('initinUSers_ACTION')
    const content = await userService.getAllArtists()
    console.log('initinUSers_AcTION and content',content)
    dispatch({
      type: 'GET_ARTISTS',
      data:content
    })
  }
}

// delete user
export const deleteUser = (user_id) => {
  return async (dispatch) => {
    const response = await userService.deleteUser(user_id)
    if (response.error || response === undefined) {
      dispatch({
        type: 'NOTIFY',
        data: 'Delete failed!'
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
        })
      }, 3000)
    } else {
      dispatch({
        type: 'DELETE_USER',
        data: { id: user_id }
      })
      dispatch({
        type: 'NOTIFY',
        data: 'User deleted'
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
        })
      }, 3000)
    }
  }
}

// Admin can update users role
export const updateRole = (content) => {
  console.log('updateRole_ACTION', content)
  return async (dispatch) => {
    const response = await userService.update(content)
    console.log('response from update', response)

    if (response.error || response === undefined) {
      dispatch({
        type: 'NOTIFY',
        data: 'Update failed!'
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
        })
      }, 3000)
    } else {
      console.log('updatedispatch succes')
      const  id=content.id
      const role=content.role
      dispatch({
        type: 'UPDATE_ROLE',

        data:{
          id,
          role
        }
      })
      dispatch({
        type: 'NOTIFY',
        data: 'User updated'
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
        })
      }, 3000)
    }
  }
}

// tells userservice to get specific user by id from database
export const initializeSingleUser = (id) => {
  console.log('initializeSingleUser')
  return async (dispatch) => {
    const content = await userService.getSingleUser(id)
    console.log('contentfromsigleACTION', content)

    dispatch({
      type: 'INIT_SINGLE_USER',
      data: content
    })
  }
}



export default { createUser, getUsers, deleteUser, updateRole, initializeSingleUser, getArtists }//, initializeSingleArtist

//NOT NEEDED?
// tells userservice to get specific artist/user by id from database
// export const initializeSingleArtist = (userId) => {
//   console.log('initializeSingleUser')
//   return async (dispatch) => {
//     const content = await userService.getSingleArtist(userId)
//     console.log('contentfromsigleACTION', content)

//     dispatch({
//       type: 'INIT_SINGLE_ARTIST',
//       data: content
//     })
//   }
// }