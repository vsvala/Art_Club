import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Navbar, Nav, Button } from 'react-bootstrap'
import logo from './images/tripleblue.svg'
import picture from './images/pict.png'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { logout, initLoggedUser } from './reducers/actionCreators/loginActions'

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
import UserIntroForm from './components/user/UserIntroForm'
import UserList from './components/user/UserList'
import SingleUser from './components/user/SingleUser'
import SingleArtist from './components/artist/SingleArtist'
import PrivateRoute from './components/common/PrivateRoute'
import Notification from './components/common/Notification'
import GDPRInfo from './components/common/GDPRInfo'
import TermsOfUse from './components/common/TermsOfUse'
import NotFound from './components/common/NotFound'

const App = (props) => {
  useEffect(() => {
    props.initLoggedUser()
  }, [])

  const { loggedUser } = props
  const isMember = loggedUser && loggedUser.role === 'member'
  const isAdmin = loggedUser && loggedUser.role === 'admin'
  const nonMember = loggedUser && loggedUser.role === 'nonMember'

  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <React.Fragment>
          <div className="NavBar">
            <Navbar
              collapseOnSelect
              expand="lg"
              bg="light"
              variant="light"
              style={{ paddingLeft: '20px', paddingRight: '20px' }}
            >
              <Navbar.Brand>
                <img src={logo} className="nav-logo" alt="Art club LOGO" />
              </Navbar.Brand>
              <Navbar.Brand>Art club</Navbar.Brand>

              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#" as="span">
                    <Link to="/">Home </Link>&nbsp;
                  </Nav.Link>
                  <Nav.Link href="#" as="span">
                    <Link to="/artworks">Gallery</Link> &nbsp;
                  </Nav.Link>

                  <Nav.Link href="#" as="span">
                    <Link to="/artists">Artists</Link> &nbsp;
                  </Nav.Link>

                  <Nav.Link href="#" as="span">
                    <Link to="/links">Links</Link> &nbsp;
                  </Nav.Link>

                  <Nav.Link href="#" as="span">
                    {isMember || isAdmin ? (
                      <Link to="/users/addArtwork" className="member">
                        Add artwork
                      </Link>
                    ) : (
                      <em></em>
                    )}{' '}
                    &nbsp;
                  </Nav.Link>

                  <Nav.Link href="#" as="span">
                    {isMember || isAdmin ? (
                      <Link
                        to={`/users/${loggedUser.id}/myPage`}
                        className="member"
                      >
                        MyPage
                      </Link>
                    ) : (
                      <em></em>
                    )}{' '}
                    &nbsp;
                  </Nav.Link>

                  <Nav.Link href="#" as="span">
                    {isMember || isAdmin ? (
                      <Link to="/users/events" className="member">
                        Events
                      </Link>
                    ) : (
                      <em></em>
                    )}{' '}
                    &nbsp;
                  </Nav.Link>

                  <Nav.Link href="#" as="span">
                    {isMember || isAdmin ? (
                      <Link to="/users/password" className="member">
                        Change password
                      </Link>
                    ) : (
                      <em></em>
                    )}{' '}
                    &nbsp;
                  </Nav.Link>

                  <Nav.Link href="#" as="span">
                    {isAdmin ? (
                      <Link to="/admin/addEvent" className="admin">
                        Add event
                      </Link>
                    ) : (
                      <em></em>
                    )}{' '}
                    &nbsp;
                  </Nav.Link>

                  <Nav.Link href="#" as="span">
                    {isAdmin ? (
                      <Link to="/admin/users" className="admin">
                        Users
                      </Link>
                    ) : (
                      <em></em>
                    )}{' '}
                    &nbsp;
                  </Nav.Link>
                </Nav>

                <Nav.Link href="#" as="span">
                  {!loggedUser ? (
                    <Link to="/register">Register</Link>
                  ) : (
                    <em></em>
                  )}{' '}
                  &nbsp;
                </Nav.Link>

                <Nav.Link href="#" as="span">
                  {isMember || isAdmin || nonMember ? (
                    <Button
                      className="button"
                      onClick={props.logout}
                      variant="light"
                      type="button"
                    >
                      Logout
                    </Button>
                  ) : (
                    <Button className="button" variant="light" type="button">
                      <Link to="/login">Login</Link>
                    </Button>
                  )}
                </Nav.Link>
              </Navbar.Collapse>
            </Navbar>
          </div>

          <Notification />
          <div className="container">
            <Routes>
              <Route
                element={
                  <PrivateRoute
                    condition={loggedUser && isAdmin}
                    redirectPath="/login"
                  />
                }
              >
                <Route
                  path="/admin/addEvent"
                  element={<EventForm id={loggedUser && loggedUser.id} />}
                />
                <Route path="/admin/users" element={<UserList />} />
                <Route path="/admin/users/:id" element={<SingleUser />} />
              </Route>

              <Route
                element={
                  <PrivateRoute
                    condition={!isMember && !isAdmin}
                    redirectPath="/"
                  />
                }
              >
                <Route path="/login" element={<LoginForm />} />
              </Route>

              <Route
                element={
                  <PrivateRoute
                    condition={isMember || isAdmin}
                    redirectPath="/login"
                  />
                }
              >
                <Route
                  path="/users/:id/myPage"
                  element={<SingleUser userId={loggedUser && loggedUser.id} />}
                />
                <Route
                  path="/users/addArtwork"
                  element={<AddArtworkForm id={loggedUser && loggedUser.id} />}
                />
                <Route path="/users/events" element={<EventList />} />
                <Route
                  path="/users/password"
                  element={<UpdatePassword id={loggedUser && loggedUser.id} />}
                />
                <Route
                  path="/users/update"
                  element={<UpdateUserForm id={loggedUser && loggedUser.id} />}
                />
                <Route
                  path="/users/intro"
                  element={<UserIntroForm id={loggedUser && loggedUser.id} />}
                />
              </Route>

              <Route path="/" element={<Home />} />
              <Route path="/artworks" element={<ArtworkList />} />
              <Route path="/artworks/:id" element={<SingleArtwork />} />
              <Route path="/register" element={<RegisterUserForm />} />
              <Route path="/artists" element={<ArtistList />} />
              <Route path="/artists/:id" element={<SingleArtist />} />
              <Route path="/links" element={<LinksAndWeather />} />
              <Route path="/privacy" element={<GDPRInfo />} />
              <Route path="/terms" element={<TermsOfUse />} />
              <Route path="/nonMember" element={<NonMember />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </React.Fragment>
      </Router>

      <img
        src={picture}
        width="auto"
        height="400"
        className="picture"
        alt="background"
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser.loggedUser,
  }
}

export default connect(mapStateToProps, { logout, initLoggedUser })(App)
