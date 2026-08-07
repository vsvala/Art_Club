import React, { useEffect, Suspense, lazy } from 'react'
import { useSelector, useDispatch } from 'react-redux'

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
const AddArtworkForm = lazy(() => import('./components/artworks/AddArtworkForm'))
const ArtworkList = lazy(() => import('./components/artworks/ArtworkList'))
const ArtworkDetail = lazy(() => import('./components/artworks/ArtworkDetail'))
const ArtistList = lazy(() => import('./components/artists/ArtistList'))
const ArtistDetail = lazy(() => import('./components/artists/ArtistDetail'))
const EventForm = lazy(() => import('./components/events/EventForm'))
const EventList = lazy(() => import('./components/events/EventList'))
const UpdatePassword = lazy(() => import('./components/users/UpdatePassword'))
const UpdateUserForm = lazy(() => import('./components/users/UpdateUserForm'))
const UserIntroForm = lazy(() => import('./components/users/UserIntroForm'))
const UserList = lazy(() => import('./components/users/UserList'))
const UserDetail = lazy(() => import('./components/users/UserDetail'))
const GDPRInfo = lazy(() => import('./components/common/GDPRInfo'))
const TermsOfUse = lazy(() => import('./components/common/TermsOfUse'))
const NotFound = lazy(() => import('./components/common/NotFound'))

const App = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.loggedUser.loggedUser)

  useEffect(() => {
    dispatch(initLoggedUser())
  }, [dispatch])

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
            logout={() => dispatch(logout())}
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
                  <Route path="/admin/users/:id" element={<UserDetail />} />
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
                      <UserDetail userId={loggedUser && loggedUser.id} />
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
                <Route path="/artworks/:id" element={<ArtworkDetail />} />
                <Route path="/register" element={<RegisterUserForm />} />
                <Route path="/artists" element={<ArtistList />} />
                <Route path="/artists/:id" element={<ArtistDetail />} />
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

export default App
