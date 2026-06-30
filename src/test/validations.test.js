import { emailValid } from '../utils/validations'

describe('emailValid', () => {
  test('hyväksyy kelvollisen sähköpostiosoitteen', () => {
    expect(emailValid('testi@example.com')).toBe(true)
  })

  test('hyväksyy alidomainin', () => {
    expect(emailValid('a@b.fi')).toBe(true)
  })

  test('hylkää osoitteen ilman @-merkkiä', () => {
    expect(emailValid('testiosoite')).toBe(false)
  })

  test('hylkää osoitteen ilman domainia', () => {
    expect(emailValid('testi@')).toBe(false)
  })

  test('hylkää tyhjän merkkijonon', () => {
    expect(emailValid('')).toBe(false)
  })

  test('hylkää pelkän @-merkin', () => {
    expect(emailValid('@')).toBe(false)
  })

  test('hylkää osoitteen jossa on välilyönti', () => {
    expect(emailValid('tes ti@a.com')).toBe(false)
  })
})
