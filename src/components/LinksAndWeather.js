import React, { useState, useEffect, useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import {} from '../reducers/actionCreators/notificationActions'
import { getWeatherIcon, getWeatherText } from '../utils/weatherUtils'

const LinksAndWeather = () => {
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const abortControllerRef = useRef(null)

  const [weatherData, setWeatherData] = useState(null)

  const fetchWeather = async (cityName) => {
    const trimmedCity = cityName.trim()
    if (!trimmedCity) return
    setLoading(true)
    setError('')
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    const controller = new AbortController()
    abortControllerRef.current = controller

    try {
      const res = await fetch(
        `/api/weather?city=${encodeURIComponent(trimmedCity)}`,
        { signal: controller.signal },
      )
      const json = await res.json()
      if (!res.ok) throw new Error(json.message || 'Weather request failed')
      setWeatherData(json)
    } catch (err) {
      if (err.name === 'AbortError') return
      setError('Failed to fetch weather data. Please try again.')
    } finally {
      if (abortControllerRef.current === controller) {
        setLoading(false)
        setCity('')
      }
    }
  }
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedCity = city.trim()
    if (!trimmedCity) {
      setError('Please enter a city name.')
      return
    }
    fetchWeather(trimmedCity)
  }

  const handleChange = (event) => {
    setCity(event.target.value)
  }

  useEffect(() => {
    fetchWeather('Helsinki')
  }, [])

  return (
    <>
      <section id="center">
        <div style={{ padding: 20 }}>
          <div className="links">
            <h2>Painting weather</h2>
            {loading && <p>Loading weather...</p>}
            {error && <p>{error}</p>}
            {weatherData &&
              !loading &&
              (() => {
                const weatherStyle = {
                  fontFamily: "'Leckerli One', cursive",
                  fontSize: '1.1rem',
                }
                return (
                  <div>
                    <p style={{ ...weatherStyle, color: '#bac0c4' }}>
                      {weatherData.city}, {weatherData.country}
                    </p>
                    <p style={{ ...weatherStyle, color: '#338ad3' }}>
                      {weatherData.temperature} °C{' '}
                      {getWeatherIcon(weatherData.weather_code)}{' '}
                      {getWeatherText(weatherData.weather_code)}
                    </p>
                  </div>
                )
              })()}
            <div className="search-city">
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Search city"
                    name="city"
                    value={city}
                    onChange={handleChange}
                    className="weather-search"
                    autoFocus
                  />
                  <br />
                  <Button className="button" variant="light" type="submit">
                    Search
                  </Button>
                </Form.Group>
              </Form>
            </div>
          </div>

          <div className="links">
            <h2>Links to galleries and museums in Helsinki</h2>

            <ul>
              <li>
                <a
                  target="_blank"
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
                  target="_blank"
                  rel="noopener noreferrer"
                  href={'https://www.amosrex.fi/'}
                >
                  Amos Rex
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={'https://www.kiasma.fi/'}
                >
                  Museum of Contemporary Art Kiasma
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={'https://www.ateneum.fi/'}
                >
                  Ateneum Art Museum
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={'https://www.hamhelsinki.fi/'}
                >
                  Helsinki Art Museum (HAM)
                </a>
              </li>
              <li>
                <a
                  target="_blank"
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

export default LinksAndWeather
