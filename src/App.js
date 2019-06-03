//import React, { Component } from 'react'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
// import logo from './logo.svg';
import './App.css'


// Components
import ArtworkForm from './components/ArtworkForm'
//import ArtworkList from './components/ArtworkList'

const App = (props) => {

  useEffect(() => {
  }, [])



  return (
    <div className="container">
      <div className="App">
        <div className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h2>Welcome to ArtClub</h2>
        </div>
        <p className="Ap-intro">
         Apply club membership by registering to the service
         link
        </p>
      </div>
      <ArtworkForm></ArtworkForm>
      {/* <ArtworkList></ArtworkList> */}
    </div>
  )
}


export default connect(
  null,
  { }
)(App)

