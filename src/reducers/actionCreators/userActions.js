import userService from '../../services/users'

// export const createUser=(content) => {
//   console.log('createuserACTION', content)
//   return async (dispatch)  => {
//     const newUser = await userService.create(content)
//     console.log('newuserTO store from from userservice', newUser)
//     if (newUser.error || newUser === undefined) {
//       console.log('virheEEEEEEEEEEE')}
//     //   dispatch({
//     //     type: 'NOTIFY',
//     //     data: 'Saving failed!'
//     //   })

//     dispatch({
//       type:'CREATE_USER',
//       data:newUser
//     })
//   }
// }

// creates new artwork

export const createUser=(content) => {
  return async (dispatch)  => {
    console.log('createUserACTION', content)
    const user= await userService.create(content)
    console.log(user,'uuusUser')
    if (user.error || user === undefined) {
      dispatch({
        type: 'NOTIFICATION',
        data: 'Creating user failed!'
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
        })
      }, 3000)
    } else {

      dispatch({
        type:'CREATE_USER',
        data:user
      })
      dispatch({
        type: 'NOTIFICATION',
        data: 'User created'
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
        })
      }, 3000)
    }
  }
}

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

export default { createUser, getUsers }