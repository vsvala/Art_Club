import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateLoggedUser } from '../reducers/actionCreators/loginActions'
import logo from '../images/tripleblue.png'


export const Home = ( props) => {

  useEffect(() => {
    updateLoggedUser()
  }, [])

  return (
    <div>

      {props.loggedUser && props.loggedUser.role === 'nonMember'
        ?
        <div className="nonMember">
          <h2>Art club</h2>
          <h3>Your membership application will be processed soon... </h3>
          <p> Once your application is approved, you are informed of your acceptances by email.</p>
        </div>
        :
        <div className="home">
          <h1>Wellcome To Art Club!</h1>
          <br/>
          <img
            src={logo}
            width='600'
            height='300'
            className='frontLogo'
            alt='Art club LOGO'
          />
          <br/>
          <br/>
          <p>Wellcome to join Art club. Ass a member you can have your own artist page where it is possible to upload max 10 pictures and short introduction about yourself.
             Added pictures will be displayed on main gallery page. You will also find Art clubs upcoming events and subscribe to our email-list.  </p>
          <p> <Link to='/login' className='login'>Login</Link> or <Link to='/register' className='register'>Register</Link> to apply membership</p>
        </div>
      }
    </div>
  )}


const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser.loggedUser
  }
}

export default connect(
  mapStateToProps,
  { updateLoggedUser }
)( Home )
