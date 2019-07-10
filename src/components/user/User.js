import React from 'react'
import { Link } from 'react-router-dom'
import DeleteButton from '../common/DeleteButton'
//import Checkbox from '../common/Checkbox'
import { connect } from 'react-redux'
import userActions from '../../reducers/actionCreators/userActions'
import { Form } from 'react-bootstrap'

const User = ({ user, onClick, updateRole }) => {

  const handleRoleChange = (userId) => (event) => {
    const formContent = {
      role: event.target.value,
      id:userId }
    console.log('handleRolechange', userId, formContent)
    updateRole( formContent)
  }

  return (
    <tr>
      <td><Link to={`/admin/users/${user.id}`}> {<p>{user.name}</p>} </Link></td>
      {/* <td> {user.id} </td> */}
      <td> {user.username}</td>
      {/* <td> {user.role}</td> */}
      <td>
        <Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <div className="col-md-12">
              <Form.Control as="select"
                onChange={ handleRoleChange(user.id) }
              >
                <option hidden >{user.role}</option>
                <option value="nonMember">nonMember</option>
                <option value="member">member</option>
                <option value="admin">admin</option>
              </Form.Control></div>
          </Form.Group>
        </Form>
      </td>
      <td> {user.email}</td>
      <td> {user.artworks.length}</td>
      <td className="delete"><DeleteButton id={user.id} onClick={onClick} /></td>
    </tr>
  )
}

export default connect(
  null,
  { ...userActions }
)(User)
