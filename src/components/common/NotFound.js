import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>404</h1>
      <h3>Page not found</h3>
      <p>
        <Link to="/">Back to home</Link>
      </p>
    </div>
  )
}

export default NotFound
