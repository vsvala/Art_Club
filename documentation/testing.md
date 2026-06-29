# Testing — ArtClub

## 1. Yleiskatsaus

ArtClub-frontend käyttää kahta testaustasoa:

| Taso | Työkalu | Sijainti |
|---|---|---|
| Yksikkö- ja integrointitestit | Jest + React Testing Library | `src/test/` |
| E2E-testit (suunniteltu) | Cypress | — |

---

## 2. Testaustyökalut

### Jest

JavaScript-testausviitekehys, joka on sisäänrakennettu `create-react-app`-projekteihin. Hoitaa testien suorittamisen, assertiot ja mock-toiminnot.

### React Testing Library (@testing-library/react)

Kirjasto React-komponenttien testaamiseen käyttäjän näkökulmasta. Testaa komponentteja renderöimällä ne DOM:iin sen sijaan, että testaisi komponenttien sisäistä rakennetta.

### deep-freeze

Apukirjasto, jolla varmistetaan, että Redux-reduserit eivät muuta tilaansa suoraan (immutabiliteetti).

---

## 3. Testien ajaminen

```bash
# Aja kaikki testit kerran (CI-moodi)
npm test

# Aja testit kattavuusraportilla
npm run test-coverage
```

Testit käynnistyvät automaattisesti `react-scripts test` -komennolla. `CI=true`-ympäristömuuttuja estää watch-moodin, jolloin testit ajetaan kerran ja prosessi päättyy.

---

## 4. Olemassa olevat testit

### `src/test/App.test.js`

> **Huom:** Tämä testitiedosto on peräisin vanhemmasta Enzyme-pohjaisesta versiosta eikä ole yhteensopiva nykyisen React 18 -version kanssa. Se vaatii päivityksen React Testing Libraryn API:iin.

Alkuperäinen testi:
- Renderöi `<App />`-komponentin Redux Providerilla.
- Tarkistaa, että komponentti renderöityy ilman kaatumista.

### `src/test/setupTests.js`

Testausympäristön konfigurointi: tuo `@testing-library/jest-dom`-matcherit (esim. `toBeInTheDocument`).

---

## 5. Testausstrategia

### 5.1 Reduserien testaus (suositeltu lähestymistapa)

Redux-reduserit ovat puhtaita funktioita, joten niitä on helppo testata:

```js
import artworkReducer from '../reducers/artworkReducer'
import deepFreeze from 'deep-freeze'

describe('artworkReducer', () => {
  test('returns new state with added artwork', () => {
    const state = []
    const action = {
      type: 'ADD_ARTWORK',
      data: { id: 1, title: 'Sunset' }
    }
    deepFreeze(state)
    const newState = artworkReducer(state, action)
    expect(newState).toHaveLength(1)
    expect(newState[0].title).toBe('Sunset')
  })
})
```

### 5.2 Komponenttien testaus (React Testing Library)

Testaa komponentteja käyttäjän toimintojen kautta:

```js
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('login form shows error with wrong credentials', async () => {
  render(<LoginForm />)
  await userEvent.type(screen.getByLabelText(/email/i), 'wrong@test.com')
  await userEvent.type(screen.getByLabelText(/password/i), 'wrongpass')
  await userEvent.click(screen.getByRole('button', { name: /login/i }))
  expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument()
})
```

### 5.3 Palvelumoduulien testaus

`services/`-moduulit testataan mockaamalla Axios:

```js
import axios from 'axios'
jest.mock('axios')

test('fetches artworks from API', async () => {
  axios.get.mockResolvedValue({ data: [{ id: 1, title: 'Test' }] })
  const result = await artworkService.getAll()
  expect(result).toHaveLength(1)
})
```

---

## 6. Kattavuusraportti

```bash
npm run test-coverage
```

Raportti tulostetaan konsoliin ja tallentuu `coverage/`-kansioon. Kattavuusraportin voi tarkastella selaimessa avaamalla `coverage/lcov-report/index.html`.

---

## 7. Linting

ESLint tarkistaa koodin laadun:

```bash
npm run lint
```

ESLint-konfiguraatio on projektin juuressa (`.eslintrc` tai `package.json`-tiedostossa).

---

## 8. Tunnetut ongelmat

- `src/test/App.test.js` käyttää Enzyme-adapteria (`enzyme-adapter-react-16`), joka ei tue React 18:aa. Testi tulee kirjoittaa uudelleen React Testing Libraryn avulla.
- E2E-testaus Cypressillä on mainittu projektin suunnitelmassa muttei ole vielä toteutettu.
