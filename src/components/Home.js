import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
  <div>

    <h2>Art club</h2>

    TODO...
    IMPORT PITURE/ORSLIDESHOW ...featuring picture of a month..???.
    <div className="home">

      <h2>About</h2>
      <p>Wellcome to join Art club. Ass a member you can add  10 pictures to main gallery and have your own artist page where you can add paictures and short introduction of yourself. You will also find Art clubs newest happenings and subscribe to our email-list.  </p>
      <p> <Link to='/login' className='login'>Login</Link> or <Link to='/register' className='register'>Register</Link> to apply membership</p>
    </div>
  </div>
)
export default Home