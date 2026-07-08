import React, { useEffect, Suspense, lazy } from 'react'
import { connect } from 'react-redux'
//import { Navbar, Nav, Button } from 'react-bootstrap'
//import logo from './images/tripleblue.svg'
import picture from './images/pict.png'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { logout, initLoggedUser } from './reducers/actionCreators/loginActions'

import Home from './components/Home'
import PrivateRoute from './components/common/PrivateRoute'
import Notification from './components/common/Notification'
import AppNavigation from './components/common/AppNavigation'
const NonMember = lazy(() => import('./components/NonMember'))
const LinksAndWeather = lazy(() => import('./components/LinksAndWeather'))
const RegisterUserForm = lazy(
  () => import('./components/login/RegisterUserForm'),
)
const LoginForm = lazy(() => import('./components/login/LoginForm'))
const AddArtworkForm = lazy(() => import('./components/artwork/AddArtworkForm'))
const ArtworkList = lazy(() => import('./components/artwork/ArtworkList'))
const SingleArtwork = lazy(() => import('./components/artwork/SingleArtwork'))
const ArtistList = lazy(() => import('./components/artist/ArtistList'))
const SingleArtist = lazy(() => import('./components/artist/SingleArtist'))
const EventForm = lazy(() => import('./components/event/EventForm'))
const EventList = lazy(() => import('./components/event/EventList'))
const UpdatePassword = lazy(() => import('./components/user/UpdatePassword'))
const UpdateUserForm = lazy(() => import('./components/user/UpdateUserForm'))
const UserIntroForm = lazy(() => import('./components/user/UserIntroForm'))
const UserList = lazy(() => import('./components/user/UserList'))
const SingleUser = lazy(() => import('./components/user/SingleUser'))
const GDPRInfo = lazy(() => import('./components/common/GDPRInfo'))
const TermsOfUse = lazy(() => import('./components/common/TermsOfUse'))
const NotFound = lazy(() => import('./components/common/NotFound'))

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
          <AppNavigation
            loggedUser={loggedUser}
            isMember={isMember}
            isAdmin={isAdmin}
            nonMember={nonMember}
            logout={props.logout}
          />

          <Notification />

          <div className="container">
            <Suspense fallback={<div>Loading...</div>}>
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
                    element={
                      <SingleUser userId={loggedUser && loggedUser.id} />
                    }
                  />
                  <Route
                    path="/users/addArtwork"
                    element={
                      <AddArtworkForm id={loggedUser && loggedUser.id} />
                    }
                  />
                  <Route path="/users/events" element={<EventList />} />
                  <Route
                    path="/users/password"
                    element={
                      <UpdatePassword id={loggedUser && loggedUser.id} />
                    }
                  />
                  <Route
                    path="/users/update"
                    element={
                      <UpdateUserForm id={loggedUser && loggedUser.id} />
                    }
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
            </Suspense>
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
