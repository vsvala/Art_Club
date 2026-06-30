# Tests — ArtClub

## Overview

The ArtClub frontend uses three levels of automated testing:

| Level | Tool | Location |
|---|---|---|
| Unit tests | Jest + React Testing Library | `src/test/` |
| Integration tests | Jest + MSW (Mock Service Worker) | `src/test/integration/` |
| E2E tests | Playwright | `e2e/` |

---

## Tools

| Tool | Purpose |
|---|---|
| **Jest** | Test runner, assertions, and mocking. Bundled with `react-scripts` — no separate install needed. |
| **@testing-library/react** | Renders React components into a real DOM and queries them the way a user would, without testing internal implementation details. |
| **@testing-library/jest-dom** | Adds DOM-specific matchers such as `toBeInTheDocument`, `toHaveValue`, and `toBeVisible`. |
| **deep-freeze** | Freezes Redux state objects before passing them to reducers, causing an error if a reducer mutates state directly instead of returning a new object. |
| **MSW (Mock Service Worker)** | Intercepts `fetch`/`axios` requests at the network level and returns mock responses. Used in integration tests so no real backend is needed. |
| **Playwright** | Launches a real browser (Chromium) and drives it programmatically for end-to-end tests. |

---

## Running Tests

```bash
# Run all unit and integration tests
npm test

# Run with coverage report (output to coverage/)
npm run test-coverage

# Run a single test file
npm test -- validations.test.js

# Run Playwright E2E tests
npx playwright test

# Run E2E tests with browser visible (useful for debugging)
npx playwright test --headed

# View E2E HTML report
npx playwright show-report
```

The Jest coverage report is written to `coverage/`. Open `coverage/lcov-report/index.html` in a browser for a full interactive view.

---

## Unit Tests

### Validation utils — `src/test/validations.test.js`

Tests the `emailValid(email)` pure function from `src/utils/validations.js`.

| Test case | Input | Expected |
|---|---|---|
| Valid address | `test@example.com` | `true` |
| Valid with subdomain | `a@b.fi` | `true` |
| Missing @ | `testaddress` | `false` |
| Missing domain | `test@` | `false` |
| Empty string | `''` | `false` |
| Only @ | `@` | `false` |
| Space in address | `te st@a.com` | `false` |

### Reducers — `src/test/reducers/`

Redux reducers are pure functions — no mocks needed. Each is tested with `deep-freeze` to catch direct state mutations. Covered reducers: `artworkReducer`, `userReducer`, `loginReducer`, `eventReducer`, `filterReducer`, `notificationReducer`, `singleArtworkReducer`.

```js
import artworkReducer from '../../reducers/artworkReducer'
import deepFreeze from 'deep-freeze'

test('adds a new artwork', () => {
  const state = { artworks: [] }
  const action = { type: 'CREATE_ARTWORK', data: { id: '1', name: 'Sunset' } }
  deepFreeze(state)
  const newState = artworkReducer(state, action)
  expect(newState.artworks).toHaveLength(1)
})
```

### Component tests — `src/test/components/`

Uses `@testing-library/react`. Redux store is created with the real store or a mock store; React Router is wrapped with `MemoryRouter`.

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

**Notification**
- Returns `null` when notification string is empty
- Shows message when notification is set
- Uses correct CSS class / Bootstrap style

**PrivateRoute**
- If `condition === false` → navigates to `redirectPath`
- If `condition === true` → renders `<Outlet />` (child component is visible)

**Home**
- Unauthenticated user → shows Login and Register links
- `nonMember` user → shows "awaiting approval" message
- Member / admin → shows welcome message

**LoginForm**
- Renders without crashing
- Email and password fields are present
- Submit button is present
- If `loggedUser` is already set in store → redirects (location changes)

**RegisterUserForm**
- All required fields are present (name, username, email, password, confirm password)
- Invalid email → shows validation error / does not submit
- Passwords do not match → shows error
- Valid form → `createUser` action creator is called with correct parameters (mock dispatch)

**ArtworkList**
- Renders list of artworks when Redux store contains data
- Filter field filters artworks by name
- Admin sees delete buttons, regular member does not

**ArtworkDelete**
- Shows artwork image
- Delete button calls the correct callback after click

---

## Integration Tests

