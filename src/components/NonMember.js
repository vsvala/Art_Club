import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { initLoggedUser } from '../reducers/actionCreators/loginActions'


export const Home = ({ props }) => {

  useEffect(() => {
    props.initLoggedUser()
  }, [])
  const { loggedUser } = props
  const isMember = loggedUser && loggedUser.role === 'member'

  return (
    <div>

      <h2>Art club</h2>
      {props.loggedUser && isMember
        ?
        <div className="nonMember">
          <h2>Your Membership application will be processed soon... </h2>
          <p> Once your application is approved, you are informed of your acceptance of membership within one week by email.</p>
        </div>
        : <em>   <p>   TODO...
    IMPORT PITURE/ORSLIDESHOW ...featuring picture of a month..???.</p></em>}


      <div className="home">

        <h2>About</h2>
        <p>Wellcome to join Art club. Ass a member you can add  10 pictures to main gallery and have your own artist page where you can add paictures and short introduction of yourself. You will also find Art clubs newest happenings and subscribe to our email-list.  </p>
        <p> <Link to='/login' className='login'>Login</Link> or <Link to='/register' className='register'>Register</Link> to apply membership</p>
      </div>
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
