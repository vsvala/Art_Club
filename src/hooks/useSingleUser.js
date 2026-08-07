import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeSingleUser } from '../reducers/actionCreators/userActions'

export const useSingleUser = (id) => {
  const dispatch = useDispatch()
  const singleUser = useSelector((state) => state.singleUser.singleUser)

  useEffect(() => {
    dispatch(initializeSingleUser(id))
  }, [id, dispatch])

  return singleUser
}