Located in `src/test/integration/`. These tests exercise thunk action creators together with reducers against a mocked API using [MSW (Mock Service Worker)](https://mswjs.io/).

### MSW server setup — `src/test/integration/server.js`

A shared MSW node server used by all integration tests:

```js
import { setupServer } from 'msw/node'
import { rest } from 'msw'

const mockUser = {
  token: 'test-token-abc',
  username: 'testi',
  role: 'member',
  id: '1',
}

const mockArtworks = [
  { id: '1', name: 'Maisema', likes: 3 },
  { id: '2', name: 'Muotokuva', likes: 7 },
]

export const handlers = [
  rest.post('*/api/login', (req, res, ctx) => res(ctx.json(mockUser))),
  rest.get('*/api/artworks', (req, res, ctx) => res(ctx.json(mockArtworks))),
]

export const server = setupServer(...handlers)
export { mockUser, mockArtworks }
```

Import `server` into each integration test file and call `server.listen()` / `server.close()` in `beforeAll` / `afterAll`.

For cases where MSW is not used, `axios` can also be mocked directly with Jest:

```js
import axios from 'axios'
jest.mock('axios')

test('fetches artworks from API', async () => {
  axios.get.mockResolvedValue({ data: [{ id: '1', name: 'Sunset' }] })
  const result = await artworkService.getAll()
  expect(result).toHaveLength(1)
})
```

### Login flow

1. Mock `POST /api/login` to return `{ token, username, role, id }`
2. Dispatch `login({ username, password })`
3. Assert:
   - `store.getState().loggedUser.username === 'testi'`
   - `localStorage.getItem('loggedArtclubUser')` is set

### Like (vote) flow

1. Mock `PUT /api/artworks/:id` to return an updated artwork
2. Dispatch `voteArtwork(artworkId)`
3. Assert that the artwork's `likes` increased in the store

### Logout flow

1. Set store: `loggedUser` has data
2. Dispatch `logout()`
3. Assert:
   - `store.getState().loggedUser` equals `{}`
   - `localStorage.getItem('loggedArtclubUser') === null`

### Load artworks

1. Mock `GET /api/artworks` to return a list of artworks
2. Dispatch `initializeArtworks()`
3. Assert `store.getState().artworks.length > 0`

---

## E2E Tests (Playwright)

E2E tests run a real browser against the live development server. They catch bugs that unit and integration tests miss: routing, auth guards, form submission through the full stack, and navbar state changes.

### Setup

```bash
npm install --save-dev @playwright/test
npx playwright install chromium
```

Create `playwright.config.js` in the project root:

```js
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
  },
  webServer: {
    command: 'npm start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

### Public pages smoke test — `e2e/public-pages.spec.js`

Verifies that all public routes load without crashing. The fastest test to write and the first one to break if there is a build or routing error.

| Route | What to check |
|---|---|
| `/` | "Art club" text visible |
| `/artworks` | Page loads without error |
| `/artists` | Page loads without error |
| `/links` | Page loads without error |
| `/register` | Registration form visible |
| `/login` | Login form visible |

```js
const publicRoutes = ['/', '/artworks', '/artists', '/links', '/register', '/login']

for (const route of publicRoutes) {
  test(`${route} loads without crashing`, async ({ page }) => {
    await page.goto(route)
    await expect(page).not.toHaveTitle(/Error/)
  })
}
```

### Auth guards — `e2e/auth-guards.spec.js`

Verifies that `PrivateRoute` works correctly in a real browser. Critical for security — if a guard breaks, protected pages become publicly accessible.

Protected routes that must redirect an unauthenticated user to `/login`:

- `/users/addArtwork`
- `/users/events`
- `/users/password`
- `/users/update`

```js
test('protected route redirects unauthenticated user to login', async ({ page }) => {
  await page.goto('/users/addArtwork')
  await expect(page).toHaveURL(/\/login/)
})
```

Also test the admin guard: navigating to `/admin/users` as a non-admin should redirect away.

### Login flow — `e2e/login.spec.js`

The most important user journey. Requires the dev backend or `json-server` to be running.

**Successful login**
1. Navigate to `/login`
2. Fill in email and password with valid test credentials
3. Click Login
4. Assert:
   - URL changes (no longer `/login`)
   - Navbar shows "Logout" button
   - Member-only links (MyPage, Add artwork, Events) appear in the navbar

```js
test('login succeeds and shows member navigation', async ({ page }) => {
  await page.goto('/login')
  await page.fill('input[type="email"]', 'test@example.com')
  await page.fill('input[type="password"]', 'password123')
  await page.click('button[type="submit"]')
  await expect(page.locator('text=Logout')).toBeVisible()
  await expect(page.locator('text=MyPage')).toBeVisible()
})
```

**Failed login**
1. Fill in wrong password
2. Assert that an error message is shown (Notification component)
3. URL remains `/login`

### Logout flow — `e2e/login.spec.js`

1. Log in (as in the login test above)
2. Click "Logout" button
3. Assert:
   - Member-only links (MyPage, Add artwork) disappear from navbar
   - "Login" button reappears
   - Navigating to `/users/addArtwork` redirects back to `/login`

### Gallery filter — `e2e/gallery.spec.js`

Tests that artwork filtering works end-to-end in the browser (exercises Redux filter state through the real UI).

1. Navigate to `/artworks`
2. Assert that artwork cards are visible (if data is available)
3. Type part of an artwork name into the search field
4. Assert that the list shows fewer items or only matching ones
5. Clear the field → all artworks return

```js
test('filter narrows the artwork list', async ({ page }) => {
  await page.goto('/artworks')
  const allCards = page.locator('.artwork-card')
  const initialCount = await allCards.count()
  await page.fill('input[placeholder*="Search"]', 'unique name')
  const filteredCount = await allCards.count()
  expect(filteredCount).toBeLessThanOrEqual(initialCount)
})
```

### Registration validation — `e2e/register.spec.js`

Unit tests cover `emailValid()` in isolation. This E2E test confirms that validation is actually wired up to the form.

| Case | Input | Expected |
|---|---|---|
| Invalid email | `notanemail` | Error message shown, form not submitted |
| Passwords do not match | `pass1` / `pass2` | Error message shown |
| Valid form | All fields correct | Navigated away or success message shown |

### Add artwork — `e2e/add-artwork.spec.js`

Tests the full flow: login → form → successful submission. Catches integration bugs across the entire stack.

1. Log in as a member
2. Navigate to `/users/addArtwork`
3. Fill in the form (name, description, image file)
4. Submit the form
5. Assert that the new artwork appears in the gallery (`/artworks`)

---

## Linting

ESLint checks code style and catches common mistakes:

```bash
npm run lint
```

The ESLint configuration is defined in `package.json` under the `"eslintConfig"` key.

---

## Coverage Targets

| Area | Target |
|---|---|
| Utils (validations) | 100 % |
| Reducers | 90 %+ |
| Critical components | 70 %+ |
| Integration (key flows) | login, logout, vote, init |
| E2E | all routes, auth guards, login/logout |

