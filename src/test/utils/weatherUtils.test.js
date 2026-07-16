import { getWeatherIcon, getWeatherText } from '../../utils/weatherUtils'

describe('getWeatherIcon', () => {
  test('returns sun icon for clear sky (code 0)', () => {
    expect(getWeatherIcon(0)).toBe('☀️')
  })

  test('returns partly cloudy icon for codes 1-3', () => {
    expect(getWeatherIcon(1)).toBe('🌤️')
    expect(getWeatherIcon(2)).toBe('🌤️')
    expect(getWeatherIcon(3)).toBe('🌤️')
  })

  test('returns fog icon for code 45', () => {
    expect(getWeatherIcon(45)).toBe('🌫️')
  })

  test('returns rain icon for code 51', () => {
    expect(getWeatherIcon(51)).toBe('🌧️')
  })

  test('returns snow icon for code 71', () => {
    expect(getWeatherIcon(71)).toBe('❄️')
  })

  test('returns thunderstorm icon for code 95', () => {
    expect(getWeatherIcon(95)).toBe('⛈️')
  })

  test('returns question mark for unknown code', () => {
    expect(getWeatherIcon(999)).toBe('❓')
    expect(getWeatherIcon(4)).toBe('❓')
  })
})

describe('getWeatherText', () => {
  test('returns text for clear sky', () => {
    expect(getWeatherText(0)).toBe('Clear sky')
  })

  test('returns text for rain', () => {
    expect(getWeatherText(55)).toBe('Rain')
  })

  test('returns text for snow', () => {
    expect(getWeatherText(77)).toBe('Snow')
  })

  test('returns empty string for unknown code', () => {
    expect(getWeatherText(999)).toBe('')
  })
})