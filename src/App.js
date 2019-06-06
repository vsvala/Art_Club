import React, { useEffect } from 'react'
import { connect } from 'react-redux'
// import logo from './logo.simport {
import { BrowserRouter as Router, Route, Link, } from 'react-router-dom'  //Redirect, withRouter
import './App.css'



// Components
import ArtworkForm from './components/ArtworkForm'
import ArtworkList from './components/ArtworkList'

const App = () => {  //props

  useEffect(() => {
  }, [])



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
        <Router>
          <div>
            <div>
              <Link to="/">Home </Link>
              <Link to="/artworks">Gallery</Link> &nbsp;
              <Link to="/events">Events</Link>  &nbsp;
              <Link to="/artwork">MyPage</Link>  &nbsp;
              <Link to="/members">Users</Link> &nbsp;
              <Link to="/members">Register</Link> &nbsp;
              <Link to="/members">Login</Link> &nbsp;
              {/* <Link style={padding} to="/members">users</Link> */}
            </div>
            {/* <Route exact path="/" render={() => <Home />} /> */}
            <Route path="/artworks" render={() => <ArtworkList />} />
            <Route path="/artwork" render={() => <ArtworkForm /> } />
            {/* <Route path="/events" render={() => <Events />} />
          <Route path="/members" render={() => <Members />} />
          <Route path="/members" render={() => <Login />} /> */}

          </div>
        </Router>
      </div>
    </div>
  )
}


export default connect(
  null,
  { }
)(App)

