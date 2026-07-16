# Tests — ArtClub

## Overview

The ArtClub frontend uses three levels of automated testing:

| Level             | Tool                             | Location                |
| ----------------- | -------------------------------- | ----------------------- |
| Unit tests        | Jest + React Testing Library     | `src/test/`             |
| Integration tests | Jest + MSW (Mock Service Worker) | `src/test/integration/` |
| E2E tests         | Playwright (Chromium)            | `e2e-tests/`            |

---

## Tools

| Tool                          | Purpose                                                                                                                                              |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Jest**                      | Test runner, assertions, and mocking. Bundled with `react-scripts` — no separate install needed.                                                     |
| **@testing-library/react**    | Renders React components into a real DOM and queries them the way a user would, without testing internal implementation details.                     |
| **@testing-library/jest-dom** | Adds DOM-specific matchers such as `toBeInTheDocument`, `toHaveValue`, and `toBeVisible`.                                                            |
| **deep-freeze**               | Freezes Redux state objects before passing them to reducers, causing an error if a reducer mutates state directly instead of returning a new object. |
| **MSW (Mock Service Worker)** | Intercepts `fetch`/`axios` requests at the network level and returns mock responses. Used in unit and integration tests so no real backend is needed. |
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

### Utils — `src/test/utils/`

Pure utility functions tested without mocks.

**`weatherUtils.test.js`** — tests `getWeatherIcon` and `getWeatherText`:

- Returns correct icon and text for known weather codes
- Returns `❓` and empty string for unknown codes

**`cloudinary.test.js`** — tests `cloudinaryOptimize`:

- Inserts transformation string into Cloudinary URL
- Applies custom width parameter
- Returns original URL unchanged if `/upload/` is not present
- Returns `null`/`undefined` as-is

### Services — `src/test/services/`

Service functions tested with MSW to intercept real HTTP calls.

**`serviceUtils.test.js`** — tests `handleError`:

- No response (network error) → throws server error message
- HTTP 500 → throws server error message
- HTTP 401 → throws fallback message
- HTTP 404 → throws fallback message

**`login.test.js`** — tests `loginService.login`:

- Successful login → returns user object
- HTTP 400/401 → throws correct error
- HTTP 500 → throws server error
- Network failure → throws server error

**`users.test.js`** — tests `updatePassword` and `create`:

- Password too short (client-side) → throws before HTTP call
- Passwords don't match (client-side) → throws before HTTP call
- Server 401 → throws auth error
- `create` 400 → throws "Username must be unique!"
- `create` 500 → throws server error

**`artworks.test.js`** — tests `getAll`, `create`, `deleteArtwork`:

- `getAll` success → returns artworks array
- `getAll` 500/404 → throws error
- `create` 400/401/500 → throws correct error
- `deleteArtwork` 404 → error message includes the artwork id

### Reducers — `src/test/reducers/`

Redux reducers are pure functions — no mocks needed. Each is tested with `deep-freeze` to catch direct state mutations.

Covered reducers: `artworkReducer`, `userReducer`, `loginReducer`, `eventReducer`, `filterReducer`, `notificationReducer`, `singleArtworkReducer`.

**`userReducer`** — covers `CREATE_USER`, `GET_USERS`, `GET_ARTISTS`, `UPDATE_USER`, `INIT_SINGLE_USER`, `DELETE_ARTWORK` (including nested artwork removal and null artworks handling).

**`eventReducer`** — covers initial state, `CREATE_EVENT` (resets list), `DELETE_EVENT` (removes correct id, leaves others).

**`filterReducer`** — covers initial state, `SET_ARTWORK_NAME`, `INIT_FILTER`.

### Component tests — `src/test/components/`

Uses `@testing-library/react` with Redux store and `MemoryRouter`. Components that call APIs on mount use MSW handlers to avoid network errors.

**Notification** — null when empty, shows message when set.

**PrivateRoute** — redirects when condition is false, renders child when true.

**Home** — unauthenticated shows Login/Register links; `nonMember` shows pending message; member shows welcome heading.

**LoginForm** — fields and button present; redirects if already logged in.

**RegisterUserForm** — all fields present (name, email, username, password); password visibility toggle; client-side validation errors for invalid email, short name, short username, short password; API integration: sends correct data, shows "Username must be unique!" on 400.

**NonMember** — "Art club" heading, pending message, email notification mention.

