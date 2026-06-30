import React, { useState } from 'react'
//import { getWeather } from '../../reducers/actionCreators/linkActions'
//import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import userActions from '../reducers/actionCreators/userActions'
import { Form, Button, Row, Col } from 'react-bootstrap'

const LinksAndWeather = () => {
  //{ user } { getWeather }
  const [city, setCity] = useState('Helsinki')
  const [weatherData, setWeatherData] = useState(null)

  const fetchWeather = async (event) => {
    if (event) event.preventDefault()
    const res = await fetch(`/api/weather?city=${city}`)
    // `http://localhost:3001/api/weather?city=${city}`
    const json = await res.json()
    console.log('Weather data:', json)
    setWeatherData(json)
  }
  const handleChange = (event) => {
    setCity(event.target.value)
  }

  return (
    <>
      <section id="center">
        <div style={{ padding: 20 }}>
          <div className="links">
            <h2>Exhibitions and painting weather</h2>
            {/* <div className="search-city">
           <input value={city} onChange={e => setCity(e.target.value)} />
              <button onClick={fetchWeather}>Hae sää</button>
            </div> */}
            {weatherData && (
              <div>
                <p>
                  {weatherData.city}: {weatherData.temperature} °C
                </p>
              </div>
            )}
            <Row>
              <Col md={{ span: 10, offset: 1 }}></Col>
              <Form onSubmit={fetchWeather}>
                <Form.Group>
                  {/* <Form.Label>username</Form.Label> */}
                  <Form.Control
                    type="text"
                    placeholder="City"
                    name="city"
                    value={city}
                    onChange={handleChange}
                    autoFocus
                  />
                  <br />
                  <Button
                    className="button"
                    variant="light"
                    type="submit"
                  >
                    Search
                  </Button>
                </Form.Group>
              </Form>
            </Row>
          </div>

          <div className="links">
            <h2>Links to galleries and museums in Helsinki</h2>

            <ul>
              <li>
                <a
                  target="blank"
                  rel="noopener noreferrer"
                  href={
                    'https://www.myhelsinki.fi/?s&post_type%5B%5D=place&place_category%5B%5D=galleries'
                  }
                >
                  Galleries in Helsinki – My Helsinki
                </a>
              </li>
              <li>
                <a
                  target="blank"
                  rel="noopener noreferrer"
                  href={'https://www.amosrex.fi/'}
                >
                  Amos Rex
                </a>
              </li>
              <li>
                <a
                  target="blank"
                  rel="noopener noreferrer"
                  href={'https://www.kiasma.fi/'}
                >
                  Museum of Contemporary Art Kiasma
                </a>
              </li>
              <li>
                <a
                  target="blank"
                  rel="noopener noreferrer"
                  href={'https://www.ateneum.fi/'}
                >
                  Ateneum Art Museum
                </a>
              </li>
              <li>
                <a
                  target="blank"
                  rel="noopener noreferrer"
                  href={'https://www.hamhelsinki.fi/'}
                >
                  Helsinki Art Museum (HAM)
                </a>
              </li>
              <li>
                <a
                  target="blank"
                  rel="noopener noreferrer"
                  href={'https://www.sinebrychoffintaidemuseo.fi/'}
                >
                  Sinebrychoff Art Museum
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default connect(null, { ...userActions })(LinksAndWeather)
