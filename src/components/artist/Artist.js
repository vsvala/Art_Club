import React from 'react'
import { Link } from 'react-router-dom'

const Artist = ({ user }) => {
  return (
    <tr>
      <td>
        <Link to={`/artists/${user.id}`}> {<p>{user.name}</p>} </Link>
      </td>
      <td> {user.artworks.length}</td>
    </tr>
  )
}

export default Artist
