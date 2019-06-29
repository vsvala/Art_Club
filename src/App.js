import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Navbar, Nav, Button } from 'react-bootstrap'
// import logo from './logo.simport {
import logo from './images/tripleblue.png'
import picture from './images/pict.png'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'  //Redirect, withRouter
import './App.css'

// Actions
import { logout, initLoggedUser } from './reducers/actionCreators/loginActions'

// Components
import ArtworkForm from './components/artwork/ArtworkForm'
import ArtworkList from './components/artwork/ArtworkList'
//import SingleArtwork from './components/admin/SingleArtwork'

import Home from './components/Home'
import RegisterUserForm from './components/login/RegisterUserForm'
import LoginForm from './components/login/LoginForm'
import UserList from './components/user/UserList'
import PrivateRoute from './components/common/PrivateRoute'
//import SingleUser from './components/admin/SingleUser'


const App = (props) => {

  useEffect(() => {
    props.initLoggedUser()
  }, [])

  const { loggedUser } = props
  const isMember = loggedUser && loggedUser.role === 'member'
  const isAdmin = loggedUser && loggedUser.role === 'admin'

  return (
    // <div className="container">
    <div className="App">


      {/*  <div className="App-header">
         <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to ArtClub</h2>
      </div>*/}
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
        <React.Fragment>

          <div className='NavBar'>
            <Navbar collapseOnSelect expand='lg' bg='light' variant='light'>
              <Navbar.Brand>
                <img
                  src={logo}
                  width='70'
                  height='40'
                  /*  className='d-inline-block align-top' */
                  alt='Art club LOGO'
                />
              </Navbar.Brand>
              <Navbar.Brand>
        Art club
              </Navbar.Brand>

              <Navbar.Toggle aria-controls='responsive-navbar-nav' />
              <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='mr-auto'>

                  <Nav.Link href='#' as='span'>
                    <Link to="/">Home </Link>&nbsp;
                  </Nav.Link>
                  <Nav.Link href='#' as='span'>
                    <Link to="/artworks">Gallery</Link> &nbsp;
                  </Nav.Link>

                  <Nav.Link href='#' as='span'>
                    <Link to='/artists'>Artists</Link> &nbsp;
                  </Nav.Link>

                  <Nav.Link href='#' as='span'>
                    <Link to="/events">Exhibitions</Link>  &nbsp;
                    {/* <Link to="/register">Register</Link> &nbsp; */}
                  </Nav.Link>



                  <Nav.Link href='#' as='spana'>
                    {isMember | isAdmin
                      ? <Link to="/member/addArtwork" className='member'>Add artwork</Link>
                      : <em></em>} &nbsp;
                  </Nav.Link>

                  <Nav.Link href='#' as='span'>
                    { isMember | isAdmin
                      ? <Link to="/events"  className='member'>Events</Link>
                      : <em></em>} &nbsp;
                  </Nav.Link>

                  <Nav.Link href='#' as='span'>
                    {isMember | isAdmin
                      ? <Link to="/member/myPage"  className='member'>MyPage</Link>
                      : <em></em>} &nbsp;
                  </Nav.Link>


                  <Nav.Link href='#' as='span'>
                    { isAdmin
                      ? <Link to='/admin/users'  className='admin'>Users</Link>
                      : <em></em>} &nbsp;
                  </Nav.Link>

                  <Nav.Link href='#' as='span'>
                    {  isAdmin
                      ? <Link to="/addEevent"  className='admin'>Add event</Link>
                      : <em></em>} &nbsp;
                  </Nav.Link>

                </Nav>

                <Nav.Link href='#' as='span'>
                  { isAdmin
                    ? <Link to='/admin' className='admin'>Change password</Link>
                    : <em></em>} &nbsp;
                </Nav.Link>



                {loggedUser
                  ? <Button
                    className='loginbutton'
                    onClick={props.logout}
                    variant='outline-secondary'
                    type='button'>
                    <Link to="logout">Logout</Link>
                  </Button>
                  : <Button
                    className='loginbutton'
                    variant='outline-secondary'
                    type='button' >
                    <Link to="login">Login</Link>
                  </Button>} &nbsp;

              </Navbar.Collapse>
            </Navbar>
          </div>

          {/* <Notification />        */}
          <div className="container">

            {/* Works like a typical switch statement; it checks for matches and
            runs the first thing matching the requested path*/}
            <Switch>

              {/* THIS ROUTE PROTECTS ALL ROUTES UNDER "/admin" */}
              <PrivateRoute
                path="/admin"
                redirectPath="/login"
                condition={loggedUser && isAdmin}
              >
                <Route exact path="/admin/users" render={() => <UserList />} />
                {/*     <Route exact path="/admin/addEvent" render={() => <EventForm />} />
                <Route exact path="/admin/userDelete" render={() => <UserDelete />} />
                <Route exact path="/admin/users/:id" render={({ match }) => <SingleUser userId={match.params.id} />} />
                <Route exact path="/admin" render={() => <UpdatePasswordForm />} />  */}

              </PrivateRoute>

              <PrivateRoute
                exact path="/login"
                redirectPath="/"
                condition={loggedUser === null}
                render={() => <LoginForm />}
              />


              {/* TODOOOOOOOOOOOOOOOOOOOO   THIS ROUTE PROTECTS MEMBERS ROUTES UNDER "/member" */}
              <PrivateRoute path="/member" redirectPath="/login" condition={loggedUser}>
                <Route exact path="/member/addArtwork" render={() => <ArtworkForm /> } />

              </PrivateRoute>




              <Route exact path="/" render={() => <Home />} />
              <Route exact path="/artworks" render={() => <ArtworkList />} />
              <Route exact path="/artwork" render={() => <ArtworkForm /> } />
              {/* <Route exact path="/artworks/:id"
              render={({ match }) => <SingleArtwork artworkId={match.params.id} />} /> */}
              <Route exact path="/login" render={() => <LoginForm /> } />
              <Route exact path="/register" render={() => <RegisterUserForm /> } />

              {/* <Route path="/members" render={() => <Members />} />
     */}



            </Switch>

          </div>
        </React.Fragment>
      </Router>


      <img src={picture}
        width='200'
        height='400'
        className='picture'
        alt='Art club LOGO'
      />

    </div>
    // </div>
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