**AppNavigation** — always shows Home/Gallery/Artists; logged-out shows Login button and Register link; member shows member links and Logout; admin shows admin-only links; Logout callback fires on click.

**ArtworkList** — loading state; artworks rendered from API; filter by name; filter by artist; like button visible for logged-in user; admin sees delete buttons; member does not.

**AddArtworkForm** — heading and all fields; Send button; upload limit message at 10 artworks; "Remember to choose image!" on empty submit.

**SingleArtwork** — loading state; name and artist rendered; metadata visible; 404 → artwork name not shown.

**ArtworkDelete** — artwork details rendered; delete button visible; confirm dialog triggered; cancel does not delete.

**SingleUser** — owner sees account table, email, Add Artwork link; Add link hidden at 10 artworks; visitor sees no table or email; no artworks message; intro text shown.

**SingleArtist** — artist name and intro; all artworks listed with correct links; null singleUser renders nothing.

**UpdateUserForm** — heading; fields pre-filled from store; validation errors for invalid email, short name, short username.

**UpdatePassword** — heading and fields; password too short error; passwords don't match error; success notification; server 401 error.

**UserIntroForm** — heading and textarea; pre-filled from store; 1000+ character error; Send button present.

**UserList** — "Users" heading; table headers; users rendered from API; admin sees delete buttons; member does not.

**EventForm** — heading; all fields including date pickers; Send button; validation errors on empty submit; error clears after valid input.

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
- Test directory: `e2e-tests/`
- Browser: Chromium
- Retries: 2 on CI, 0 locally
- Reporter: HTML

### Database control

Before each test, the test suite resets the database and seeds test users via the backend testing API (`/api/testing/`). This ensures every test starts from the same known state.

The testing API is only active when the backend is started with `NODE_ENV=test` (`npm run start:test`). It exposes two endpoints:

| Endpoint                  | Action                                             |
| ------------------------- | -------------------------------------------------- |
| `POST /api/testing/reset` | Deletes all users and artworks from the database   |
| `POST /api/testing/users` | Creates a user with any role (member, admin, etc.) |

Seeded test users (login tests):

| Username     | Password    | Role   |
| ------------ | ----------- | ------ |
| `testmember` | `member123` | member |
| `testadmin`  | `admin123`  | admin  |

Cloudinary is bypassed in test mode — artwork uploads save a placeholder URL instead of calling the Cloudinary API.

### Helper — `e2e-tests/helper.js`

`loginWith(page, username, password)` — navigates to the login page, fills in credentials, and submits the form.

### Test files

#### `e2e-tests/public-pages.spec.js`

Verifies that all public routes load without errors (no error title). Tested routes: `/`, `/artworks`, `/artists`, `/links`, `/register`, `/login`.

#### `e2e-tests/auth-guards.spec.js`

Verifies that protected routes redirect unauthenticated users to `/login`. Tested routes:

| Route               | Guard      |
| ------------------- | ---------- |
| `/users/addArtwork` | logged in  |
| `/users/events`     | logged in  |
| `/admin/users`      | admin only |
| `/admin/addEvent`   | admin only |

#### `e2e-tests/login.spec.js`

| Test                             | What is verified                                                      |
| -------------------------------- | --------------------------------------------------------------------- |
| front page can be opened         | `Welcome To Art Club!` heading is visible                             |
| user can log in as member        | After login: Add artwork, Logout, and MyPage links are visible        |
| user can log out                 | After logout: Login link reappears in navbar                          |
| user can log in as admin         | After login: Users and Logout links are visible                       |
| admin can navigate to users list | Clicking Users link shows the Users heading                           |
| admin can add and delete artwork | Full form submission → artwork appears in gallery → delete removes it |

#### `e2e-tests/register-spec.js`

| Test                                          | What is verified                                                    |
| --------------------------------------------- | ------------------------------------------------------------------- |
| new user can register                         | After submit: nonMember page with "membership application" message  |
| registered user does not see member links     | Add Artwork and Events links are not visible after registration      |
| shows error when username is already taken    | "Username must be unique!" notification appears                     |
| register page shows terms and privacy links   | Terms of use and Privacy Policy links are visible on register page  |

---

## Linting

ESLint checks code style and catches common mistakes:

```bash
npm run lint
```

Configuration is in `.eslintrc.js`.
