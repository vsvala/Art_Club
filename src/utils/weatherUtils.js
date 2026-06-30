const WEATHER = [
  { range: [0, 0], icon: '☀️', text: 'Clear sky' },
  { range: [1, 3], icon: '🌤️', text: 'Partly cloudy' },
  { range: [45, 48], icon: '🌫️', text: 'Fog' },
  { range: [51, 65], icon: '🌧️', text: 'Rain' },
  { range: [66, 67], icon: '🌧️❄️', text: 'Freezing rain' },
  { range: [71, 77], icon: '❄️', text: 'Snow' },
  { range: [80, 82], icon: '🌦️', text: 'Showers' },
  { range: [95, 99], icon: '⛈️', text: 'Thunderstorm' },
]

function getWeather(code) {
  return WEATHER.find((c) => code >= c.range[0] && code <= c.range[1])
}

export function getWeatherIcon(code) {
  return getWeather(code)?.icon || '❓'
}

export function getWeatherText(code) {
  return getWeather(code)?.text || ''
}
