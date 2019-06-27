import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
// import logo from './logo.simport {
import { BrowserRouter as Router, Route, Link, } from 'react-router-dom'  //Redirect, withRouter
import './App.css'

// Actions
import { logout, initLoggedUser } from './reducers/actionCreators/loginActions'

// Components
import ArtworkForm from './components/artwork/ArtworkForm'
import ArtworkList from './components/artwork/ArtworkList'
import RegisterUserForm from './components/login/RegisterUserForm'
import LoginForm from './components/login/LoginForm'
import UserList from './components/user/UserList'


const App = (props) => {

  useEffect(() => {
    props.initLoggedUser()
  }, [])

  const { loggedUser } = props
  //const isMember = loggedUser && loggedUser.user.role === 'member'
  //const isAdmin = loggedUser && loggedUser.user.role === 'admin'

  return (
    <div className="container">
      <div className="App">


        <div className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h2>Welcome to ArtClub</h2>
        </div>
        {/* <p className="Ap-intro">
         Apply club membership by registering to the service
         link
        </p> */}

        {/* {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged in</p>
        {noteForm()}
      </div>
    } */}

        <Router>
          <div>
            <div>
              <Link to="/">Home </Link>
              <Link to="/artworks">Gallery</Link> &nbsp;
              <Link to="/events">Events</Link>  &nbsp;
              <Link to="/artwork">MyPage</Link>  &nbsp;
              <Link to="/register">register</Link> &nbsp;
              {/* <Link to="login">Login</Link> &nbsp; */}
              {/* <Link style={padding} to="/members">users</Link>
              <Link to="/users">Users</Link> &nbsp;*/}

              {loggedUser && loggedUser.role === 'admin'
                ? <Link to='/users'>Users</Link>
                : <em></em>} &nbsp;

              {loggedUser ?
                <Button
                  className='loginbutton'
                  onClick={props.logout}
                  variant='outline-secondary'
                  type='button'>
                Logout
                </Button>
                :
                <Link to="login">Login</Link>} &nbsp;


              {/* jos kirjautunut näyttää logout linkin muutoin login linkin */}
              {loggedUser
                ? <em>{loggedUser} logged in <input onClick={props.logout} type="button" value="logout" /> &nbsp; {console.log('thispropslname',loggedUser)}</em>
                : <Link to="/login">loginnnn {console.log('uuuuuuuu', loggedUser)}</Link>}

              {/* <Link to="login">Login</Link>} &nbsp; */}


            </div>
            {/* <Route exact path="/" render={() => <Home />} /> */}
            <Route exact path="/artworks" render={() => <ArtworkList />} />
            <Route exact path="/artwork" render={() => <ArtworkForm /> } />
            <Route exact path="/login" render={() => <LoginForm /> } />
            <Route exact path="/register" render={() => <RegisterUserForm /> } />
            <Route exact path="/users" render={() => <UserList />} />

            {/* <Route path="/events" render={() => <Events />} />
          <Route path="/members" render={() => <Members />} />
          <Route path="/members" render={() => <Login />} /> */}

          </div>
        </Router>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  console.log('state:APP', state)
  return {
    loggedUser: state.loggedUser.loggedUser
  }
}


export default connect(
  mapStateToProps,
  { logout, initLoggedUser }
)(App)

