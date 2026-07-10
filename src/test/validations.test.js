import { emailValid } from '../utils/validations'

describe('emailValid', () => {
  test('accepts a valid email address', () => {
    expect(emailValid('testi@example.com')).toBe(true)
  })

  test('accepts a subdomain email', () => {
    expect(emailValid('a@b.fi')).toBe(true)
  })

  test('rejects address without @ sign', () => {
    expect(emailValid('testiosoite')).toBe(false)
  })

  test('rejects address without domain', () => {
    expect(emailValid('testi@')).toBe(false)
  })

  test('rejects empty string', () => {
    expect(emailValid('')).toBe(false)
  })

  test('rejects bare @ sign', () => {
    expect(emailValid('@')).toBe(false)
  })

  test('rejects address with whitespace', () => {
    expect(emailValid('tes ti@a.com')).toBe(false)
  })
})
