# Tests — ArtClub

## Overview

The ArtClub frontend uses three levels of automated testing:

| Level             | Tool                             | Location                |
| ----------------- | -------------------------------- | ----------------------- |
| Unit tests        | Jest + React Testing Library     | `src/test/`             |
| Integration tests | Jest + MSW (Mock Service Worker) | `src/test/integration/` |
| E2E tests         | Playwright (Chromium)            | `tests/`                |

---

## Tools

| Tool                          | Purpose                                                                                                                                              |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Jest**                      | Test runner, assertions, and mocking. Bundled with `react-scripts` — no separate install needed.                                                     |
| **@testing-library/react**    | Renders React components into a real DOM and queries them the way a user would, without testing internal implementation details.                      |
| **@testing-library/jest-dom** | Adds DOM-specific matchers such as `toBeInTheDocument`, `toHaveValue`, and `toBeVisible`.                                                            |
| **deep-freeze**               | Freezes Redux state objects before passing them to reducers, causing an error if a reducer mutates state directly instead of returning a new object.  |
| **MSW (Mock Service Worker)** | Intercepts `fetch`/`axios` requests at the network level and returns mock responses. Used in integration tests so no real backend is needed.          |
| **Playwright**                | Launches a real Chromium browser and drives it programmatically for end-to-end tests.                                                                |

---

## Running Tests

```bash
# Run all unit and integration tests
npm test

# Run with coverage report (output to coverage/)
npm run test-coverage

# Run Playwright E2E tests
npm run test-e2e

# Run E2E tests with browser visible
npx playwright test --headed

# View E2E HTML report
npm run test-e2e:report
```

E2E tests require both the backend (in test mode) and the frontend to be running:

```bash
# Terminal 1 — backend in test mode (in Art_Club_back/)
npm run start:test

# Terminal 2 — frontend
npm run dev

# Terminal 3 — run E2E tests
npm run test-e2e
```

---

## Unit Tests

### Validation utils — `src/test/validations.test.js`

Tests the `emailValid(email)` pure function from `src/utils/validations.js`.

| Test case            | Input              | Expected |
| -------------------- | ------------------ | -------- |
| Valid address        | `test@example.com` | `true`   |
| Valid with subdomain | `a@b.fi`           | `true`   |
| Missing @            | `testaddress`      | `false`  |
| Missing domain       | `test@`            | `false`  |
| Empty string         | `''`               | `false`  |
| Only @               | `@`                | `false`  |
| Space in address     | `te st@a.com`      | `false`  |

### Reducers — `src/test/reducers/`

Redux reducers are pure functions — no mocks needed. Each is tested with `deep-freeze` to catch direct state mutations.

Covered reducers: `artworkReducer`, `userReducer`, `loginReducer`, `eventReducer`, `filterReducer`, `notificationReducer`, `singleArtworkReducer`.

### Component tests — `src/test/components/`

Uses `@testing-library/react` with Redux store and `MemoryRouter`.

**Notification**
- Returns `null` when notification string is empty
- Shows message when notification is set

**PrivateRoute**
- `condition === false` → redirects to `redirectPath`
- `condition === true` → renders child component

**Home**
- Unauthenticated user → shows Login and Register links
- `nonMember` user → shows "awaiting approval" message
- Member / admin → shows welcome message

**LoginForm**
- Renders without crashing
- Username and password fields are present
- Submit button is present
- If `loggedUser` is already set in store → redirects

**RegisterUserForm**
- All required fields are present (name, username, email, password, confirm password)
- Invalid email → shows validation error
- Passwords do not match → shows error

---

## Integration Tests

Located in `src/test/integration/`. These tests exercise thunk action creators together with reducers against a mocked API using [MSW (Mock Service Worker)](https://mswjs.io/).

**Login flow** — mocks `POST /api/login`, dispatches `login()`, asserts store state and `localStorage` are updated.

**Like (vote) flow** — mocks `PUT /api/artworks/:id`, dispatches `voteArtwork()`, asserts `likes` increased in store.

**Logout flow** — dispatches `logout()`, asserts store is cleared and `localStorage` entry is removed.

**Load artworks** — mocks `GET /api/artworks`, dispatches `initializeArtworks()`, asserts artworks appear in store.

---

## E2E Tests (Playwright)

E2E tests run a real Chromium browser against the live development server. They catch bugs that unit and integration tests miss: full request/response cycle, navbar state changes, and form submission end-to-end.

### Configuration

- Config: `playwright.config.js`
- Test directory: `tests/`
- Browser: Chromium
- Retries: 2 on CI, 0 locally
- Reporter: HTML

### Database control

Before each test, the test suite resets the database and seeds two test users via the backend testing API (`/api/testing/`). This ensures every test starts from the same known state.

The testing API is only active when the backend is started with `NODE_ENV=test` (`npm run start:test`). It exposes two endpoints:

| Endpoint                  | Action                                             |
| ------------------------- | -------------------------------------------------- |
| `POST /api/testing/reset` | Deletes all users and artworks from the database   |
| `POST /api/testing/users` | Creates a user with any role (member, admin, etc.) |

Seeded test users:

| Username     | Password    | Role   |
| ------------ | ----------- | ------ |
| `testmember` | `member123` | member |
| `testadmin`  | `admin123`  | admin  |

Cloudinary is bypassed in test mode — artwork uploads save a placeholder URL instead of calling the Cloudinary API.

### Helper — `tests/helper.js`

`loginWith(page, username, password)` — navigates to the login page, fills in credentials, and submits the form.

### Test files

#### `tests/public-pages.spec.js`

Verifies that all public routes load without errors (no error title). Tested routes: `/`, `/artworks`, `/artists`, `/links`, `/register`, `/login`.

#### `tests/auth-guards.spec.js`

Verifies that protected routes redirect unauthenticated users to `/login`. Tested routes:

| Route                | Guard              |
| -------------------- | ------------------ |
| `/users/addArtwork`  | logged in          |
| `/users/events`      | logged in          |
| `/admin/users`       | admin only         |
| `/admin/addEvent`    | admin only         |

#### `tests/login.spec.js`

| Test                               | What is verified                                                    |
| ---------------------------------- | ------------------------------------------------------------------- |
| front page can be opened           | `Welcome To Art Club!` heading is visible                           |
| user can log in as member          | After login: Add artwork, Logout, and MyPage links are visible      |
| user can log out                   | After logout: Login link reappears in navbar                        |
| user can log in as admin           | After login: Users and Logout links are visible                     |
| admin can navigate to users list   | Clicking Users link shows the Users heading                         |
| admin can add and delete artwork   | Full form submission → artwork appears in gallery → delete removes it |

---

## Linting

ESLint checks code style and catches common mistakes:

```bash
npm run lint
```

Configuration is in `.eslintrc.js`.
