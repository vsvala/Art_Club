import React, { useEffect } from 'react'
import { connect } from 'react-redux'
//import { Navbar, Nav, Button } from 'react-bootstrap'
//import logo from './images/tripleblue.svg'
import picture from './images/pict.png'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
import AppNavigation from './components/common/AppNavigation'

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
