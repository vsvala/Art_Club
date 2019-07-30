import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Navbar, Nav, Button } from 'react-bootstrap'
import logo from './images/tripleblue.png'
import picture from './images/pict.png'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'  //Redirect, withRouter

// Actions
import { logout, initLoggedUser } from './reducers/actionCreators/loginActions'

// Components
import Home from './components/Home'
import NonMember from './components/NonMember'
import LinksAndWeather from './components/LinksAndWeather'
import RegisterUserForm from './components/login/RegisterUserForm'
import LoginForm from './components/login/LoginForm'
import AddArtworkForm from './components/artwork/AddArtworkForm'
import ArtworkList from './components/artwork/ArtworkList'
import SingleArtwork from './components/artwork/SingleArtwork'
import ArtistList from './components/artist/ArtistList'
import EventForm from './components/event/EventForm'
import EventList from './components/event/EventList'
import UpdatePassword from './components/user/UpdatePassword'
import UpdateUserForm from './components/user/UpdateUserForm'
import UserIntroForm from  './components/user/UserIntroForm'
import UserList from './components/user/UserList'
import SingleUser from './components/user/SingleUser'
import SingleArtist from './components/artist/SingleArtist'
import PrivateRoute from './components/common/PrivateRoute'
import Notification from './components/common/Notification'
import GDPRInfo from './components/common/GDPRInfo'
import TermsOfUse from './components/common/TermsOfUse'

const App = (props) => {

  useEffect(() => {
    props.initLoggedUser()
  }, [])

  const { loggedUser } = props
  const isMember = loggedUser && loggedUser.role === 'member'
  const isAdmin = loggedUser && loggedUser.role === 'admin'

  return (

    <div className="App">

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
                    <Link to="/home">Home </Link>&nbsp;
                  </Nav.Link>
                  <Nav.Link href='#' as='span'>
                    <Link to="/artworks">Gallery</Link> &nbsp;
                  </Nav.Link>

                  <Nav.Link href='#' as='span'>
                    <Link to='/artists'>Artists</Link> &nbsp;
                  </Nav.Link>

                  <Nav.Link href='#' as='span'>
                    <Link to="/links">Links</Link>  &nbsp;
                  </Nav.Link>



                  {/* MEMBER LINKS */}

                  <Nav.Link href='#' as='span'>
                    {isMember | isAdmin
                      ? <Link to="/users/addArtwork" className='member'>Add artwork</Link>
                      : <em></em>} &nbsp;
                  </Nav.Link>

                  <Nav.Link href='#' as='span'>
                    {isMember | isAdmin
                      ? <Link to="/users/:id/myPage"  className='member'>MyPage</Link>
                      : <em></em>} &nbsp;
                  </Nav.Link>

                  <Nav.Link href='#' as='span'>
                    { isMember | isAdmin
                      ? <Link to="/users/events"  className='member'>Events</Link>
                      : <em></em>} &nbsp;
                  </Nav.Link>

                  <Nav.Link href='#' as='span'>
                    { isMember | isAdmin
                      ? <Link to='/users/password' className='member'>Change password</Link>
                      : <em></em>} &nbsp;
                  </Nav.Link>

                  {/* ADMIN LINKS */}

                  <Nav.Link href='#' as='span'>
                    {  isAdmin
                      ? <Link to="/admin/addEvent"  className='admin'>Add event</Link>
                      : <em></em>} &nbsp;
                  </Nav.Link>

                  <Nav.Link href='#' as='span'>
                    { isAdmin
                      ? <Link to='/admin/users'  className='admin'>Users</Link>
                      : <em></em>} &nbsp;
                  </Nav.Link>
                </Nav>


                <Nav.Link href='#' as='span'>
                  {!loggedUser
                    ? <Link to='/register'>Register</Link>
                    : <em></em>} &nbsp;
                </Nav.Link>

                <Nav.Link href='#' as='span'>
                  {loggedUser
                    ? <Button
                      className='button'
                      onClick={props.logout}
                      variant='light'
                      type='button'>
                      Logout
                    </Button>
                    : <Button
                      className='button'
                      variant='light'
                      type='button' >
                      <Link to="/login">Login</Link>
                    </Button>}
                </Nav.Link>
              </Navbar.Collapse>
            </Navbar>
          </div>

          <Notification />
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
                <Route exact path="/admin/addEvent" render={({ history }) => <EventForm  history={history} id={loggedUser.id} />} />
                <Route exact path="/admin/users" render={() => <UserList />} />
                <Route exact path="/admin/users/:id"render={({ match }) => <SingleUser userId={match.params.id} />} />
              </PrivateRoute>

              <PrivateRoute
                exact path="/login"
                redirectPath="/"
                condition={loggedUser === null}
                render={() => <LoginForm />}
              >
              </PrivateRoute>

              {/*  THIS ROUTE PROTECTS MEMBERS ROUTES UNDER "/users" */}
              <PrivateRoute
                path="/users"
                redirectPath="/login"
                condition={loggedUser}
              >

                <Route exact path="/users/:id/myPage" render={() => <SingleUser userId={loggedUser.id} />} />
                <Route exact path="/users/addArtwork" render={({ history }) => <AddArtworkForm  id={loggedUser.id} history={history} /> } />
                <Route exact path="/users/events" render={() => <EventList /> } />
                <Route exact path="/users/password" render={() => <UpdatePassword id={loggedUser.id} /> } />
                <Route exact path="/users/update" render={({ history }) => <UpdateUserForm id={loggedUser.id} history={history} /> } />
                <Route exact path="/users/intro" render={() => <UserIntroForm id={loggedUser.id} />}/>
              </PrivateRoute>


              <PrivateRoute path="/" redirectPath="/login" condition={loggedUser===null}>
                <PrivateRoute path="/" redirectPath="/admin/users" condition={!isAdmin}>
                  <Route exact path='/'render={() => <Redirect to='/home' />}/>

                  <Route exact path="/home" render={() => <Home />}/>
                  <Route exact path="/artworks" render={() => <ArtworkList/>} />
                  <Route exact path="/artworks/:id" render={({ match }) => <SingleArtwork artworkId={match.params.id} />} />
                  {/*<Route exact path="/users/:id" render={({ match }) => <SingleUser userId={match.params.id} />} /> */}
                  <Route exact path="/addArtwork" render={() => <AddArtworkForm id={loggedUser.id} /> }  />
                  <Route exact path="/login" render={() => <LoginForm /> } />
                  <Route exact path="/register" render={({ history }) => <RegisterUserForm history={history} /> } />
                  <Route exact path="/artists" render={() => <ArtistList />} />
                  <Route exact path="/artists/:id" render={({ match }) => <SingleArtist userId={match.params.id} />} />
                  <Route exact path="/links" render={() => <LinksAndWeather />} />
                  <Route exact path="/privacy" render={() => <GDPRInfo />} />
                  <Route exact path="/terms" render={() => <TermsOfUse />} />
                  <Route exact path="/nonMember" render={() => < NonMember/>} />
                </PrivateRoute>
              </PrivateRoute>

            </Switch>
          </div>
        </React.Fragment>
      </Router>


      <img src={picture}
        width='200'
        height='400'
        className='picture'
        alt='background'
      />

    </div>
  )
}
const mapStateToProps = (state) => {
  console.log('state from APP', state)
  return {
    loggedUser: state.loggedUser.loggedUser
  }
}


export default connect(
  mapStateToProps,
  { logout, initLoggedUser }
)(App)

