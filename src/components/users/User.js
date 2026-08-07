import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import DeleteButton from '../common/DeleteButton'
import { Form } from 'react-bootstrap'
import { updateRole } from '../../reducers/actionCreators/userActions'

const User = ({ user, onClick }) => {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.loggedUser.loggedUser)
  const isAdmin = loggedUser?.role === 'admin'

  const handleRoleChange = (userId) => (event) => {
    const formContent = {
      role: event.target.value,
      id: userId,
    }
    dispatch(updateRole(formContent))
  }

  return (
    <tr>
      <td>
        <Link to={`/artists/${user.id}`}>
          <p>{user.name}</p>
        </Link>
      </td>
      <td> {user.username}</td>
      <td>
        {isAdmin ? (
          <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <div className="col-md-12">
                <Form.Control as="select" onChange={handleRoleChange(user.id)}>
                  <option hidden>{user.role}</option>
                  <option value="nonMember">nonMember</option>
                  <option value="member">member</option>
                  <option value="admin">admin</option>
                </Form.Control>
              </div>
            </Form.Group>
          </Form>
        ) : (
          user.role
        )}
      </td>
      <td> {user.email}</td>
      <td> {user.artworks.length}</td>
      <td className="delete">
        {isAdmin && <DeleteButton id={user.id} onClick={onClick} />}
      </td>
    </tr>
  )
}

export default User
