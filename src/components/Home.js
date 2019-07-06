import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
  <div>

    <h2>Art club</h2>

    TODO...
    ABOUT INFO...
    IMPORT PITURE/
    SLIDESHOW ...featuring picture of a month...
    loginform?
    <div className="home">
      <p> <Link to='/login' className='login'>Login</Link> or <Link to='/register' className='register'>Register</Link> and apply membership</p>
    </div>
  </div>
)
export default Home