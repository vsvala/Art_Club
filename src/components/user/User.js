import React from 'react'
// import { Link } from 'react-router-dom'

const User = ({ user }) => {

  //{console.log('user.user',user.name)}
  return (
    <tr>
      <td> {user.id} </td>
      <td> {user.name}</td>
      <td> {user.username}</td>
      <td> {user.role}</td>
      <td> {user.email}</td>
      <td> {user.artworks}</td>
    </tr>
  )
}
export default User