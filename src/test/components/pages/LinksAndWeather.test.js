import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LinksAndWeather from '../../../components/pages/LinksAndWeather'

const mockWeatherResponse = (overrides = {}) => ({
  ok: true,
  json: async () => ({
    city: 'Helsinki',
    country: 'Finland',
    temperature: 12,
    weather_code: 0,
    ...overrides,
  }),
})

describe('LinksAndWeather', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('shows heading and gallery links', async () => {
    global.fetch.mockResolvedValue(mockWeatherResponse())
    render(<LinksAndWeather />)

    expect(screen.getByText('Painting weather')).toBeInTheDocument()
    expect(
      screen.getByText('Links to galleries and museums in Helsinki'),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /amos rex/i })).toBeInTheDocument()

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))
  })

  test('fetches Helsinki weather on mount and displays it', async () => {
    global.fetch.mockResolvedValue(
      mockWeatherResponse({ city: 'Helsinki', country: 'Finland', temperature: 12 }),
    )
    render(<LinksAndWeather />)

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('city=Helsinki'),
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    )

    await waitFor(() =>
      expect(screen.getByText(/Helsinki, Finland/)).toBeInTheDocument(),
    )
    expect(screen.getByText(/12 °C/)).toBeInTheDocument()
  })

  test('searching a new city fetches and displays its weather', async () => {
    global.fetch.mockResolvedValue(mockWeatherResponse())
    render(<LinksAndWeather />)
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))

    global.fetch.mockResolvedValueOnce(
      mockWeatherResponse({
        city: 'Paris',
        country: 'France',
        temperature: 20,
      }),
    )

    fireEvent.change(screen.getByPlaceholderText('Search city'), {
      target: { value: 'Paris' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Search' }))

    await waitFor(() =>
      expect(screen.getByText(/Paris, France/)).toBeInTheDocument(),
    )
    expect(screen.getByText(/20 °C/)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Search city')).toHaveValue('')
  })

  test('shows validation message when submitting an empty city', async () => {
    global.fetch.mockResolvedValue(mockWeatherResponse())
    render(<LinksAndWeather />)
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))

    fireEvent.click(screen.getByRole('button', { name: 'Search' }))

    expect(screen.getByText('Please enter a city name.')).toBeInTheDocument()
    expect(global.fetch).toHaveBeenCalledTimes(1)
  })

  test('shows error message when the response is not ok', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'City not found' }),
    })
    render(<LinksAndWeather />)

    await waitFor(() =>
      expect(
        screen.getByText('Failed to fetch weather data. Please try again.'),
      ).toBeInTheDocument(),
    )
  })

  test('shows error message when fetch rejects', async () => {
    global.fetch.mockRejectedValue(new Error('Network down'))
    render(<LinksAndWeather />)

    await waitFor(() =>
      expect(
        screen.getByText('Failed to fetch weather data. Please try again.'),
      ).toBeInTheDocument(),
    )
  })

  test('aborts the previous request when a new search is submitted before it resolves', async () => {
    let firstSignal

    global.fetch.mockImplementationOnce((url, options) => {
      firstSignal = options.signal
      return new Promise((resolve, reject) => {
        options.signal.addEventListener('abort', () => {
          const abortError = new Error('aborted')
          abortError.name = 'AbortError'
          reject(abortError)
        })
      })
    })

    render(<LinksAndWeather />)
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))

    global.fetch.mockResolvedValueOnce(
      mockWeatherResponse({
        city: 'Paris',
        country: 'France',
        temperature: 18,
      }),
    )

    fireEvent.change(screen.getByPlaceholderText('Search city'), {
      target: { value: 'Paris' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Search' }))

    expect(firstSignal.aborted).toBe(true)

    await waitFor(() =>
      expect(screen.getByText(/Paris, France/)).toBeInTheDocument(),
    )
    expect(
      screen.queryByText('Failed to fetch weather data. Please try again.'),
    ).not.toBeInTheDocument()
  })

  test('aborts the pending request when the component unmounts', async () => {
    let capturedSignal

    global.fetch.mockImplementationOnce((url, options) => {
      capturedSignal = options.signal
      return new Promise(() => {})
    })

    const { unmount } = render(<LinksAndWeather />)
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))

    unmount()

    expect(capturedSignal.aborted).toBe(true)
  })
})
