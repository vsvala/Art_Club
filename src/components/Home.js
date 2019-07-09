import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { initLoggedUser } from '../reducers/actionCreators/loginActions'
import logo from '../images/tripleblue.png'


export const Home = ( props) => {

  useEffect(() => {
    initLoggedUser()
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
            width='700'
            height='350'
            className='logLogo'
            alt='Art club LOGO'
          />
          <br/>
          {/* <p>   TODO..IMPORT PITURE/ORSLIDESHOW ...featuring picture of a month..???.</p>
          <h3>About</h3> */}
          <p>Wellcome to join Art club. Ass a member you can add  10 pictures to main gallery and have your own artist page where you can add paictures and short introduction of yourself. You will also find Art clubs newest happenings and subscribe to our email-list.  </p>
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
  { initLoggedUser }
)( Home )
