import React, { useEffect } from 'react'
import * as Sentry from '@sentry/react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateLoggedUser } from '../reducers/actionCreators/loginActions'
import logo from '../images/tripleblue.svg'

export const Home = (props) => {
  useEffect(() => {
    updateLoggedUser()
  }, [])

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return
    }

    const params = new URLSearchParams(window.location.search)
    if (params.get('sentry_test') === '1') {
      const eventId = Sentry.captureException(
        new Error('Sentry production source map test error'),
      )

      Sentry.flush(5000).then((ok) => {
        // Console output is intentional for one-off production validation with ?sentry_test=1.
        console.log('[Sentry test] eventId:', eventId, 'flush:', ok)
      })
    }
  }, [])

  const sendSentryTestError = () => {
    Sentry.captureException(new Error('Sentry frontend test error'))
  }

  return (
    <div>
      {props.loggedUser && props.loggedUser.role === 'nonMember' ? (
        <div className="nonMember">
          <h2>Art club</h2>
          <h3>Your membership application will be processed soon... </h3>
          <p>
            {' '}
            Once your application is approved, you`&apos;`ll get notification by
            email.
          </p>
        </div>
      ) : (
        <div className="home">
          <h1>Welcome To Art Club!</h1>
          <br />
          <img src={logo} className="frontLogo" alt="Art club LOGO" />
          <br />
          <br />
          <p>
            Welcome to join Art club. As a member you can have your own artist
            page where it is possible to upload max 10 pictures and short
            introduction about yourself. Added pictures will be displayed on
            main gallery page. You will also find Art club`&apos;`s upcoming
            events and subscribe to our email-list.{' '}
          </p>
          <p>
            {' '}
            <Link to="/login" className="login">
              Login
            </Link>{' '}
            or{' '}
            <Link to="/register" className="register">
              Register
            </Link>{' '}
            to apply membership
          </p>
          {process.env.NODE_ENV === 'development' ? (
            <button
              type="button"
              className="button"
              style={{ marginTop: '12px' }}
              onClick={sendSentryTestError}
            >
              Send Sentry test error
            </button>
          ) : null}
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser.loggedUser,
  }
}

export default connect(mapStateToProps, { updateLoggedUser })(Home)
