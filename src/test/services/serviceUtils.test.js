import { handleError } from '../../services/serviceUtils'

describe('handleError', () => {
  test('returns server connection error when response is missing', () => {
    const result = handleError({}, 'fallback message')
    expect(result).toEqual({ error: 'Unable to connect to server.' })
  })

  test('returns server connection error on status 500', () => {
    const result = handleError(
      { response: { status: 500 } },
      'fallback message',
    )
    expect(result).toEqual({ error: 'Unable to connect to server.' })
  })

  test('returns fallback message for 4xx errors', () => {
    const result = handleError(
      { response: { status: 401 } },
      'Invalid credentials',
    )
    expect(result).toEqual({ error: 'Invalid credentials' })
  })

  test('returns fallback message for 404', () => {
    const result = handleError({ response: { status: 404 } }, 'Not found')
    expect(result).toEqual({ error: 'Not found' })
  })
})