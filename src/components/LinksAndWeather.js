import React from 'react'
//import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import userActions from '../reducers/actionCreators/userActions'

const LinksAndWeather = () => { //{ user }
//TODO 2 colums and painting weather..more links

  return (

    <div className='linkslinks'>
      <h2>Exhibitions and painting weather</h2>
      <ul>
        <li>
          <a
            target='blank'
            rel="noopener noreferrer"
            href={'https://www.hel.fi/helsinki/fi/kulttuuri-ja-vapaa-aika/kulttuuri/nayttelyt-ja-museot/'} >
     Exhibitions and museums in Helsinki
          </a>
        </li>
      </ul>
    </div>
  )
}

export default connect(
  null,
  { ...userActions }
)(LinksAndWeather)
